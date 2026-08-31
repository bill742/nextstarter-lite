import { expect, test } from "@playwright/test";

/** Mirrors `isUpsellEnabled` — the `#pro` teaser only renders when it is set. */
const upsellEnabled = Boolean(process.env.NEXT_PUBLIC_PRO_URL);

test.describe("Home page header and navigation", () => {
  test("Verify header, h1 tag, and navigation are readable", async ({
    page,
  }) => {
    await page.goto("./");

    const header = page.locator("header");
    await expect(header).toBeVisible();

    // Exactly one h1, and it is page content rather than the logo — the logo
    // repeats on every route, so using it as the h1 gave every page the same
    // one and wasted the strongest on-page heading signal. It lives in the
    // hero; the About section below heads at h2.
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText("Ship accessible Next.js apps in minutes");

    const nav = page.getByRole("navigation");
    await expect(nav).toBeVisible();
  });
});

test.describe("Home page sections", () => {
  test("Verify home page sections display correct data.", async ({ page }) => {
    await page.goto("./");
    const nav = page.getByRole("navigation");

    await nav.getByRole("button", { name: "About" }).click();
    await expect(
      page.getByRole("heading", { name: "About NextStarter" })
    ).toBeVisible();

    await nav.getByRole("button", { name: "Tech Stack" }).click();
    await expect(
      page.getByRole("heading", { name: "Tech Stack" })
    ).toBeVisible();

    await nav.getByRole("button", { name: "Features" }).click();
    await expect(page.getByRole("heading", { name: "Features" })).toBeVisible();
  });
});

test.describe("Home page navigation scroll behavior", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });

  test("About nav link scrolls the About section into view", async ({
    page,
  }) => {
    await page
      .getByRole("navigation")
      .getByRole("button", { name: "About" })
      .click();

    await expect(page.locator("section#about")).toBeInViewport();
    await expect(
      page.getByRole("heading", { name: "About NextStarter" })
    ).toBeInViewport();
  });

  test("Tech Stack nav link scrolls the Tech Stack section into view", async ({
    page,
  }) => {
    await page
      .getByRole("navigation")
      .getByRole("button", { name: "Tech Stack" })
      .click();

    await expect(page.locator("section#stack")).toBeInViewport();
    await expect(
      page.getByRole("heading", { name: "Tech Stack" })
    ).toBeInViewport();
  });

  test("Features nav link scrolls the Features section into view", async ({
    page,
  }) => {
    await page
      .getByRole("navigation")
      .getByRole("button", { name: "Features" })
      .click();

    await expect(page.locator("section#features")).toBeInViewport();
    await expect(
      page.getByRole("heading", { name: "Features" })
    ).toBeInViewport();
  });

  test("Header Get Started button scrolls the Getting Started section into view", async ({
    page,
  }) => {
    // Scoped to the header: the hero's primary CTA also matches "Get started".
    await page
      .locator("header")
      .getByRole("button", { name: "Get Started" })
      .click();

    await expect(page.locator("section#getting-started")).toBeInViewport();
    await expect(
      page.getByRole("heading", { name: "Getting Started" })
    ).toBeInViewport();
  });

  test("Hero CTA scrolls the Getting Started section into view", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Get started free" }).click();

    await expect(page.locator("section#getting-started")).toBeInViewport();
  });

  test("Hero Pro CTA links to the Pro page", async ({ page }) => {
    test.skip(!upsellEnabled, "NEXT_PUBLIC_PRO_URL is not set");

    // Scoped to the hero: the footer carries a link with the same label.
    await page
      .locator("section#hero")
      .getByRole("link", { name: "Upgrade to Pro" })
      .click();

    await expect(page).toHaveURL(/\/pro$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /NextStarter Pro/ })
    ).toBeVisible();
  });
});

test.describe("Home page section item counts", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });

  test("Tech Stack section displays 6 technologies", async ({ page }) => {
    await expect(page.locator("section#stack ul li")).toHaveCount(6);
  });

  test("Features section displays 12 features", async ({ page }) => {
    await expect(page.locator("section#features ul li")).toHaveCount(12);
  });

  test("Getting Started section displays 4 steps", async ({ page }) => {
    await expect(page.locator("section#getting-started ol li")).toHaveCount(4);
  });
});
