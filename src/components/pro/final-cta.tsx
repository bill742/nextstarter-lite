import Link from "next/link";

import { supportEmail } from "@/lib/upsell";

import ProCta from "./pro-cta";

/**
 * Closing call to action.
 *
 * Repeats the price and the guarantee at the point where a reader who has
 * gone through the whole page decides. The stated refund window is here on
 * purpose — it measurably lifts conversion on one-time developer-tool
 * purchases, where the buyer's main worry is spending $199 on a repository
 * they haven't seen.
 *
 * @returns The final CTA section.
 */
const FinalCta = () => {
  return (
    <section className="mx-auto max-w-5xl px-6 py-24 md:py-32" id="buy">
      <div className="rounded-2xl border-2 border-orange-300 bg-white p-8 text-center shadow-lg md:p-12 dark:border-orange-800/70 dark:bg-stone-900/50">
        <div className="space-y-4">
          <h2 className="font-serif text-3xl font-bold text-stone-900 md:text-4xl dark:text-stone-50">
            Start building today
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-300">
            Authentication, a database, payments, email, a dashboard, an admin
            panel, i18n with RTL, and security — wired up, typed, and tested for
            accessibility.
          </p>
          <p className="text-3xl font-bold text-stone-900 dark:text-stone-50">
            $199{" "}
            <span className="text-base font-normal text-stone-500 dark:text-stone-400">
              one-time · lifetime access
            </span>
          </p>

          <div className="flex flex-col items-center gap-4 pt-2">
            <ProCta className="w-full sm:w-auto">
              Get NextStarter Pro — $199
            </ProCta>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              14-day money-back guarantee · unlimited projects · no subscription
            </p>
          </div>
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-stone-600 dark:text-stone-400">
        Still deciding?{" "}
        {supportEmail ? (
          <>
            <a
              href={`mailto:${supportEmail}`}
              className="underline transition-colors hover:text-orange-700 dark:hover:text-orange-400"
            >
              Email {supportEmail}
            </a>{" "}
            with any question, or{" "}
          </>
        ) : null}
        <Link
          href="/"
          className="underline transition-colors hover:text-orange-700 dark:hover:text-orange-400"
        >
          start with the free version
        </Link>{" "}
        and upgrade later.
      </p>
    </section>
  );
};

FinalCta.displayName = "FinalCta";

export default FinalCta;
