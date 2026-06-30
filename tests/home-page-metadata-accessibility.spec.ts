/* eslint-disable no-console */
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Homepage does not have accessiblity issues", () => {
  test("Should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("./");

    console.log("Running accessibility scan on homepage");

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

    // The click leaves the toggle focused, which opens its tooltip (Firefox
    // keeps focus after a programmatic click; Chromium does not). Drop focus
    // and wait for the tooltip to close so the scan runs on a stable page
    // rather than a transient, mid-animation tooltip.
    await themeToggle.first().blur();
    await expect(page.getByRole("tooltip")).toHaveCount(0);

    const darkModeAccessibilityScanResults = await new AxeBuilder({
      page,
    }).analyze();
    expect(darkModeAccessibilityScanResults.violations).toEqual([]);
  });
});

test.describe("Page Metadata and Document Structure", () => {
  test("Verify Home Page Metadata", async ({ page }) => {
    await page.goto("/");

    console.log("Checking metadata on homepage");

    const lang = await page.locator("html").getAttribute("lang");
    expect(lang).toBe("en");

    const title = await page.title();
    expect(title).toBe("NextStarter");

    const descriptionMeta = await page
      .locator('meta[name="description"]')
      .getAttribute("content");
    expect(descriptionMeta).toBe(process.env.NEXT_PUBLIC_SITE_META_DESCRIPTION);

    const canonicalLink = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(canonicalLink).toBe(process.env.NEXT_PUBLIC_SITE_URL);
  });
});
