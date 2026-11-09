import Link from "next/link";

import { isEmailCaptureEnabled } from "@/lib/email-capture";

import EmailCaptureForm, { type EmailCaptureLocation } from "./form";

const TITLE = "Get NextStarter updates and the founding offer.";

/**
 * The "privacy notice" pointer under every form.
 *
 * @returns A short line linking to the sign-up section of `/privacy`.
 */
const PrivacyLine = () => (
  <p className="mt-2 text-xs text-stone-600 dark:text-stone-400">
    See the{" "}
    <Link
      className="underline transition-colors hover:text-orange-700 dark:hover:text-orange-400"
      href="/privacy#updates"
    >
      privacy notice
    </Link>{" "}
    for how your email is handled.
  </p>
);

PrivacyLine.displayName = "PrivacyLine";

/**
 * "Get NextStarter updates and the founding offer." — the email capture block
 * shared by the home page, `/pro`, and `/whats-new`.
 *
 * Adapted from NextStarter Pro's waitlist. Renders nothing unless
 * {@link isEmailCaptureEnabled}, and is deleted from scaffolded projects (see
 * `.nextstarter/manifest.json`), so it is marketing-site only.
 *
 * @param compact - A slim version with no card or description, for the home
 *   page hero, where the full card would compete with the primary CTAs. It
 *   carries no `id`, so the full card further down keeps the `#updates` anchor.
 * @param landmark - Render as a top-level `<aside>` landmark. Use it where the
 *   block sits outside `<main>` (the `/whats-new` layout); inside `<main>` it
 *   stays a plain `<section>`, since a nested complementary landmark is an
 *   accessibility error.
 * @param location - Where it is on the site, for analytics. Also keeps heading
 *   ids unique when a page has more than one form.
 * @returns The email capture section, or `null` when switched off.
 */
const EmailCapture = ({
  compact = false,
  landmark = false,
  location,
}: {
  compact?: boolean;
  landmark?: boolean;
  location: EmailCaptureLocation;
}) => {
  if (!isEmailCaptureEnabled) return null;

  const Wrapper = landmark ? "aside" : "section";
  const headingId = `email-capture-${location}-heading`;

  if (compact) {
    return (
      // A plain div, not a labelled <section>: the full card further down the
      // same page is already a region with this exact name, and two regions
      // sharing a name is an accessibility error.
      <div className="mx-auto w-full max-w-md pt-4">
        <h2
          className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50"
          id={headingId}
        >
          {TITLE}
        </h2>
        <div className="mt-3">
          <EmailCaptureForm location={location} />
        </div>
        <PrivacyLine />
      </div>
    );
  }

  return (
    <Wrapper
      aria-labelledby={headingId}
      className="mx-auto max-w-3xl scroll-mt-20 px-6 py-16 md:py-24"
      id="updates"
    >
      <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm md:p-12 dark:border-stone-800 dark:bg-stone-900/50">
        <h2
          className="font-serif text-2xl font-bold text-stone-900 md:text-3xl dark:text-stone-50"
          id={headingId}
        >
          {TITLE}
        </h2>
        <p className="mx-auto mt-4 max-w-xl leading-relaxed text-stone-600 dark:text-stone-300">
          New releases, what&rsquo;s shipping next, and first word on founding
          pricing for NextStarter Pro. Occasional emails, unsubscribe any time.
        </p>
        <div className="mx-auto mt-8 max-w-md">
          <EmailCaptureForm location={location} />
        </div>
        <PrivacyLine />
      </div>
    </Wrapper>
  );
};

EmailCapture.displayName = "EmailCapture";

export default EmailCapture;
