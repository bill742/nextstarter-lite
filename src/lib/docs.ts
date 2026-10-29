import type { Metadata } from "next";

/**
 * The pages under /docs.
 *
 * The sidebar, the previous/next links at the foot of each page, the page
 * headings, their metadata, and the sitemap all read from this list, so a new
 * page is added in one place and cannot end up in the nav without a route — or
 * in the sitemap without a heading.
 *
 * These pages document the free starter only. NextStarter Pro keeps its own
 * documentation in its private repository; anything that exists only there
 * (auth, database, billing, email, i18n) is deliberately left out.
 */
export type DocsPage = {
  /** One-sentence summary, used as the lede and the meta description. */
  description: string;
  /** The route. The overview lives at `/docs` itself. */
  href: string;
  /** Short label for the sidebar, where horizontal space is scarce. */
  label: string;
  /** The page heading and `<title>`. */
  title: string;
};

/** Every docs page, in reading order. */
export const docsPages: DocsPage[] = [
  {
    description:
      "What the starter includes, how these pages are organised, and the two conventions that run through the codebase.",
    href: "/docs",
    label: "Overview",
    title: "Documentation",
  },
  {
    description:
      "Scaffold a new project, choose a starting point, and have it running locally in a couple of minutes.",
    href: "/docs/getting-started",
    label: "Getting Started",
    title: "Getting Started",
  },
  {
    description:
      "Every environment variable the starter reads, what each one does, and which are safe to leave blank.",
    href: "/docs/environment-variables",
    label: "Environment Variables",
    title: "Environment Variables",
  },
  {
    description:
      "Rebrand the starter and replace its example content: name, colours, navigation, landing page, and components.",
    href: "/docs/customization",
    label: "Customization",
    title: "Customization",
  },
  {
    description:
      "Turn on cookieless PostHog analytics, the two settings that silently break it, and what going cookieless costs.",
    href: "/docs/analytics",
    label: "Analytics",
    title: "Analytics",
  },
  {
    description:
      "The Playwright and Axe-core test suite, Lighthouse CI, and every job the GitHub Actions workflow runs.",
    href: "/docs/testing",
    label: "Testing & CI",
    title: "Testing & CI",
  },
  {
    description:
      "Deploy to Vercel or any Node host, and the checks worth running once the site is live.",
    href: "/docs/deployment",
    label: "Deployment",
    title: "Deployment",
  },
];

/**
 * Looks up a docs page by its route.
 *
 * Throws rather than returning `undefined`: a page asking for an href that is
 * not in the list is a typo, and it should fail the build, not render a page
 * with no heading.
 *
 * @param href - The page's route, e.g. `/docs/testing`.
 * @returns The page entry.
 */
export const getDocsPage = (href: string): DocsPage => {
  const page = docsPages.find((entry) => entry.href === href);

  if (!page) throw new Error(`No docs page is registered for ${href}`);

  return page;
};

/**
 * Builds a docs page's metadata from its entry, so the title and description
 * cannot drift from the heading and lede the page renders.
 *
 * @param href - The page's route.
 * @returns Next.js metadata for the page.
 */
export const getDocsMetadata = (href: string): Metadata => {
  const page = getDocsPage(href);

  return {
    alternates: {
      canonical: page.href,
    },
    description: page.description,
    title: page.href === "/docs" ? page.title : `${page.title} — Docs`,
  };
};
