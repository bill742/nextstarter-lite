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
    // one and wasted the strongest on-page heading signal.
    const h1 = page.locator("h1");
    await expect(h1).toHaveCount(1);
    await expect(h1).toHaveText(
      `About ${process.env.NEXT_PUBLIC_SITE_NAME} - the accessible Next.js boilerplate`
    );

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

  test("Get Started button scrolls the Getting Started section into view", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Get Started" }).click();

    await expect(page.locator("section#getting-started")).toBeInViewport();
    await expect(
      page.getByRole("heading", { name: "Getting Started" })
    ).toBeInViewport();
  });

  test("About CTA scrolls the Getting Started section into view", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Start a project" }).click();

    await expect(page.locator("section#getting-started")).toBeInViewport();
  });

  // The Pro teaser is the last section on the page, so this button is the only
  // way to reach it without scrolling the whole page.
  test("About Pro CTA scrolls the Pro teaser into view", async ({ page }) => {
    test.skip(!upsellEnabled, "NEXT_PUBLIC_PRO_URL is not set");

    await page.getByRole("button", { name: "See what Pro adds" }).click();

    await expect(page.locator("section#pro")).toBeInViewport();
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
