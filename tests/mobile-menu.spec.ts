import type { Page } from "@playwright/test";
import { expect, test } from "@playwright/test";

/**
 * The mobile menu locks body scroll while it is open, so every link inside it
 * has to close the menu for the resulting scroll to actually land.
 */
test.describe("Mobile menu navigation", () => {
  const openMenu = async (page: Page) => {
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(
      page.getByRole("button", { name: "Close menu" })
    ).toBeInViewport();
  };

  test.describe("On a phone viewport", () => {
    test.use({ viewport: { height: 844, width: 390 } });

    test("A nav link from another route closes the menu, routes home, and scrolls", async ({
      page,
    }) => {
      // A route that always exists, so this keeps working in a project
      // scaffolded from this starter where the marketing routes are removed.
      await page.goto("/this-route-does-not-exist");
      await openMenu(page);

      // Scoped to the menu's nav — the footer quick links repeat these labels.
      await page
        .getByRole("navigation")
        .getByRole("button", { name: "Features" })
        .click();

      await expect(page).toHaveURL(/\/$/);
      await expect(
        page.getByRole("button", { name: "Close menu" })
      ).not.toBeInViewport();
      await expect(page.locator("section#features")).toBeInViewport();
    });
  });

  test.describe("On a small tablet viewport", () => {
    // The menu's Get Started button inherits the header CTA's `hidden sm:block`,
    // so it only renders between the `sm` (640px) and `md` (768px) breakpoints —
    // the band where the mobile menu is still in use.
    test.use({ viewport: { height: 900, width: 700 } });

    test("Get Started closes the menu and scrolls to Getting Started", async ({
      page,
    }) => {
      await page.goto("/");
      await openMenu(page);

      // At this width the header's own CTA is visible too; the menu renders
      // after the header, so the menu's copy is the last one in the DOM.
      await page.getByRole("button", { name: "Get Started" }).last().click();

      await expect(
        page.getByRole("button", { name: "Close menu" })
      ).not.toBeInViewport();
      await expect(page.locator("section#getting-started")).toBeInViewport();
    });
  });
});
