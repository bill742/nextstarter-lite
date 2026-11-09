import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { openEmail } from "@/components/email-capture/token";
import { isEmailCaptureEnabled } from "@/lib/email-capture";

import ConfirmForm from "./confirm-form";

export const metadata: Metadata = {
  description: "Confirm your email to get NextStarter updates.",
  // Reached only from a confirmation email; nothing here belongs in search.
  robots: {
    follow: false,
    index: false,
  },
  title: "Confirm your email",
};

/**
 * Landing page for the double opt-in link in the confirmation email.
 *
 * Checks the token up front so an expired or broken link says so straight
 * away, but does not subscribe anyone on load — see `confirmUpdates` for why
 * that waits for the button.
 *
 * The token stays opaque in the URL (it is encrypted), and the PostHog setup
 * in `instrumentation-client.ts` blanks `token` query parameters before
 * anything is sent, so neither the address nor the link reaches analytics.
 *
 * @param searchParams - The query string, carrying `token`.
 * @returns The confirm page.
 */
const ConfirmUpdates = async ({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) => {
  // Marketing-site only, like the form that sends people here.
  if (!isEmailCaptureEnabled) notFound();

  const { token } = await searchParams;
  const value = typeof token === "string" ? token : "";
  const email = value ? openEmail(value) : null;

  return (
    <div className="min-h-screen pt-16">
      <main className="mx-auto max-w-xl px-6 py-24 md:py-32" id="main">
        <h1 className="font-serif text-3xl font-bold text-stone-900 md:text-4xl dark:text-stone-50">
          {email ? "Confirm your email" : "This link has expired"}
        </h1>

        {email ? (
          <>
            <p className="mt-4 text-lg leading-relaxed text-stone-600 dark:text-stone-300">
              Confirm{" "}
              <strong className="font-medium break-all text-stone-900 dark:text-stone-100">
                {email}
              </strong>{" "}
              to get NextStarter updates and the founding offer.
            </p>
            <div className="mt-8">
              <ConfirmForm token={value} />
            </div>
          </>
        ) : (
          <p className="mt-4 text-lg leading-relaxed text-stone-600 dark:text-stone-300">
            Confirmation links work for 7 days, and this one has expired or is
            incomplete.{" "}
            <Link
              className="underline transition-colors hover:text-orange-700 dark:hover:text-orange-400"
              href="/#updates"
            >
              Sign up again
            </Link>{" "}
            and we&rsquo;ll send a fresh one.
          </p>
        )}
      </main>
    </div>
  );
};

ConfirmUpdates.displayName = "ConfirmUpdates";

export default ConfirmUpdates;
