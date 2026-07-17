import { expect, test } from "@playwright/test";

test.describe("Home page header and navigation", () => {
  test("Verify header, h1 tag, and navigation are readable", async ({
    page,
  }) => {
    await page.goto("./");

    const header = page.locator("header");
    await expect(header).toBeVisible();

    const h1 = await page.locator("h1").textContent();
    expect(h1?.trim()).toBe(process.env.NEXT_PUBLIC_SITE_NAME);

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
});

test.describe("Home page section item counts", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("./");
  });

  test("Tech Stack section displays 6 technologies", async ({ page }) => {
    await expect(page.locator("section#stack ul li")).toHaveCount(6);
  });

  test("Features section displays 10 features", async ({ page }) => {
    await expect(page.locator("section#features ul li")).toHaveCount(10);
  });

  test("Getting Started section displays 4 steps", async ({ page }) => {
    await expect(page.locator("section#getting-started ol li")).toHaveCount(4);
  });
});

test.describe("Home page upgrade (Pro) section", () => {
  test("Pro nav link scrolls the upgrade section into view", async ({
    page,
  }) => {
    await page.goto("./");
    await page
      .getByRole("navigation")
      .getByRole("button", { name: "Pro" })
      .click();

    await expect(page.locator("section#pro")).toBeInViewport();
    await expect(
      page.getByRole("heading", { name: "Upgrade to NextStarter Pro" })
    ).toBeInViewport();
  });

  test("shows Free and Pro plans with an external Get Pro CTA", async ({
    page,
  }) => {
    await page.goto("./");
    const pro = page.locator("section#pro");

    await expect(pro.getByRole("heading", { name: "Free" })).toBeVisible();
    await expect(
      pro.getByRole("heading", { exact: true, name: "Pro" })
    ).toBeVisible();

    const cta = pro.getByRole("link", { name: "Get NextStarter Pro" });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute("target", "_blank");
    expect(await cta.getAttribute("href")).toMatch(/^https?:\/\//);
  });
});
