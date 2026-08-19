/* eslint-disable no-console */
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Thanks page", () => {
  test("Verify the confirmation content and next steps are shown", async ({
    page,
  }) => {
    // Polar appends the checkout session id to the Success URL; the page must
    // render identically with or without it.
    await page.goto("/thanks?checkout_id=polar_c_test123");

    await expect(
      page.getByRole("heading", { name: "Thank you for your purchase" })
    ).toBeVisible();

    const steps = page.getByRole("listitem").filter({
      has: page.getByRole("heading", { level: 3 }),
    });
    await expect(steps).toHaveCount(4);
    await expect(
      page.getByRole("heading", { name: "Claim your repository access" })
    ).toBeVisible();

    const portalLink = page.getByRole("link", {
      name: "Open your customer portal",
    });
    await expect(portalLink).toHaveAttribute("href", /polar\.sh/);
    await expect(portalLink).toHaveAttribute("target", "_blank");
    await expect(portalLink).toHaveAttribute("rel", /noopener/);

    await expect(page.getByRole("link", { name: /^Email / })).toHaveAttribute(
      "href",
      /^mailto:/
    );
  });

  test("Verify the page is not indexable and links home", async ({ page }) => {
    await page.goto("/thanks");

    console.log("Checking metadata on the thanks page");

    const title = await page.title();
    expect(title).toBe("Thank you for your purchase | NextStarter");

    // A post-purchase page should never appear in search results.
    const robotsMeta = await page
      .locator('meta[name="robots"]')
      .getAttribute("content");
    expect(robotsMeta).toContain("noindex");

    await page.getByRole("link", { name: "Back to the home page" }).click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe("Thanks page does not have accessiblity issues", () => {
  test("Should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("/thanks");

    console.log("Running accessibility scan on the thanks page");

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
