/**
 * The source data behind /whats-new.
 *
 * Two separate histories, because they are two separate products: this
 * repository (`bill742/nextstarter-lite`, MIT, free) and NextStarter Pro
 * (`742-Studios/nextstarter`, private, one-time purchase). A buyer deciding
 * whether Pro is still being worked on cannot see its repository, its
 * CHANGELOG, or its releases — so the Pro list is the only public evidence
 * that it is maintained, and it is kept factual for that reason.
 *
 * Entries are hand-written summaries of merged work rather than raw commit
 * subjects: the audience is someone deciding what to adopt or buy, not someone
 * reviewing the diff. `CHANGELOG.md` is the complete record and this is the
 * curated subset of it; add a new entry at the top of the relevant array when
 * something ships that a visitor would care about.
 *
 * **If you cloned this starter, both arrays are example content: they describe
 * NextStarter's history, not your project's.** Empty them and the `/whats-new`
 * route disappears along with its navigation entries and its sitemap listing —
 * the same way the upsell surface switches off without `NEXT_PUBLIC_PRO_URL`
 * (see `hasUpdates` below). Add your first entry and the page comes back.
 */

/** How an update is classified, following Keep a Changelog's vocabulary. */
export type UpdateTag =
  "Added" | "Changed" | "Fixed" | "Maintenance" | "Release" | "Security";

/** A single shipped update. */
export type UpdateEntry = {
  /** ISO `YYYY-MM-DD`, the date the work landed on `main`. */
  date: string;
  /** Stable anchor id, so an individual update can be linked to directly. */
  id: string;
  /** One or two sentences on what changed and why it matters. */
  summary: string;
  /** Which kind of change this is. */
  tag: UpdateTag;
  /** The headline, written as the outcome rather than the commit subject. */
  title: string;
};

/**
 * Formats an entry date for display.
 *
 * Fixed to `en-GB` and UTC rather than the visitor's locale and zone: these
 * pages are statically rendered, so a locale-dependent format would be frozen
 * at whatever the build machine happened to be, and a zone-dependent one can
 * render the day before west of Greenwich.
 *
 * @param date - An ISO `YYYY-MM-DD` date.
 * @returns The date as e.g. "31 August 2026".
 */
export const formatUpdateDate = (date: string): string =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));

