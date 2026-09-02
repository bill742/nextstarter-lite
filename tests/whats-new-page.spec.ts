/* eslint-disable no-console */
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Like /privacy and unlike /pro, this route is never gated — a project always
 * has its own history to show. Only the Pro list follows the upsell flag, so
 * these specs never skip; they assert the gate instead.
 */
const upsellEnabled = Boolean(process.env.NEXT_PUBLIC_PRO_URL);

test.describe("What's New page", () => {
  test("Verify the page renders its heading and the free starter's updates", async ({
    page,
  }) => {
    await page.goto("/whats-new");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "What’s New"
    );

    // Each update is a list item with a heading and a date; an empty timeline
    // would still render the section, so assert there is something in it.
    const updates = page.locator("section#lite ol > li");
    expect(await updates.count()).toBeGreaterThan(0);

    const first = updates.first();
    await expect(first.getByRole("heading", { level: 3 })).toBeVisible();
    await expect(first.locator("time")).toBeVisible();
  });

  test("Verify every update carries a machine-readable date, newest first", async ({
    page,
  }) => {
    await page.goto("/whats-new");

    for (const section of ["#lite", ...(upsellEnabled ? ["#pro"] : [])]) {
      const dates = await page
        .locator(`section${section} ol > li time`)
        .evaluateAll((nodes) =>
          nodes.map((node) => node.getAttribute("datetime") ?? "")
        );

      expect(dates.length).toBeGreaterThan(0);

      // ISO dates sort lexicographically, so a descending sort of the same
      // values is the order the page should already be in.
      expect(dates).toEqual([...dates].sort().reverse());
      for (const date of dates) expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  test("Verify the Pro list follows the upsell gate", async ({ page }) => {
    await page.goto("/whats-new");

    const pro = page.locator("section#pro");

    if (upsellEnabled) {
      await expect(
        pro.getByRole("heading", { level: 2, name: "NextStarter Pro" })
      ).toBeVisible();
      expect(await pro.locator("ol > li").count()).toBeGreaterThan(0);
      // The list is a sales surface as much as a record, so it has to lead
      // somewhere.
      await expect(
        pro.getByRole("link", { name: /What NextStarter Pro includes/i })
      ).toHaveAttribute("href", "/pro");
    } else {
      // A scaffolded project must not publish another product's release notes.
      await expect(pro).toHaveCount(0);
    }
  });

  test("Verify the sitemap and the navigation agree with the route", async ({
    page,
    request,
  }) => {
    // The route 404s with no updates (src/lib/changelog.ts), and the nav
    // entries and the sitemap listing read the same value. Drift between them
    // is the failure this catches: a link or a crawl target pointing at a page
    // that is switched off.
    const rendered = (await page.goto("/whats-new"))?.status() === 200;

    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap.includes("/whats-new")).toBe(rendered);

    await page.goto("/");
    const header = page
      .getByRole("banner")
      .getByRole("link", { name: "What\u2019s New" });
    const footer = page
      .getByRole("contentinfo")
      .getByRole("link", { name: "What\u2019s New" });
    expect((await header.count()) > 0).toBe(rendered);
    expect((await footer.count()) > 0).toBe(rendered);
  });

  test("Verify the page is reachable from the header and the footer", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "What’s New" })
      .first()
      .click();
    await expect(page).toHaveURL(/\/whats-new$/);

    await page.goto("/");
    await page
      .getByRole("contentinfo")
      .getByRole("link", { name: "What’s New" })
      .click();
    await expect(page).toHaveURL(/\/whats-new$/);
  });

  test("Verify the page is indexable and links home", async ({ page }) => {
    await page.goto("/whats-new");

    console.log("Checking metadata on the What's New page");

    expect(await page.title()).toBe("What’s New | NextStarter");

    // The point of the page is that people — and crawlers — can find out the
    // project is alive, so it must stay indexable.
    const robotsMeta = await page
      .locator('meta[name="robots"]')
      .getAttribute("content");
    expect(robotsMeta ?? "").not.toContain("noindex");

    await page.getByRole("link", { name: "Back to the home page" }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe("What's New page does not have accessiblity issues", () => {
  test("Should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("/whats-new");

    console.log("Running accessibility scan on the What's New page");

    // Test light mode
    const lightModeClass = await page.locator("html").getAttribute("class");
    expect(lightModeClass).toContain("light");
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);

    // Test dark mode
    const themeToggle = page.locator("#themeToggle");
    await themeToggle.first().click();
    console.log("Switching to Dark mode for accessibility testing");
    const darkModeClass = await page.locator("html").getAttribute("class");
    expect(darkModeClass).toContain("dark");

    // Same tooltip race as the other page scans — see thanks-page.spec.ts.
    await themeToggle.first().blur();
    await expect(page.getByRole("tooltip")).toHaveCount(0);

    const darkModeAccessibilityScanResults = await new AxeBuilder({
      page,
    }).analyze();
    expect(darkModeAccessibilityScanResults.violations).toEqual([]);
  });
});
