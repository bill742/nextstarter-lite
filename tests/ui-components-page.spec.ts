/* eslint-disable no-console */
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * The sections the page promises, in render order. Mirrors
 * `src/components/ui-components/sections.ts` — the nav, the anchors, and this
 * list drifting apart is exactly the failure the first spec catches.
 */
const sections = [
  { id: "foundations-color", label: "Color", title: "Color" },
  { id: "foundations-typography", label: "Typography", title: "Typography" },
  { id: "actions-button", label: "Button", title: "Button" },
  { id: "data-display-card", label: "Card", title: "Card" },
  { id: "media-carousel", label: "Carousel", title: "Carousel" },
  { id: "overlays-tooltip", label: "Tooltip", title: "Tooltip" },
];

test.describe("UI Components page", () => {
  test("Verify the page renders its heading and every documented section", async ({
    page,
  }) => {
    await page.goto("/ui-components");

    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "UI Components"
    );

    for (const section of sections) {
      const element = page.locator(`section#${section.id}`);

      await expect(element).toHaveCount(1);
      await expect(
        element.getByRole("heading", { level: 2, name: section.title })
      ).toBeVisible();
      // Every section carries at least one example, each with its own heading.
      expect(await element.locator("article h3").count()).toBeGreaterThan(0);
    }
  });

  test("Verify the section nav points only at sections that exist", async ({
    page,
  }) => {
    await page.goto("/ui-components");

    const nav = page.getByRole("navigation", { name: "On this page" });

    const hrefs = await nav
      .getByRole("link")
      .evaluateAll((links) =>
        links.map((link) => link.getAttribute("href") ?? "")
      );

    expect(hrefs).toEqual(sections.map((section) => `#${section.id}`));

    // Following one has to land on the matching section, which is what the
    // intercepted click and the scroll offset exist to get right.
    await nav.getByRole("link", { name: "Tooltip" }).click();
    await expect(page.locator("section#overlays-tooltip")).toBeInViewport();
  });

  test("Verify each example exposes its source", async ({ page }) => {
    await page.goto("/ui-components");

    const example = page.locator("section#actions-button article").first();
    const code = example.locator("pre");

    // Collapsed by default: the previews are the page, the code is on request.
    await expect(code).toBeHidden();

    await example.getByText("Code", { exact: true }).click();
    await expect(code).toBeVisible();
    await expect(code).toContainText("import { Button }");
  });

  test("Verify the copy button copies the snippet", async ({
    browserName,
    context,
    page,
  }) => {
    // Clipboard permissions are a Chromium-only API in Playwright; the button
    // reports its own failure elsewhere, which is the point of its states.
    test.skip(browserName !== "chromium", "Clipboard access is Chromium-only");

    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/ui-components");

    const example = page.locator("section#actions-button article").first();
    await example.getByText("Code", { exact: true }).click();
    await example.getByRole("button", { name: "Copy" }).click();

    await expect(example.getByRole("button", { name: "Copied" })).toBeVisible();

    const clipboard = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboard).toContain(
      '<Button variant="destructive">Destructive</Button>'
    );
  });

  test("Verify the button examples are the real component, in every variant", async ({
    page,
  }) => {
    await page.goto("/ui-components");

    const variants = page.locator(
      "section#actions-button [data-slot='button'][data-variant]"
    );

    // The component stamps its variant onto the element, so the previews can
    // be checked against the source of truth rather than against a screenshot.
    const rendered = await variants.evaluateAll((nodes) =>
      nodes.map((node) => node.getAttribute("data-variant"))
    );

    for (const variant of [
      "default",
      "secondary",
      "outline",
      "ghost",
      "link",
      "destructive",
    ]) {
      expect(rendered).toContain(variant);
    }

    // asChild has to produce an anchor, not a button that looks like one.
    const asLink = page
      .locator("section#actions-button")
      .getByRole("link", { name: "Home page" });
    await expect(asLink).toHaveAttribute("href", "/");

    // An icon-only button with no accessible name is the defect this page is
    // meant to demonstrate the fix for. Matched on the size attribute rather
    // than the name, because a labelled button further down shares one.
    const iconButtons: [string, string][] = [
      ["icon-xs", "Add"],
      ["icon-sm", "Download"],
      ["icon", "Favourite"],
      ["icon-lg", "Delete"],
    ];

    for (const [size, name] of iconButtons) {
      await expect(
        page.locator(`section#actions-button [data-size="${size}"]`)
      ).toHaveAccessibleName(name);
    }
  });

  test("Verify a tooltip opens on keyboard focus and closes on Escape", async ({
    page,
  }) => {
    await page.goto("/ui-components");

    const trigger = page
      .locator("section#overlays-tooltip")
      .getByRole("button", { name: "Hover me" })
      .first();

    await trigger.focus();
    await expect(
      page.getByRole("tooltip").filter({ hasText: "Above the trigger" })
    ).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("tooltip")).toHaveCount(0);
  });

  test("Verify the carousel scrolls and disables its controls at the ends", async ({
    page,
  }) => {
    await page.goto("/ui-components");

    const carousel = page
      .locator("section#media-carousel [data-slot='carousel']")
      .first();
    const previous = carousel.locator("[data-slot='carousel-previous']");
    const next = carousel.locator("[data-slot='carousel-next']");

    // Nothing to scroll back to yet.
    await expect(previous).toBeDisabled();

    await next.click();
    await expect(previous).toBeEnabled();
  });

  test("Verify the page is indexable, listed, and reachable", async ({
    page,
    request,
  }) => {
    await page.goto("/ui-components");

    console.log("Checking metadata on the UI Components page");

    expect(await page.title()).toBe("UI Components | NextStarter");

    const robotsMeta = await page
      .locator('meta[name="robots"]')
      .getAttribute("content");
    expect(robotsMeta ?? "").not.toContain("noindex");

    // Ungated, so unlike /pro and /whats-new it is always in the sitemap.
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain("/ui-components");

    await page.goto("/");
    await page
      .getByRole("contentinfo")
      .getByRole("link", { name: "Components" })
      .click();
    await expect(page).toHaveURL(/\/ui-components$/);

    await page.goto("/");
    await page.getByRole("link", { name: "see every component" }).click();
    await expect(page).toHaveURL(/\/ui-components$/);
  });
});

test.describe("UI Components page does not have accessiblity issues", () => {
  test("Should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("/ui-components");

    console.log("Running accessibility scan on the UI Components page");

    // Every example is expanded first: a collapsed <details> hides its
    // contents from the scan, and the code blocks are part of the page.
    const disclosures = page.getByText("Code", { exact: true });
    const count = await disclosures.count();
    for (let index = 0; index < count; index += 1) {
      await disclosures.nth(index).click();
    }

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
