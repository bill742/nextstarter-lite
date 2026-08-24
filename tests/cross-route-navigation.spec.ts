import { expect, test } from "@playwright/test";

/**
 * The header nav, footer quick links, and Get Started CTA all point at sections
 * of the landing page. From any other route they have to route home first and
 * then scroll — these cover that second half.
 *
 * The 404 page is used as "somewhere else" on purpose: it renders the same
 * header and footer but always exists, so these tests keep working in a project
 * scaffolded from this starter, where the optional marketing routes are gone.
 */
const SOME_OTHER_ROUTE = "/this-route-does-not-exist";
test.describe("Section navigation from a non-home route", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(SOME_OTHER_ROUTE);
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
    // Scoped to the footer: the header nav carries the same label.
    await page
      .locator("footer")
      .getByRole("button", { name: "Tech Stack" })
      .click();

    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("section#stack")).toBeInViewport();
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
    await page.goto(SOME_OTHER_ROUTE);
    await page.goto("/");

    await expect(page.locator("section#about")).toBeInViewport();
    await expect(page.locator("section#features")).not.toBeInViewport();
  });
});
