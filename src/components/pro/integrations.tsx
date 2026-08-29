/**
 * One integration, rendered as its own subsection.
 *
 * `body` is an array of paragraphs rather than one long string so each section
 * can breathe without embedding markup in the data.
 */
type Integration = {
  body: string[];
  id: string;
  title: string;
};

const integrations: Integration[] = [
  {
    body: [
      "Clerk is wired into the App Router, not just installed. Middleware guards the protected route groups, so a signed-out visitor hitting a dashboard URL is redirected rather than served a flash of private UI. Sign-in, sign-up, and the user profile are already built and themed to match the rest of the starter in both light and dark mode.",
      "Because it's env-gated like everything else, the app still builds and runs with no Clerk keys at all — the protected areas simply show a “not configured” notice until you add them.",
    ],
    id: "authentication",
    title: "Authentication with Clerk",
  },
  {
    body: [
      "The database layer is Prisma against PostgreSQL, with a typed schema, migrations, and a generated client ready to go. It ships with a complete user-owned CRUD example — create, read, update, and delete records scoped to the signed-in user — so the ownership checks and the query patterns are demonstrated rather than left as an exercise.",
      "That example is the piece most starters skip. It's the difference between “a database is installed” and “here is how this codebase expects you to read and write data safely.”",
    ],
    id: "database",
    title: "Database with Prisma and PostgreSQL",
  },
  {
    body: [
      "Stripe handles subscriptions end to end: Checkout for the purchase, the billing portal for customers to manage or cancel their own plan, and the webhook route that keeps subscription status in sync with your database instead of trusting the browser redirect.",
      "Subscription state is readable from your server components, so gating a feature behind a paid plan is a check, not a rebuild. Test-mode keys work throughout, and with no keys set the billing surfaces stay dormant rather than erroring.",
    ],
    id: "payments",
    title: "Payments and subscriptions with Stripe",
  },
  {
    body: [
      "Transactional email is Resend with React Email templates, so your emails are components — typed, reviewable in a pull request, and styled with the same tokens as the app rather than maintained as a separate pile of table-based HTML.",
      "The templates cover the messages an app actually has to send, and the sending helper is a single typed function you call from server actions and route handlers.",
    ],
    id: "email",
    title: "Transactional email with Resend",
  },
  {
    body: [
      "A dashboard is where most starters stop at a placeholder. This one ships an app shell — a sidebar that collapses into a responsive drawer, consistent page headers, and protected routing — that you can hang real features on immediately.",
      "On top of that sits an admin panel with metrics and a searchable user table, so you have an operator's view of your own product from day one instead of querying the database by hand when a customer emails you.",
    ],
    id: "dashboard",
    title: "Dashboard app shell and admin panel",
  },
  {
    body: [
      "Content is an MDX blog: posts are files in the repository, version-controlled alongside your code, with the layout, metadata, and routing already handled. No CMS to provision, and no monthly bill for publishing a changelog.",
      "The contact form is validated with React Hook Form and Zod — one schema shared by the client and the server, so the two can't disagree about what a valid submission is, and the error states are accessible rather than colour-only.",
    ],
    id: "content",
    title: "MDX blog and validated contact form",
  },
  {
    body: [
      "Internationalization is next-intl, configured with English, Spanish, and Arabic — and the Arabic locale is the point. Most boilerplates either skip i18n entirely or add a translation library without ever rendering a right-to-left layout, which is where the actual work is: mirrored navigation, logical CSS properties instead of hard-coded left and right, and icons that flip when direction demands it.",
      "Here the RTL layout is built and tested, routing is locale-aware, and hreflang metadata is emitted for every page so search engines understand which language they're looking at. Adding a fourth language is a message file, not a refactor.",
    ],
    id: "internationalization",
    title: "Internationalization with RTL support",
  },
  {
    body: [
      "Security is the work nobody demos and everybody needs. Pro ships a Content Security Policy and a set of hardening headers configured for Next.js — tight enough to be worth having, and documented so you know which directive to loosen when you add a third-party script instead of disabling the whole policy.",
      "API routes have rate limiting so a single client can't hammer an endpoint, and user input is sanitized on the way in. All of it is configuration you'd otherwise research on a deadline, after launch.",
    ],
    id: "security",
    title: "Security headers, CSP, and rate limiting",
  },
  {
    body: [
      "Error tracking is Sentry, wired for both server and client so a production exception arrives with a stack trace instead of a support ticket that says “it broke.” There's also a waitlist mode for the pre-launch period: flip it on and the app collects email addresses behind a landing page, then flip it off on launch day.",
      "Analytics is the same cookieless PostHog setup the free starter already ships — product analytics without a consent banner as the price of entry — carried across unchanged rather than paywalled. Every integration here is env-gated, so a repository with no keys sends nothing anywhere.",
    ],
    id: "analytics",
    title: "Error tracking, waitlist mode, and analytics",
  },
];

/**
 * The nine integration sections that make up the body of the /pro page.
 *
 * Each integration gets a named heading and real prose about what is actually
 * wired up. A pricing table alone will never rank for a query like “next.js
 * starter kit with clerk and stripe” — explanatory copy under a named heading
 * is what makes the page eligible to answer it.
 *
 * @returns The "what Pro adds" section.
 */
const Integrations = () => {
  return (
    <>
      <section
        className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24 md:py-32"
        id="included"
      >
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <h2 className="font-serif text-3xl font-bold text-stone-900 md:text-4xl dark:text-stone-50">
              What Pro adds: auth, payments, database, and i18n
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-300">
              Nine integrations, configured and typed — not a list of packages
              in a manifest. Every one of them is optional and gated by an
              environment variable, so the app builds, runs, and passes its
              tests before you sign up for a single service.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-10">
            {integrations.map((integration) => (
              <section
                key={integration.id}
                // scroll-mt-36 clears both fixed bars: the 72px header and the
                // sticky section nav that ends at 125px. The outer sections get
                // away with scroll-mt-20 because their py-24 pushes the heading
                // clear; these cards are only p-6, so the heading lands right
                // at the section top and needs the real offset.
                className="scroll-mt-36 space-y-3 rounded-lg border border-stone-200 bg-white p-6 md:p-8 dark:border-stone-800 dark:bg-stone-900/50"
                id={integration.id}
                aria-labelledby={`${integration.id}-heading`}
              >
                <h3
                  className="font-serif text-xl font-bold text-stone-900 md:text-2xl dark:text-stone-50"
                  id={`${integration.id}-heading`}
                >
                  {integration.title}
                </h3>
                {integration.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="leading-relaxed text-stone-600 dark:text-stone-300"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto h-px w-full max-w-5xl bg-linear-to-r from-transparent via-stone-200 to-transparent dark:via-stone-800" />
    </>
  );
};

Integrations.displayName = "Integrations";

export default Integrations;
