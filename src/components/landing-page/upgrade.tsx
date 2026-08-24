import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isUpsellEnabled, proUrl } from "@/lib/upsell";

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
  if (!isUpsellEnabled) return null;

  return (
    <>
      <section className="mx-auto max-w-5xl px-6 py-24 md:py-32" id="pro">
        <div className="space-y-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-stone-900 md:text-4xl dark:text-stone-50">
            Need auth, payments, and a database?
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-300">
            NextStarter Pro adds the full production stack — Clerk
            authentication, Stripe subscriptions, Prisma + PostgreSQL, an admin
            dashboard, and internationalization with RTL support.
          </p>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed font-bold text-stone-600 dark:text-stone-300">
            $199 once. Lifetime access. No subscription.
          </p>
          <div className="mt-8 flex flex-row justify-center gap-x-4">
            <Button
              asChild
              size="lg"
              className="dark:to-coral-600 w-full shrink bg-linear-to-r from-orange-700 to-orange-600 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] dark:from-orange-600"
            >
              <Link href="/pro" rel="noopener noreferrer">
                See everything in Pro →
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="dark:to-coral-600 w-full shrink bg-linear-to-r from-orange-700 to-orange-600 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] dark:from-orange-600"
            >
              <Link href={proUrl} rel="noopener noreferrer" target="_blank">
                Buy now
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2"></div>
      </section>
    </>
  );
};

Upgrade.displayName = "Upgrade";

export default Upgrade;
