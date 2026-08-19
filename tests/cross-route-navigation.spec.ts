import { expect, test } from "@playwright/test";

/**
 * The header nav, footer quick links, and Get Started CTA all point at sections
 * of the landing page. From any other route (/thanks, a 404) they have to route
 * home first and then scroll — these cover that second half.
 */
test.describe("Section navigation from a non-home route", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/thanks");
  });

  test("Header nav link routes home and scrolls to the section", async ({
    page,
  }) => {
    await page
      .getByRole("navigation")
      .getByRole("button", { name: "Features" })
      .click();

    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("section#features")).toBeInViewport();
  });

  test("Footer quick link routes home and scrolls to the section", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Upgrade to Pro" }).click();

    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("section#pro")).toBeInViewport();
  });

  test("Get Started CTA routes home and scrolls to Getting Started", async ({
    page,
  }) => {
    await page.getByRole("button", { name: "Get Started" }).click();

    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("section#getting-started")).toBeInViewport();
  });

  test("The stashed section is consumed, so it is not replayed later", async ({
    page,
  }) => {
    await page
      .getByRole("navigation")
      .getByRole("button", { name: "Features" })
      .click();
    await expect(page.locator("section#features")).toBeInViewport();

    // Reading the target clears it...
    const pendingTarget = await page.evaluate(() =>
      sessionStorage.getItem("nextstarter:scroll-target")
    );
    expect(pendingTarget).toBeNull();

    // ...so simply arriving at the home page again lands at the top. (Asserted
    // via a fresh navigation rather than a reload: Chromium restores the prior
    // scroll offset on reload, which would test the browser, not this code.)
    await page.goto("/thanks");
    await page.goto("/");

    await expect(page.locator("section#about")).toBeInViewport();
    await expect(page.locator("section#features")).not.toBeInViewport();
  });
});