/** Updates to this free starter, newest first. */
export const liteUpdates: UpdateEntry[] = [
  {
    date: "2026-08-31",
    id: "pro-screenshots",
    summary:
      "The Pro page now shows the dashboard, the admin panel, and a CRUD flow rather than describing them, and the free-versus-Pro comparison table fits a phone screen instead of scrolling sideways.",
    tag: "Added",
    title: "Screenshots of what Pro actually looks like",
  },
  {
    date: "2026-08-31",
    id: "playwright-container",
    summary:
      "The CI container is pinned to the same version as the Playwright test runner, so a dependency bump can no longer leave the workflow with no browser to launch. Screenshot specs now verify each image by fetching it instead of polling for its dimensions.",
    tag: "Maintenance",
    title: "Test runs made deterministic in CI",
  },
  {
    date: "2026-08-30",
    id: "hero-first",
    summary:
      "The landing page opens on a hero with the headline and calls to action instead of dropping straight into the About section, so what this is and what to do next are both above the fold.",
    tag: "Changed",
    title: "The home page leads with a hero",
  },
  {
    date: "2026-08-29",
    id: "cookieless-limits",
    summary:
      "The privacy notice claimed more than the setup delivers. It now states accurately that no location is derived from your IP address, and documents what cookieless measurement costs in return — returning visitors are counted as new ones after the hash rotates.",
    tag: "Changed",
    title: "Honest wording on what cookieless analytics can measure",
  },
  {
    date: "2026-08-29",
    id: "integration-cards",
    summary:
      "The integration cards on the Pro page scroll to their own section when activated, and a Safari-only bug that left the header stuck transparent over page content is fixed.",
    tag: "Fixed",
    title: "Integration card navigation and a Safari transparency bug",
  },
  {
    date: "2026-08-28",
    id: "posthog-token",
    summary:
      "The analytics variable is now NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, matching the name PostHog's own documentation uses, so pasting a value from their setup guide lands in the right place. A same-origin /ingest proxy was trialled the same week and reverted — it cost a serverless hop on every event without meaningfully improving delivery.",
    tag: "Changed",
    title: "The PostHog variable matches PostHog's documentation",
  },
  {
    date: "2026-08-27",
    id: "cookieless-analytics",
    summary:
      "Vercel Analytics is replaced by PostHog in cookieless mode: nothing is written to your device, so the site needs no cookie banner. A /privacy notice ships with it, linked from every page, and it reads the analytics configuration rather than asserting it — switch analytics off and the notice says so.",
    tag: "Added",
    title: "Cookieless analytics and a privacy notice",
  },
  {
    date: "2026-08-27",
    id: "schema-fixes",
    summary:
      "Three properties in the structured data were rejected by Google's Rich Results validator. All three are corrected, so the page's SoftwareApplication and FAQ markup now parses cleanly.",
    tag: "Fixed",
    title: "Structured data that the validator accepts",
  },
  {
    date: "2026-08-26",
    id: "about-rewrite",
    summary:
      "The About section was rewritten around what you get and who it is for, and ends at two calls to action instead of none. Assorted SEO work landed with it, including a restored header border on scroll.",
    tag: "Changed",
    title: "Rewritten About copy and SEO cleanup",
  },
  {
    date: "2026-08-25",
    id: "pro-section-nav",
    summary:
      "The Pro page carries a sticky section navigation once you scroll past the hero, and its sections no longer overflow on narrow screens.",
    tag: "Added",
    title: "A section navigation on the Pro page",
  },
  {
    date: "2026-08-25",
    id: "lighthouse-ci",
    summary:
      "Lighthouse now runs in CI with score thresholds that fail the build, which caught and fixed a broken heading hierarchy. Linting in CI uses the project's own ESLint toolchain rather than a separate action, and supply-chain hardening moved onto the npm install path so it applies to every install.",
    tag: "Added",
    title: "Lighthouse budgets enforced on every push",
  },
  {
    date: "2026-08-24",
    id: "pro-page",
    summary:
      "The Pro pitch became a full page — comparison, integrations, delivery terms, and FAQ — and the whole upsell surface became opt-in. With no NEXT_PUBLIC_PRO_URL set, the teaser, the navigation entries, and the /pro and /thanks routes all switch off together, so a project scaffolded from this starter never ships someone else's sales pitch.",
    tag: "Added",
    title: "A real Pro landing page, and an upsell you can switch off",
  },
  {
    date: "2026-08-24",
    id: "mit-license",
    summary:
      "The repository carries an explicit MIT license, so what you may do with it is written down rather than assumed.",
    tag: "Added",
    title: "MIT license",
  },
  {
    date: "2026-08-19",
    id: "dependency-security",
    summary:
      "Next.js, PostCSS, js-yaml, and brace-expansion were upgraded to clear reported vulnerabilities.",
    tag: "Security",
    title: "Security updates to dependencies",
  },
  {
    date: "2026-08-14",
    id: "thanks-page",
    summary:
      "A post-purchase page for buyers returning from checkout, and a fix for section links that previously did nothing when clicked from a route other than the home page — they now route home first, then scroll.",
    tag: "Added",
    title: "A post-purchase page and cross-route section links",
  },
  {
    date: "2026-07-16",
    id: "pro-upsell-copy",
    summary:
      "The first Pro upsell content landed on the landing page, describing what the paid version adds.",
    tag: "Added",
    title: "Pro upsell content",
  },
  {
    date: "2026-07-06",
    id: "native-build-scripts",
    summary:
      "sharp and unrs-resolver are allowlisted to run their native build scripts, which unblocks image optimization on a fresh install.",
    tag: "Fixed",
    title: "Native build scripts allowed for sharp and unrs-resolver",
  },
  {
    date: "2026-07-02",
    id: "speed-insights",
    summary:
      "Vercel Speed Insights was wired up to report real-user performance. It was superseded by PostHog's cookieless performance measurement in August.",
    tag: "Added",
    title: "Vercel Speed Insights",
  },
  {
    date: "2026-06-29",
    id: "playwright-ci",
    summary:
      "The Playwright job runs in Playwright's official container with browsers prebaked, which fixed a CI hang during browser installation, and the dark-mode accessibility scan was stabilized across all three browsers.",
    tag: "Fixed",
    title: "A CI suite that finishes",
  },
  {
    date: "2026-06-29",
    id: "landing-upgrades",
    summary:
      "A pass over the landing page sections and the repository rename that this project now lives under.",
    tag: "Changed",
    title: "Landing page upgrades and repository rename",
  },
];

