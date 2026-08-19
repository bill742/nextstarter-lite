/* eslint-disable no-console */
/**
 * On-demand checkout smoke test against the Polar **sandbox**.
 *
 * Deliberately not part of `npm run test`: it drives Polar's hosted checkout,
 * which is third-party markup that can change without notice. Keeping it out of
 * CI means that fragility never blocks a PR. Run it by hand before launch and
 * after any change to the Polar product, benefit, or checkout link.
 *
 *   npm run test:checkout                # buy with a test card, then verify
 *   npm run test:checkout -- --verify-only   # just verify the latest order
 *   npm run test:checkout -- --headed        # watch it happen
 *
 * The sandbox is a separate Polar instance: separate account, organization,
 * product, benefit, and access token. A production token will not work here.
 * See https://polar.sh/docs/integrate/sandbox
 */

import { chromium } from "@playwright/test";

const API = "https://sandbox-api.polar.sh";

/** Stripe's "always succeeds" test card, accepted by the Polar sandbox. */
const TEST_CARD = {
  cvc: "123",
  expiry: "12 / 30",
  number: "4242 4242 4242 4242",
  postalCode: "M5V 3L9",
};

const args = process.argv.slice(2);
const verifyOnly = args.includes("--verify-only");
const headed = args.includes("--headed");

const token = process.env.POLAR_SANDBOX_TOKEN;
const checkoutUrl = process.env.POLAR_SANDBOX_CHECKOUT_URL;
const benefitId = process.env.POLAR_SANDBOX_BENEFIT_ID;
const successPath = process.env.POLAR_SANDBOX_SUCCESS_PATH || "/thanks";

const fail = (message) => {
  console.error(`\n✗ ${message}`);
  process.exit(1);
};

const step = (message) => console.log(`\n▸ ${message}`);

/**
 * Calls the Polar sandbox API.
 *
 * @param path - Path below the sandbox API root, e.g. `/v1/orders`.
 * @returns The parsed JSON body.
 */
const api = async (path) => {
  const response = await fetch(`${API}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    fail(
      `GET ${path} returned ${response.status} ${response.statusText}. ` +
        `Check POLAR_SANDBOX_TOKEN is a sandbox token with orders:read and benefits:read.`
    );
  }

  return response.json();
};

/**
 * Fills Polar's hosted checkout form and submits it.
 *
 * The card fields live in Stripe iframes whose exact structure is Stripe's to
 * change, so this is the one brittle part of the script. On failure it writes
 * `checkout-smoke-failure.png` so you can see the form it actually got.
 *
 * @param page - The Playwright page sitting on the checkout URL.
 * @param email - The buyer email to register the order against.
 */
const completeCheckout = async (page, email) => {
  await page.getByLabel(/email/i).fill(email);

  // Stripe renders each field in its own iframe; scan them all rather than
  // assuming an order or a name.
  const fillInFrames = async (matchers, value) => {
    for (const frame of page.frames()) {
      for (const matcher of matchers) {
        const field = frame.getByPlaceholder(matcher);
        if ((await field.count()) > 0) {
          await field.first().fill(value);
          return true;
        }
      }
    }
    return false;
  };

  const filledCard = await fillInFrames(
    [/1234 1234/, /card number/i],
    TEST_CARD.number
  );
  if (!filledCard) {
    await page.screenshot({ path: "checkout-smoke-failure.png" });
    fail(
      "Could not find the card number field. Polar or Stripe changed the " +
        "checkout markup — see checkout-smoke-failure.png and update the " +
        "selectors in completeCheckout()."
    );
  }

  await fillInFrames([/MM \/ YY/i, /expir/i], TEST_CARD.expiry);
  await fillInFrames([/CVC/i, /security code/i], TEST_CARD.cvc);
  await fillInFrames([/ZIP/i, /postal/i], TEST_CARD.postalCode);

  await page
    .getByRole("button", { name: /pay|subscribe|purchase|complete/i })
    .first()
    .click();
};

/**
 * Confirms the sandbox recorded a paid order, and that the benefit was granted.
 *
 * This is the durable half of the script — it asserts against the API rather
 * than the DOM, so it stays valid even when the checkout UI changes.
 *
 * @param email - Buyer email to match, or null to check the most recent order.
 */
const verify = async (email) => {
  step("Verifying the order via the sandbox API");

  // Orders are written after the redirect, so give the webhook a moment.
  let order = null;
  for (let attempt = 1; attempt <= 10; attempt++) {
    const { items = [] } = await api("/v1/orders?limit=10&sorting=-created_at");
    order = email
      ? items.find((item) => item.customer?.email === email)
      : items[0];

    if (order) break;
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(`  waiting for the order to appear (${attempt}/10)…`);
  }

  if (!order) {
    fail(
      email
        ? `No sandbox order found for ${email} after 20s.`
        : "No sandbox orders found at all."
    );
  }

  console.log(`  order ${order.id}`);
  console.log(`  customer ${order.customer?.email}`);
  console.log(`  status ${order.status}  paid=${order.paid}`);

  if (order.status !== "paid" && order.paid !== true) {
    fail(`Order is not paid (status: ${order.status}).`);
  }
  console.log("  ✓ order is paid");

  if (!benefitId) {
    console.log(
      "\n  (Set POLAR_SANDBOX_BENEFIT_ID to also assert the repo-access grant.)"
    );
    return;
  }

  step("Verifying the benefit grant");
  const { items: grants = [] } = await api(
    `/v1/benefits/${benefitId}/grants?is_granted=true&customer_id=${order.customer.id}`
  );

  if (grants.length === 0) {
    fail(
      `Order is paid but benefit ${benefitId} was NOT granted to ${order.customer?.email}. ` +
        `This is the failure that leaves a real buyer with a receipt and no repository access — ` +
        `check that Polar's GitHub App is installed on the repository owner's organization.`
    );
  }

  console.log(`  ✓ benefit granted (${grants.length} grant(s))`);
};

const main = async () => {
  if (!token) {
    fail(
      "POLAR_SANDBOX_TOKEN is not set. Create a sandbox token at " +
        "https://sandbox.polar.sh (Settings → Developers) with orders:read and benefits:read."
    );
  }

  if (verifyOnly) {
    await verify(null);
    console.log("\n✓ Checkout smoke passed (verify-only)\n");
    return;
  }

  if (!checkoutUrl) {
    fail(
      "POLAR_SANDBOX_CHECKOUT_URL is not set. Create a checkout link on your " +
        "sandbox product, or re-run with --verify-only."
    );
  }

  const email = `nextstarter-smoke+${Date.now()}@example.com`;
  const browser = await chromium.launch({ headless: !headed });
  const page = await browser.newPage();

  try {
    step(`Opening sandbox checkout as ${email}`);
    await page.goto(checkoutUrl);

    step("Paying with the test card");
    await completeCheckout(page, email);

    step(`Waiting for the redirect to ${successPath}`);
    await page.waitForURL((url) => url.pathname.startsWith(successPath), {
      timeout: 60000,
    });
    console.log(`  landed on ${page.url()}`);

    // The success page is informational, but if it 404s or errors the buyer's
    // first impression after paying is a broken page.
    await page.getByRole("heading", { name: /thank you/i }).waitFor();
    console.log("  ✓ confirmation page rendered");
  } finally {
    await browser.close();
  }

  await verify(email);
  console.log("\n✓ Checkout smoke passed\n");
};

main().catch((error) => fail(error.stack || String(error)));
