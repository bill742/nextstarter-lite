/** One row of the Free vs Pro table. `free` marks what Lite already ships. */
const rows: { free: boolean; label: string }[] = [
  { free: true, label: "Next.js 16, TypeScript & Tailwind CSS v4" },
  { free: true, label: "shadcn/ui components with light & dark theming" },
  { free: true, label: "WCAG 2.1 AA, verified with Axe-core" },
  { free: true, label: "Lighthouse 100/100/100/100 on desktop" },
  { free: true, label: "Playwright E2E, ESLint, Prettier & GitHub Actions CI" },
  { free: true, label: "SEO essentials - robots.txt, sitemap.xml, custom 404" },
  { free: false, label: "Authentication with Clerk" },
  { free: false, label: "Database with Prisma + PostgreSQL" },
  { free: false, label: "Stripe subscriptions & customer portal" },
  { free: false, label: "Transactional email with Resend" },
  { free: false, label: "Dashboard app shell & admin panel" },
  { free: false, label: "MDX blog & validated contact form" },
  {
    free: false,
    label: "Internationalization - English, Spanish, Arabic (RTL)",
  },
  { free: false, label: "Security headers, CSP & API rate limiting" },
  { free: false, label: "PostHog analytics & Sentry error tracking" },
];

/**
 * A table cell marking a feature as included or not.
 *
 * The glyph is decorative; the meaning is carried by visually hidden text so
 * the table reads correctly in a screen reader.
 *
 * @param included - Whether the tier includes this feature.
 * @returns A centered cell with an accessible included/not-included marker.
 */
const Mark = ({ included }: { included: boolean }) => (
  <td className="px-4 py-3 text-center">
    <span className="sr-only">{included ? "Included" : "Not included"}</span>
    {included ? (
      <span
        className="text-lg font-bold text-orange-600 dark:text-orange-400"
        aria-hidden="true"
      >
        ✓
      </span>
    ) : (
      <span className="text-stone-400 dark:text-stone-600" aria-hidden="true">
        —
      </span>
    )}
  </td>
);

Mark.displayName = "Mark";

/**
 * Free vs Pro comparison table.
 *
 * Answers the visitor's actual decision — and makes the free tier look
 * generous, which helps the top of the funnel as much as the paid page.
 *
 * @returns The comparison section.
 */
const Comparison = () => {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 py-24 md:py-32" id="compare">
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="font-serif text-3xl font-bold text-stone-900 md:text-4xl dark:text-stone-50">
              Free vs. Pro
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-300">
              Everything in the free starter is in Pro too. Pro adds the parts
              every SaaS ends up building by hand.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900/50">
            <table className="w-full min-w-md border-collapse text-left">
              <caption className="sr-only">
                A feature comparison of the free NextStarter starter and
                NextStarter Pro
              </caption>
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800">
                  <th
                    scope="col"
                    className="px-4 py-4 font-serif text-base font-bold text-stone-900 dark:text-stone-50"
                  >
                    Feature
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-center font-serif text-base font-bold text-stone-900 dark:text-stone-50"
                  >
                    Free
                    <span className="block text-sm font-normal text-stone-500 dark:text-stone-400">
                      $0
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-4 text-center font-serif text-base font-bold text-stone-900 dark:text-stone-50"
                  >
                    Pro
                    <span className="block text-sm font-normal text-stone-500 dark:text-stone-400">
                      $199 once
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-stone-100 last:border-0 dark:border-stone-800/60"
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 font-normal text-stone-700 dark:text-stone-300"
                    >
                      {row.label}
                    </th>
                    <Mark included={row.free} />
                    <Mark included />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto h-px w-full max-w-5xl bg-linear-to-r from-transparent via-stone-200 to-transparent dark:via-stone-800" />
    </>
  );
};

Comparison.displayName = "Comparison";

export default Comparison;