/**
 * Whether this deployment has any history of its own to publish.
 *
 * Gating the route, the two navigation entries, and the sitemap on one value is
 * the same bargain `isUpsellEnabled` makes: it is impossible for the nav to
 * link to a page that 404s, because every one of them reads this.
 */
export const hasUpdates = liteUpdates.length > 0;

/** Updates to NextStarter Pro, newest first. */
export const proUpdates: UpdateEntry[] = [
  {
    date: "2026-09-02",
    id: "pro-1-0-0",
    summary:
      "The first stable release, tagged nextstarter-v1.0.0, gathering everything below into one version. Access is by git pull from the repository's main branch, so this is not a drop of new code — the version number is there so a project can record which release it started from, and so future updates can be described against it.",
    tag: "Release",
    title: "NextStarter Pro 1.0.0",
  },
  {
    date: "2026-09-01",
    id: "pro-neutral-copy",
    summary:
      "The landing page you inherit opens with a hero carrying the page's only h1, three proof points, and neutral placeholder copy — \u201cShip your product, not the plumbing\u201d, with the brand taken from your own environment variables. The price and the purchase button exist only inside the upsell branch, so a project with no checkout configured inherits a hero with no sales copy in it at all.",
    tag: "Added",
    title: "A landing page written for your product, not ours",
  },
  {
    date: "2026-09-01",
    id: "pro-metadata",
    summary:
      "Complete page metadata in the locale layout: keywords, publisher, explicit robots directives — including googleBot with max-image-preview, max-snippet, and max-video-preview — the Open Graph fields that were missing (type, url, siteName, locale), and a Twitter title and description.",
    tag: "Added",
    title: "Page metadata a crawler can use",
  },
  {
    date: "2026-09-01",
    id: "pro-posthog-token",
    summary:
      "The analytics variable is now NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN, the name PostHog's own dashboard and documentation use. Rename it in your .env when you pull this update: with the old NEXT_PUBLIC_POSTHOG_KEY still set, analytics silently stays off rather than failing loudly.",
    tag: "Changed",
    title: "The PostHog variable matches PostHog's documentation",
  },
  {
    date: "2026-09-01",
    id: "pro-schema",
    summary:
      "SoftwareApplication and Organization structured data on the public routes only — never the auth-gated dashboard and admin trees — plus a generated Open Graph share card. Payloads are escaped through a serializer, so a site name containing markup cannot break out of the script tag.",
    tag: "Added",
    title: "JSON-LD structured data and a generated share card",
  },
  {
    date: "2026-09-01",
    id: "pro-privacy",
    summary:
      "A privacy notice that derives its claims from your configuration instead of asserting them: each section is gated on the same guard that switches its integration on, so a keyless install truthfully says it collects nothing and enabling Stripe makes the payments section appear. It is jurisdiction-neutral and ships behind a visible \u201creview before you launch\u201d banner, isolated in one component so removing it is one import and one line.",
    tag: "Added",
    title: "A privacy notice that reads your configuration",
  },
  {
    date: "2026-09-01",
    id: "pro-contrast",
    summary:
      "Every orange gradient button fell short of the 4.5:1 WCAG AA ratio at its right-hand end, and all of them failed in dark mode against a colour class that had never resolved. Both are fixed, and a spec now samples every gradient control's stops in both themes so a regression fails the build — axe-core cannot evaluate contrast against a gradient and had been passing straight over them.",
    tag: "Fixed",
    title: "WCAG AA contrast on every gradient button",
  },
  {
    date: "2026-09-01",
    id: "pro-lighthouse",
    summary:
      "Lighthouse CI runs on both the mobile and desktop presets, with thresholds that fail the build. Mobile performance on the home page is a known open issue and is tracked as a warning rather than being quietly ignored.",
    tag: "Added",
    title: "Lighthouse CI on mobile and desktop",
  },
  {
    date: "2026-09-01",
    id: "pro-headings",
    summary:
      "Moving the site h1 into the landing hero left the auth, admin, billing, projects, and waitlist “not configured” notices with no level-one heading at all, failing 24 accessibility checks across eight routes and three browsers. Each notice now owns the page heading, and the dashboard's heading levels no longer skip.",
    tag: "Fixed",
    title: "A level-one heading on every route",
  },
  {
    date: "2026-09-01",
    id: "pro-a11y-repaint",
    summary:
      "Accessibility scans were landing mid-repaint after the theme toggle, reporting page-wide contrast failures against blended colours belonging to neither theme. A shared helper now waits for every transition to finish before scanning, which ended the intermittent Firefox failures.",
    tag: "Fixed",
    title: "Accessibility scans that wait for the repaint",
  },
  {
    date: "2026-09-01",
    id: "pro-billing-separation",
    summary:
      "Polar and Stripe both appeared in the example environment file with nothing saying which was which. The docs now separate selling this starter from billing your own application, and name the section to delete once you own the code.",
    tag: "Changed",
    title: "Selling the starter separated from billing your app",
  },
  {
    date: "2026-08-31",
    id: "pro-db-unavailable",
    summary:
      "A configured but unreachable database — a paused Supabase project being the common case — used to take its pages down to the global error boundary. The admin overview, dashboard projects, and waitlist pages now render a “try again” notice instead, with the cause reported to Sentry and never exposed to the visitor.",
    tag: "Fixed",
    title: "Pages that survive a database outage",
  },
  {
    date: "2026-08-24",
    id: "pro-refund",
    summary:
      "The 14-day refund guarantee is stated in the license itself rather than only on the sales page.",
    tag: "Changed",
    title: "The refund guarantee written into the license",
  },
  {
    date: "2026-08-19",
    id: "pro-first-run",
    summary:
      "With no .env file, the very first npm run dev after a clone rendered an error page instead of the landing page. Environment values now fall back to documented defaults, so a keyless first run looks like a configured one.",
    tag: "Fixed",
    title: "A first run that works before you configure anything",
  },
  {
    date: "2026-08-19",
    id: "pro-dependency-security",
    summary:
      "Dependencies were upgraded to close published advisories: Next.js 16.2.6 to 16.3.1, Prisma 7.8.0 to 7.9.1, DOMPurify 3.4.11 to 3.4.13, plus postcss, brace-expansion, fast-uri, socket.io-parser, and valibot.",
    tag: "Security",
    title: "Security updates to dependencies",
  },
  {
    date: "2026-08-17",
    id: "pro-verified-email",
    summary:
      "Admin access is now granted only against a verified email address, and the Clerk webhook no longer persists unverified addresses to the database; both paths are covered by unit tests. Shipped alongside two smaller pieces of hardening: .gitignore now covers every .env variant rather than the bare file — vercel env pull writes .env.local, which the old pattern missed — and dangerouslySetInnerHTML is now an ESLint error, which keeps the no-raw-HTML precondition the content security policy depends on enforced rather than assumed.",
    tag: "Security",
    title: "Admin access requires a verified email address",
  },
  {
    date: "2026-08-17",
    id: "pro-repo-access",
    summary:
      "The documentation said buyers are added as a collaborator, implying the invite fires on payment alone. It does not — you connect a GitHub account in the customer portal first, and the invitation follows. All four buyer-facing places now describe the same flow, confirmed against a test purchase.",
    tag: "Changed",
    title: "How repository access actually arrives, described accurately",
  },
  {
    date: "2026-08-05",
    id: "pro-lockfile",
    summary:
      "npm ci aborted before any CI job ran, taking linting, Playwright, and code review down with it: an optional peer dependency resolved differently for Dependabot than for npm, so a lockfile regenerated on one side failed on the other. Pinning @swc/helpers through an overrides entry settled it, and the tree no longer depends on how a given resolver treats optional peers.",
    tag: "Fixed",
    title: "A lockfile that installs the same way everywhere",
  },
  {
    date: "2026-07-18",
    id: "pro-canonicals",
    summary:
      "Localized pages emitted a locale-less canonical URL that only redirected. Every public page now self-references its own locale and advertises hreflang alternates for the others.",
    tag: "Fixed",
    title: "Locale-aware canonical URLs and hreflang alternates",
  },
  {
    date: "2026-07-17",
    id: "pro-license",
    summary:
      "A single-developer commercial license covering unlimited personal and commercial projects, plus a written guide to pulling updates into a project you have already started building on.",
    tag: "Added",
    title: "A commercial license and an updates guide",
  },
  {
    date: "2026-07-16",
    id: "pro-docs",
    summary:
      "A full documentation set in the repository — setup, a guide per integration, environment variables, and deployment walkthroughs for Vercel and for self-hosting — versioned alongside the code it describes.",
    tag: "Added",
    title: "Documentation for every integration",
  },
  {
    date: "2026-07-14",
    id: "pro-i18n",
    summary:
      "Internationalization with next-intl: locale-prefixed routing, message catalogues, and right-to-left support.",
    tag: "Added",
    title: "Internationalization with RTL support",
  },
  {
    date: "2026-07-10",
    id: "pro-hardening",
    summary:
      "Rate limiting on the API routes, security headers including a content security policy, and input sanitization on the paths that accept user content.",
    tag: "Added",
    title: "API rate limiting, security headers, and input sanitization",
  },
  {
    date: "2026-07-06",
    id: "pro-admin",
    summary:
      "An admin dashboard behind an email allowlist, a waitlist with CSV export, and optional Sentry error tracking that stays inert until you supply a DSN.",
    tag: "Added",
    title: "Admin panel, waitlist, and error tracking",
  },
  {
    date: "2026-07-05",
    id: "pro-analytics",
    summary:
      "PostHog product analytics, wired up and switched off by default until configured.",
    tag: "Added",
    title: "Product analytics",
  },
  {
    date: "2026-07-03",
    id: "pro-forms-blog",
    summary:
      "Server-validated form handling with typed errors, and an MDX blog with the routing, metadata, and feed already built.",
    tag: "Added",
    title: "Form handling and an MDX blog",
  },
  {
    date: "2026-07-02",
    id: "pro-dashboard",
    summary:
      "The authenticated application shell — navigation, layout, and the project CRUD screens the rest of the dashboard is built on.",
    tag: "Added",
    title: "The dashboard app shell",
  },
  {
    date: "2026-06-30",
    id: "pro-rls",
    summary:
      "Row Level Security is documented, so the database policies that keep one tenant's rows away from another are explained rather than left to be inferred.",
    tag: "Added",
    title: "Row Level Security documented",
  },
];
