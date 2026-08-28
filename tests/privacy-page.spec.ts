/* eslint-disable no-console */
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * Unlike /pro and /thanks, the privacy notice is never gated — a site always
 * has a privacy position, even when that position is "this deployment collects
 * nothing". So these specs never skip.
 */
const analyticsEnabled = Boolean(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN);

test.describe("Privacy page", () => {
  test("Verify the notice renders with its heading and last-updated date", async ({
    page,
  }) => {
    await page.goto("/privacy");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Privacy");
    await expect(page.getByText(/^Last updated /)).toBeVisible();
  });

  test("Verify the notice describes the analytics that is actually configured", async ({
    page,
  }) => {
    await page.goto("/privacy");

    const analytics = page.locator("#analytics");

    if (analyticsEnabled) {
      // The claim that earns the absence of a cookie banner. If PostHog is
      // ever reconfigured out of cookieless mode, this page becomes untrue
      // before it becomes broken — so assert the substance, not just presence.
      await expect(analytics).toContainText("cookieless mode");
      await expect(analytics).toContainText("no cookies");
    } else {
      await expect(analytics).toContainText("switched off");
    }
  });

  test("Verify the page is reachable from the footer on every route", async ({
    page,
  }) => {
    for (const route of ["/", "/privacy"]) {
      await page.goto(route);
      await page
        .getByRole("contentinfo")
        .getByRole("link", { name: "Privacy" })
        .click();
      await expect(page).toHaveURL(/\/privacy$/);
    }
  });

  test("Verify the notice is indexable and links home", async ({ page }) => {
    await page.goto("/privacy");

    console.log("Checking metadata on the privacy page");

    expect(await page.title()).toBe("Privacy | NextStarter");

    // The opposite of /thanks: a privacy notice people cannot find is not a
    // notice, so it must stay crawlable.
    const robotsMeta = await page
      .locator('meta[name="robots"]')
      .getAttribute("content");
    expect(robotsMeta ?? "").not.toContain("noindex");

    await page.getByRole("link", { name: "Back to the home page" }).click();
    await expect(page).toHaveURL(/\/$/);
  });

  test("Verify the ICO complaint route is offered and opens safely", async ({
    page,
  }) => {
    await page.goto("/privacy");

    const ico = page.getByRole("link", { name: "ico.org.uk" });
    await expect(ico).toHaveAttribute("href", /ico\.org\.uk/);
    await expect(ico).toHaveAttribute("target", "_blank");
    await expect(ico).toHaveAttribute("rel", /noopener/);
  });
});

test.describe("Privacy page does not have accessiblity issues", () => {
  test("Should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("/privacy");

    console.log("Running accessibility scan on the privacy page");

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
