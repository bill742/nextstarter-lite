import Link from "next/link";

import DocsArticle from "@/components/docs/docs-article";
import { Code, DocsLink, DocsSection } from "@/components/docs/prose";
import { docsPages, getDocsMetadata } from "@/lib/docs";
import { githubUrl, isGithubEnabled } from "@/lib/github";

const HREF = "/docs";

export const metadata = getDocsMetadata(HREF);

/**
 * The docs overview — what the starter is, and a card for every other page.
 *
 * @returns The /docs page.
 */
const DocsOverview = () => (
  <DocsArticle href={HREF}>
    <DocsSection id="what-is-included" title="What the starter includes">
      <p>
        NextStarter is a Next.js 16 App Router project with TypeScript in strict
        mode, Tailwind CSS v4, shadcn/ui components on Radix primitives, light
        and dark themes, and a Playwright test suite that runs an Axe-core
        accessibility scan in both themes. GitHub Actions lints, type-checks,
        tests, and runs Lighthouse on every push. Cookieless PostHog analytics
        is wired in but switched off until you add a key.
      </p>
      <p>
        It is MIT licensed and there is nothing to sign up for.
        {isGithubEnabled ? (
          <>
            {" "}
            The <DocsLink href={githubUrl}>README on GitHub</DocsLink> is the
            quick overview. These pages go into more detail.
          </>
        ) : null}
      </p>
    </DocsSection>

    <DocsSection id="pages" title="In these docs">
      <ul className="grid gap-4 sm:grid-cols-2">
        {docsPages
          .filter((page) => page.href !== HREF)
          .map((page) => (
            <li key={page.href}>
              <Link
                className="group block h-full rounded-lg border border-stone-200 bg-white p-5 transition-colors hover:border-orange-300 dark:border-stone-800 dark:bg-stone-900/50 dark:hover:border-orange-800"
                href={page.href}
              >
                <span className="font-medium text-stone-900 group-hover:text-orange-800 dark:text-stone-50 dark:group-hover:text-orange-400">
                  {page.title}
                </span>
                <span className="mt-1 block text-sm">{page.description}</span>
              </Link>
            </li>
          ))}
      </ul>
    </DocsSection>

    <DocsSection id="conventions" title="Two conventions worth knowing">
      <p>
        Both of these run through the whole codebase. Follow them when you add
        to it.
      </p>
      <ol className="list-decimal space-y-3 pl-6">
        <li>
          <strong className="text-stone-900 dark:text-stone-200">
            Optional features are switched on by configuration.
          </strong>{" "}
          Each one reads a single flag derived from an environment variable,
          such as <Code>isAnalyticsEnabled</Code> in{" "}
          <Code>src/lib/analytics.ts</Code>. With the variable blank, the
          feature does nothing: no script loads, no link renders, and any route
          it owns returns a 404. The navigation, the sitemap, and the privacy
          notice all read the same flag, so they can never point at something
          that is switched off. The app builds, runs, and passes CI with no keys
          at all.
        </li>
        <li>
          <strong className="text-stone-900 dark:text-stone-200">
            Accessibility is tested, not assumed.
          </strong>{" "}
          Every page is scanned with Axe-core in light and dark mode, and CI
          fails on any violation. New UI is held to the same WCAG 2.1 AA bar.
          See <DocsLink href="/docs/testing">Testing &amp; CI</DocsLink>.
        </li>
      </ol>
    </DocsSection>
  </DocsArticle>
);

DocsOverview.displayName = "DocsOverview";

export default DocsOverview;
