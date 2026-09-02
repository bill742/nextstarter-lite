# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

This file is the complete record of what changed. The `/whats-new` page is a
curated subset of it written for visitors rather than for people reading the
code — when something ships that a visitor would care about, it belongs in both
(`src/lib/changelog.ts`).

## [Unreleased]

## [1.0.0] - 2026-09-02

First tagged release. The project split from the private NextStarter repository
on 12 March 2026 and ran untagged until now, so this release covers everything
built since then; `/whats-new` carries the same history with a date against each
change.

### Added

- The landing page: a hero carrying the page's only `h1`, followed by About,
  Tech Stack, Features, and Getting Started sections.
- `/pro`, a full marketing page for the paid version — a free-versus-Pro
  comparison table, the integration list, three product screenshots, the
  delivery terms, an FAQ, and a sticky section navigation that appears once the
  reader scrolls past the hero.
- `/thanks`, the post-purchase page buyers return to from checkout. It is
  `noindex` and reads nothing from the address bar, so no order identifier can
  reach analytics.
- `/privacy`, a notice that derives its claims from configuration rather than
  asserting them: with analytics switched off it says so, and the purchase
  section renders only where a checkout is configured.
- `/whats-new`, listing updates to this starter and to NextStarter Pro with the
  date each one shipped. Its data lives in `src/lib/changelog.ts` and is
  **example content** — see "Making this yours" in the README.
- An upsell surface that switches off as a unit. With no `NEXT_PUBLIC_PRO_URL`,
  the home-page teaser, the navigation entries, and the `/pro` and `/thanks`
  routes all disappear together, so a project scaffolded from this starter never
  ships someone else's sales pitch or a link to a page that 404s.
- Cookieless analytics through PostHog. Nothing is written to the visitor's
  device, so the site needs no cookie banner; click tracking and session
  recording are off.
- JSON-LD structured data (`src/lib/schema.ts`) and generated Open Graph share
  cards for the home and `/pro` pages.
- `sitemap.xml` and `robots.txt`, both tracking the upsell gate so a switched-off
  route is never advertised to crawlers.
- A light/dark theme toggle backed by `next-themes`, with no hydration flash.
- A Playwright suite covering every route across Chromium, Firefox, and WebKit,
  including `axe-core` accessibility scans in both themes.
- Lighthouse CI on the mobile and desktop presets, with score thresholds that
  fail the build.
- A React Doctor CI workflow and an `npm run doctor` script.
- Dependabot, grouped so minor and patch updates arrive as one pull request.
- An MIT license.

### Changed

- The repository was renamed to `nextstarter-lite` and its GitHub URLs updated
  throughout (29 June 2026).
- Analytics moved twice: Vercel Analytics at first, then Vercel Speed Insights
  alongside it, and finally PostHog in cookieless mode — which replaced both.
  The marketing copy moved PostHog into the free tier's feature list at the same
  time.
- The analytics variable is now `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`, the name
  PostHog's own dashboard and documentation use. A same-origin `/ingest` proxy
  was trialled and reverted: it cost a serverless hop on every event without
  meaningfully improving delivery.
- The home page opens on the hero rather than dropping straight into the About
  section, so what this is and what to do next are both above the fold.
- The About copy was rewritten around what the starter gives you and who it is
  for, and now ends at two calls to action.
- The privacy notice no longer claims more than the setup delivers: it states
  that no location is derived from the visitor's IP address, and documents what
  cookieless measurement costs in return.
- The FAQ describes how repository access actually arrives — the buyer connects
  a GitHub account in the customer portal, and the invitation follows — rather
  than implying it fires on payment alone.
- Supply-chain hardening moved onto the `npm install` path so it applies to every
  install, and CI lints with the project's own ESLint toolchain instead of a
  separate action.

### Fixed

- `sharp` and `unrs-resolver` are allowlisted to run their native build scripts,
  which unblocks image optimization on a fresh install.
- The Playwright job no longer hangs. It runs in Playwright's official container
  with browsers prebaked, and that container is pinned to the same version as the
  test runner, so a dependency bump cannot leave the workflow with no browser to
  launch.
- Screenshot specs verify each image by fetching it rather than polling for its
  dimensions, which removed an assertion race.
- The dark-mode accessibility scan is stable across all three browsers.
- Section links work from any route. Clicking one from `/pro` used to do nothing;
  it now routes home first, then scrolls.
- The header no longer stays transparent over content, and its border returns on
  scroll — including in Safari, which needed the transparency handled
  differently.
- The free-versus-Pro comparison table fits a phone screen instead of scrolling
  sideways.
- A duplicate `delivery` element id on `/pro`.
- Three structured-data properties that Google's Rich Results validator rejected.
- The heading hierarchy, caught by the Lighthouse thresholds above.
- A CRUD screenshot was converted from Display P3 to sRGB so it renders with the
  same colours everywhere.

### Security

- Dependency updates closing published advisories, most of them Dependabot
  bumps: Next.js and PostCSS, plus `js-yaml`, `brace-expansion`, and `nanoid`.

[Unreleased]: https://github.com/bill742/nextstarter-lite/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/bill742/nextstarter-lite/releases/tag/v1.0.0
