import { expect, test } from "@playwright/test";

test.describe("Home page", () => {
  test("Verify the page renders inside the site shell", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      process.env.NEXT_PUBLIC_SITE_NAME ?? ""
    );
  });

  test("Verify the skip link has a main content target", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("main#main")).toHaveCount(1);
  });
});
