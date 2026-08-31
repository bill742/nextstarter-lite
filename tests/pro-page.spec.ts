/* eslint-disable no-console */
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

/**
 * The upsell surface is optional (see src/lib/upsell.ts). With no
 * NEXT_PUBLIC_PRO_URL the routes 404 by design, so these specs skip rather
 * than fail — which is the state of a fork, or of any project scaffolded from
 * this starter.
 */
const upsellEnabled = Boolean(process.env.NEXT_PUBLIC_PRO_URL);

test.describe("Pro page", () => {
  test.skip(!upsellEnabled, "NEXT_PUBLIC_PRO_URL is not set");
  test("Verify the pitch, comparison table, and CTAs are shown", async ({
    page,
  }) => {
    await page.goto("/pro");

    await expect(
      page.getByRole("heading", { level: 1, name: /NextStarter Pro/ })
    ).toBeVisible();

    // The comparison table is the page's answer to "free or paid?" — it must
    // render as a real table so it is navigable in a screen reader.
    const table = page.getByRole("table");
    await expect(table).toBeVisible();
    await expect(
      table.getByRole("columnheader", { name: /Pro/ })
    ).toBeVisible();
    await expect(
      table.getByRole("rowheader", { name: "Authentication with Clerk" })
    ).toBeVisible();

    // One named section per integration is what makes the page eligible to
    // rank for stack-specific queries; a missing one is a silent SEO loss.
    for (const heading of [
      "Authentication with Clerk",
      "Database with Prisma and PostgreSQL",
      "Payments and subscriptions with Stripe",
      "Internationalization with RTL support",
    ]) {
      await expect(
        page.getByRole("heading", { level: 3, name: heading })
      ).toBeVisible();
    }

    const buyLinks = page.getByRole("link", {
      name: /Get NextStarter Pro/,
    });
    await expect(buyLinks).toHaveCount(2);
    await expect(buyLinks.first()).toHaveAttribute("target", "_blank");
    await expect(buyLinks.first()).toHaveAttribute("rel", /noopener/);
  });

  // A screenshot with a wrong path still renders its alt text and still
  // passes the axe scan, so nothing else on this page would notice. These
  // assert the bytes actually arrived.
  test("Verify the product screenshots load and are captioned", async ({
    page,
  }) => {
    await page.goto("/pro");

    const screenshots = [
      {
        alt: /Projects page of the Pro dashboard/,
        section: "#database",
      },
      {
        alt: /Getting started page inside the Pro dashboard/,
        section: "#dashboard",
      },
      {
        alt: /header with the Arabic locale selected/,
        section: "#internationalization",
      },
    ];

    for (const { alt, section } of screenshots) {
      const figure = page.locator(section).locator("figure");
      await expect(figure).toHaveCount(1);

      const image = figure.getByRole("img", { name: alt });
      await expect(image).toBeVisible();

      // These sit well below the fold and next/image lazy-loads by default,
      // so nothing is fetched until a reader gets here.
      await figure.scrollIntoViewIfNeeded();

      // naturalWidth stays 0 when the request 404s.
      await expect
        .poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth))
        .toBeGreaterThan(0);

      // The caption is a separate line of copy, not a repeat of the alt text:
      // a screen reader announces both.
      const caption = figure.locator("figcaption");
      await expect(caption).toBeVisible();
      await expect(caption).not.toBeEmpty();
    }
  });

  test("Verify the FAQ expands and its answers ship in the DOM", async ({
    page,
  }) => {
    await page.goto("/pro");

    const refunds = page.locator("#refunds");
    const answer = refunds.getByText(/14-day money-back guarantee/);

    // Collapsed <details> keeps its content in the DOM, which is what lets
    // search engines index answers the visitor has not opened.
    await expect(answer).toBeAttached();
    await expect(answer).not.toBeVisible();

    await refunds.getByRole("group").or(refunds).locator("summary").click();
    await expect(answer).toBeVisible();
  });

  test("Verify the section nav reaches each anchor on the page", async ({
    page,
  }) => {
    await page.goto("/pro");

    const sectionNav = page.getByRole("navigation", { name: "On this page" });

    // Real anchors, not scroll buttons: the href is what a reader copies and
    // what a crawler follows down into the page's sections.
    const included = sectionNav.getByRole("link", { name: "What Pro adds" });
    await expect(included).toHaveAttribute("href", "#included");

    await included.click();
    await expect(page.locator("section#included")).toBeInViewport();

    // The nav stays put and reports where the reader is.
    await expect(sectionNav).toBeInViewport();
    await expect(included).toHaveAttribute("aria-current", "location");

    const faq = sectionNav.getByRole("link", { name: "FAQ" });
    await faq.click();
    await expect(page.locator("section#faq")).toBeInViewport();
    await expect(faq).toHaveAttribute("aria-current", "location");
    await expect(included).not.toHaveAttribute("aria-current", "location");
  });

  test("Verify the page does not scroll sideways on a narrow screen", async ({
    page,
  }) => {
    // Narrower than the min-width the table used to carry, which is what
    // forced it to scroll sideways.
    await page.setViewportSize({ height: 800, width: 320 });
    await page.goto("/pro");

    // Neither the page nor the table scrolls sideways. The table shrinks to
    // fit instead: a scrolling table gives no hint that it scrolls, and the
    // columns parked off the right edge are the ones being compared.
    //
    // The page-level half of this is not automatic — an sr-only span is
    // positioned absolutely, so it escapes the table's container unless that
    // container is its containing block, and turns into a horizontal
    // scrollbar on the whole page.
    const layout = await page.evaluate(() => {
      const scroller = document.querySelector("#compare .overflow-x-auto");

      return {
        pageScrolls:
          document.documentElement.scrollWidth >
          document.documentElement.clientWidth,
        tableScrolls: scroller
          ? scroller.scrollWidth > scroller.clientWidth
          : false,
      };
    });

    expect(layout.pageScrolls).toBe(false);
    expect(layout.tableScrolls).toBe(false);

    // Both comparison columns have to be on screen for the table to say
    // anything at all. Measured horizontally rather than with toBeInViewport,
    // which also asks about vertical position — irrelevant here, and true only
    // for whichever part of a long table happens to be scrolled to.
    const proColumn = await page
      .getByRole("columnheader", { name: /Pro/ })
      .boundingBox();

    expect(proColumn).not.toBeNull();
    expect(proColumn!.x + proColumn!.width).toBeLessThanOrEqual(320);
  });

  test("Verify metadata and structured data", async ({ page }) => {
    await page.goto("/pro");

    console.log("Checking metadata on the pro page");

    const title = await page.title();
    expect(title).toBe(
      "NextStarter Pro — Auth, Payments & Database | NextStarter"
    );

    // /pro must self-canonical. Pointing it at the home page would drop it
    // from the index, which is the opposite of why the route exists.
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(canonical).toContain("/pro");

    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .allTextContents();
    const types = jsonLd.map((block) => JSON.parse(block)["@type"]);
    expect(types).toContain("FAQPage");
    expect(types).toContain("BreadcrumbList");

    // The FAQ markup must describe the questions the page actually shows.
    const faq = jsonLd
      .map((block) => JSON.parse(block))
      .find((block) => block["@type"] === "FAQPage");
    expect(faq.mainEntity.length).toBeGreaterThan(0);
    for (const entry of faq.mainEntity) {
      await expect(
        page.locator("#faq summary").filter({ hasText: entry.name })
      ).toHaveCount(1);
    }
  });

  test("Verify the page links back to the free version", async ({ page }) => {
    await page.goto("/pro");

    await page
      .getByRole("link", { name: "Or start with the free version" })
      .click();
    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe("Pro page does not have accessiblity issues", () => {
  test.skip(!upsellEnabled, "NEXT_PUBLIC_PRO_URL is not set");
  test("Should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.goto("/pro");

    console.log("Running accessibility scan on the pro page");

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

    // The click leaves the toggle focused, which opens its tooltip. Drop focus
    // and wait for the tooltip to close so the scan runs on a stable page.
    await themeToggle.first().blur();
    await expect(page.getByRole("tooltip")).toHaveCount(0);

    const darkModeAccessibilityScanResults = await new AxeBuilder({
      page,
    }).analyze();
    expect(darkModeAccessibilityScanResults.violations).toEqual([]);
  });

  test("Should not have accessibility issues with the FAQ expanded", async ({
    page,
  }) => {
    await page.goto("/pro");

    // The collapsed state is what the first scan covers; expanded answers are
    // a different DOM and deserve their own pass.
    for (const summary of await page.locator("#faq summary").all()) {
      await summary.click();
    }

    console.log("Running accessibility scan on the expanded pro page FAQ");

    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });
});

/**
 * The homepage entry points into /pro. These live here, alongside the /pro
 * tests, because the whole upsell surface is optional: a project scaffolded
 * from this starter has no NEXT_PUBLIC_PRO_URL, so the teaser, the nav links,
 * and this spec file all go away together.
 */
test.describe("Home page entry points into Pro", () => {
  test.skip(!upsellEnabled, "NEXT_PUBLIC_PRO_URL is not set");
  test("Pro nav link is a real anchor to /pro, not a scroll button", async ({
    page,
  }) => {
    await page.goto("./");

    // /pro only earns its ranking if the nav actually links to it. A button
    // calling router.push() navigates fine for a user but is invisible to a
    // crawler, which defeats the point of splitting the page out.
    const proNav = page
      .getByRole("navigation")
      .getByRole("link", { exact: true, name: "Pro" });
    await expect(proNav).toHaveAttribute("href", "/pro");

    await proNav.click();
    await expect(page).toHaveURL(/\/pro$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /NextStarter Pro/ })
    ).toBeVisible();
  });

  test("the homepage teaser section is still reachable by its anchor", async ({
    page,
  }) => {
    // Inbound links to nextstarter.app/#pro predate the /pro route and must
    // still land somewhere sensible rather than nowhere.
    await page.goto("./#pro");

    await expect(page.locator("section#pro")).toBeInViewport();
  });

  test("teaser pitches Pro briefly and offers both a detail and a buy path", async ({
    page,
  }) => {
    await page.goto("./");
    const pro = page.locator("section#pro");

    // The section is a teaser on purpose: the full pitch lives at /pro so the
    // two pages target different queries instead of competing. If this section
    // grows into a second full pitch, that separation is gone.
    await expect(pro.getByText("$199 once.")).toBeVisible();
    const words = ((await pro.innerText()) ?? "").split(/\s+/).filter(Boolean);
    expect(words.length).toBeLessThan(120);

    // Two CTAs, two audiences: the browser who wants detail, and the visitor
    // who is already convinced and should not need an extra click to buy.
    const detail = pro.getByRole("link", { name: /See everything in Pro/ });
    await expect(detail).toHaveAttribute("href", "/pro");

    const buy = pro.getByRole("link", { name: "Buy now" });
    await expect(buy).toBeVisible();
    await expect(buy).toHaveAttribute("target", "_blank");
    expect(await buy.getAttribute("href")).toMatch(/^https?:\/\//);
  });

  test("See everything in Pro navigates to the /pro page", async ({ page }) => {
    await page.goto("./");

    await page
      .locator("section#pro")
      .getByRole("link", { name: /See everything in Pro/ })
      .click();

    await expect(page).toHaveURL(/\/pro$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /NextStarter Pro/ })
    ).toBeVisible();
  });

  test("Buy now CTA points at the configured purchase URL, off this site", async ({
    page,
  }) => {
    const proUrl = process.env.NEXT_PUBLIC_PRO_URL;

    // Skips where the purchase URL isn't configured — a fresh clone of this
    // starter has no checkout link of its own yet.
    test.skip(
      !proUrl,
      "NEXT_PUBLIC_PRO_URL is not set in this environment; nothing to verify"
    );

    await page.goto("./");
    const href = await page
      .locator("section#pro")
      .getByRole("link", { name: "Buy now" })
      .getAttribute("href");

    // Catches a build that didn't pick the variable up.
    expect(href).toBe(proUrl);

    // Catches the failure that silently kills sales: the component falls back
    // to the marketing site when the variable is missing, so the buy button
    // links to the very page it sits on and every test above still passes.
    const siteOrigin = new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    ).origin;
    expect(new URL(href as string).origin).not.toBe(siteOrigin);
  });

  test("Footer Pro quick link goes straight to /pro", async ({ page }) => {
    // A route link, not a section link — it must not detour via the home page
    // the way the scroll-to-section items do.
    await page.goto("/this-route-does-not-exist");

    const proLink = page
      .locator("footer")
      .getByRole("link", { name: "Upgrade to Pro" });
    await expect(proLink).toHaveAttribute("href", "/pro");

    await proLink.click();
    await expect(page).toHaveURL(/\/pro$/);
  });
});
