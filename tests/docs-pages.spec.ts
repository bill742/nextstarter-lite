/* eslint-disable no-console */
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * The pages the docs promise, in reading order. Mirrors `src/lib/docs.ts` —
 * the sidebar, the routes, and this list drifting apart is exactly what the
 * first spec catches.
 */
const docsPages = [
  { href: "/docs", label: "Overview", title: "Documentation" },
  {
    href: "/docs/getting-started",
    label: "Getting Started",
    title: "Getting Started",
  },
  {
    href: "/docs/environment-variables",
    label: "Environment Variables",
    title: "Environment Variables",
  },
  {
    href: "/docs/customization",
    label: "Customization",
    title: "Customization",
  },
  { href: "/docs/analytics", label: "Analytics", title: "Analytics" },
  { href: "/docs/testing", label: "Testing & CI", title: "Testing & CI" },
  { href: "/docs/deployment", label: "Deployment", title: "Deployment" },
];

test.describe("Docs pages", () => {
  test("Verify every page renders its heading, title, and current sidebar link", async ({
    page,
  }) => {
    for (const docsPage of docsPages) {
      await page.goto(docsPage.href);

      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        docsPage.title
      );

      const expectedTitle =
        docsPage.href === "/docs" ? docsPage.title : `${docsPage.title} — Docs`;
      expect(await page.title()).toBe(
        `${expectedTitle} | ${process.env.NEXT_PUBLIC_SITE_NAME}`
      );

      const sidebar = page.getByRole("navigation", { name: "Documentation" });
      await expect(sidebar.getByRole("link")).toHaveCount(docsPages.length);
      await expect(
        sidebar.getByRole("link", { name: docsPage.label })
      ).toHaveAttribute("aria-current", "page");
    }
  });

  test("Verify the previous and next links walk the pages in order", async ({
    page,
  }) => {
    await page.goto(docsPages[0].href);

    for (const docsPage of docsPages.slice(1)) {
      await page
        .getByRole("navigation", { name: "Previous and next pages" })
        // The labels are distinct, so naming the target picks out "Next"
        // rather than "Previous".
        .getByRole("link", { name: docsPage.label })
        .click();
      await expect(page).toHaveURL(new RegExp(`${docsPage.href}$`));
    }
  });

  test("Verify the docs are reachable from the home page and the footer", async ({
    page,
  }) => {
    await page.goto("/");
    await page
      .locator("section#getting-started")
      .getByRole("link", { name: "documentation" })
      .click();
    await expect(page).toHaveURL(/\/docs$/);

    await page.goto("/privacy");
    await page
      .getByRole("contentinfo")
      // Exact: the Resources column also has "Next.js Documentation".
      .getByRole("link", { exact: true, name: "Documentation" })
      .click();
    await expect(page).toHaveURL(/\/docs$/);
  });

  test("Verify every page is listed in the sitemap", async ({ request }) => {
    const sitemap = await (await request.get("/sitemap.xml")).text();

    for (const docsPage of docsPages) {
      expect(sitemap).toContain(`${docsPage.href}</loc>`);
    }
  });
});

test.describe("Docs pages do not have accessibility issues", () => {
  for (const docsPage of docsPages) {
    test(`Should not have any automatically detectable accessibility issues on ${docsPage.href}`, async ({
      page,
    }) => {
      await page.goto(docsPage.href);

      console.log(`Running accessibility scan on ${docsPage.href}`);

      // Test light mode
      const lightModeClass = await page.locator("html").getAttribute("class");
      expect(lightModeClass).toContain("light");
      const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
      expect(accessibilityScanResults.violations).toEqual([]);

      // Test dark mode
      const themeToggle = page.locator("#themeToggle");
      await themeToggle.first().click();
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
  }
});
