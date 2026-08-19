import Link from "next/link";

import { Button } from "@/components/ui/button";

/** What the free (lite) starter includes. */
const freeFeatures = [
  "Marketing landing page (Next.js 16, TypeScript, Tailwind v4)",
  "Light & dark theming with ShadCN/UI",
  "WCAG 2.1 AA accessibility, verified with Axe-core",
  "Playwright end-to-end tests + GitHub Actions CI",
  "SEO essentials: robots.txt, sitemap.xml, custom 404",
];

/** What Pro adds on top of the free starter. */
const proFeatures = [
  "Authentication with Clerk (sign-in, protected routes, profile)",
  "Database with Prisma + PostgreSQL (user-owned CRUD example)",
  "Transactional email (Resend) & Stripe subscriptions",
  "Dashboard app shell + protected admin panel",
  "MDX blog + validated contact form",
  "Internationalization — English, Spanish, Arabic (RTL)",
  "Security headers, CSP & API rate limiting",
  "Waitlist mode, PostHog analytics & Sentry error tracking",
  "Comprehensive documentation",
];

/** The destination for the upgrade CTA (marketing / purchase page). */
const proUrl = process.env.NEXT_PUBLIC_PRO_URL || "https://www.nextstarter.app/";

/** A single checklist row shared by both plan cards. */
const PlanItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3">
    <span
      className="mt-0.5 text-orange-600 dark:text-orange-400"
      aria-hidden="true"
    >
      ✓
    </span>
    <span>{children}</span>
  </li>
);

/**
 * Upgrade section comparing the free (lite) starter with NextStarter Pro.
 *
 * Presents a two-column Free vs. Pro comparison and a call to action to purchase
 * the full version. The CTA target is env-driven ({@link proUrl}) so it can point
 * at the marketing site or a checkout page without a code change.
 *
 * @returns The Free vs. Pro comparison section.
 */
const Upgrade = () => {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 py-24 md:py-32" id="pro">
        <div className="space-y-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-stone-900 md:text-4xl dark:text-stone-50">
            Upgrade to NextStarter Pro
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-300">
            You&apos;re looking at the free version. Pro turns this starter into a
            complete SaaS foundation — authentication, database, payments, email,
            a dashboard, and more — so you can go from clone to launch in days,
            not weeks.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {/* Free plan */}
          <div className="flex flex-col rounded-2xl border border-stone-200 bg-white p-8 dark:border-stone-800 dark:bg-stone-900/50">
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-50">
                Free
              </h3>
              <p className="text-3xl font-bold text-stone-900 dark:text-stone-50">
                $0
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                This starter — yours to build on.
              </p>
            </div>
            <ul className="mt-6 flex-1 space-y-3 text-stone-600 dark:text-stone-300">
              {freeFeatures.map((feature) => (
                <PlanItem key={feature}>{feature}</PlanItem>
              ))}
            </ul>
            <p className="mt-8 text-center text-sm font-medium text-stone-500 dark:text-stone-400">
              You&apos;re already here 🎉
            </p>
          </div>

          {/* Pro plan */}
          <div className="relative flex flex-col rounded-2xl border-2 border-orange-300 bg-white p-8 shadow-lg dark:border-orange-800/70 dark:bg-stone-900/50">
            <span className="absolute -top-3 left-8 rounded-full bg-linear-to-r from-orange-700 to-orange-600 px-3 py-1 text-xs font-semibold text-white dark:from-orange-600">
              Most complete
            </span>
            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-50">
                Pro
              </h3>
              <p className="text-3xl font-bold text-stone-900 dark:text-stone-50">
                $199{" "}
                <span className="text-base font-normal text-stone-500 dark:text-stone-400">
                  one-time
                </span>
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Lifetime access &amp; updates via a private GitHub repo.
              </p>
            </div>
            <ul className="mt-6 flex-1 space-y-3 text-stone-700 dark:text-stone-200">
              <PlanItem>
                <span className="font-medium">Everything in Free, plus:</span>
              </PlanItem>
              {proFeatures.map((feature) => (
                <PlanItem key={feature}>{feature}</PlanItem>
              ))}
            </ul>
            <div className="mt-8 flex justify-center">
              <Button
                asChild
                size="lg"
                className="dark:to-coral-600 w-full bg-linear-to-r from-orange-700 to-orange-600 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] dark:from-orange-600"
              >
                <Link href={proUrl} target="_blank" rel="noopener noreferrer">
                  Get NextStarter Pro
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Divider */}
      <div className="mx-auto h-px w-full max-w-5xl bg-linear-to-r from-transparent via-stone-200 to-transparent dark:via-stone-800" />
    </>
  );
};

Upgrade.displayName = "Upgrade";

export default Upgrade;
