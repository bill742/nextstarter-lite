import Link from "next/link";

import ProCta from "./pro-cta";

/** The three proof points shown under the subhead. */
const proofPoints = [
  "Auth, billing, database, email & a dashboard — pre-built and typed",
  "WCAG 2.1 AA, tested with Axe-core on every CI run",
  "Optional-by-env — builds and runs with zero keys",
];

/**
 * Hero section for the /pro page.
 *
 * Leads with the pricing model rather than the feature count: at $199 one-time
 * NextStarter Pro sits at or below the floor of the paid boilerplate market,
 * which is the first thing a comparison shopper needs to see.
 *
 * @returns The /pro hero section.
 */
const Hero = () => {
  return (
    <>
      <section
        className="mx-auto flex min-h-[60vh] max-w-4xl scroll-mt-20 flex-col items-center justify-center px-6 py-24 text-center md:py-32"
        id="overview"
      >
        <div className="space-y-6">
          <p className="text-sm font-semibold tracking-widest text-orange-700 uppercase dark:text-orange-400">
            Next.js 16 · SaaS Boilerplate
          </p>

          <h1 className="font-serif text-2xl font-bold text-stone-900 md:text-4xl dark:text-stone-50">
            NextStarter Pro - The full SaaS stack, one-time $199
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600 md:text-xl dark:text-stone-300">
            NextStarter Pro is a production-ready Next.js 16 starter with
            authentication, Stripe payments, a database, email, and a dashboard
            already wired up plus accessibility verified with automated tests.
            Go from clone to launch in days, not weeks.
          </p>

          <ul className="mx-auto max-w-2xl space-y-3 text-left text-stone-600 dark:text-stone-300">
            {proofPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span
                  className="mt-0.5 text-orange-600 dark:text-orange-400"
                  aria-hidden="true"
                >
                  ✓
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center gap-4 pt-2">
            <ProCta className="w-full sm:w-auto">
              Get NextStarter Pro — $199
            </ProCta>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              One-time payment · lifetime updates · unlimited projects
            </p>
            <Link
              href="/"
              className="text-sm text-stone-600 underline transition-colors hover:text-orange-700 dark:text-stone-400 dark:hover:text-orange-400"
            >
              Or start with the free version
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto h-px w-full max-w-5xl bg-linear-to-r from-transparent via-stone-200 to-transparent dark:via-stone-800" />
    </>
  );
};

Hero.displayName = "Hero";

export default Hero;
