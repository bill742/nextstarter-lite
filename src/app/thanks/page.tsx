import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { isUpsellEnabled, portalUrl, supportEmail } from "@/lib/upsell";

/** The post-purchase steps, rendered as a numbered checklist. */
const steps = [
  {
    body: "Polar emails your receipt and order confirmation right away. If it isn't there within a few minutes, check your spam folder — it comes from Polar, not from NextStarter.",
    id: 1,
    title: "Check your inbox",
  },
  {
    body: "Open your customer portal and sign in with the email address you used at checkout. Connect your GitHub account there to claim access to the private NextStarter Pro repository.",
    id: 2,
    title: "Claim your repository access",
  },
  {
    body: "GitHub emails you a collaborator invitation for the private repo. Accept it and the repository shows up in your GitHub account — that invite expires, so accept it sooner rather than later.",
    id: 3,
    title: "Accept the GitHub invitation",
  },
  {
    body: "Clone the repo, install dependencies, and start the dev server. The README and the docs/ directory cover setup and each optional integration.",
    id: 4,
    title: "Clone and start building",
  },
];

export const metadata: Metadata = {
  // Relative — Next resolves it against the metadataBase set in the root layout,
  // so it stays correct whether or not NEXT_PUBLIC_SITE_URL has a trailing slash.
  alternates: {
    canonical: "/thanks",
  },
  description:
    "Your NextStarter Pro purchase is confirmed. Here's how to claim your access to the private repository.",
  // A post-purchase page has no business in search results, and buyers reach it
  // only by redirect from Polar checkout.
  robots: {
    follow: false,
    index: false,
  },
  title: "Thank you for your purchase",
};

/**
 * Post-purchase confirmation page.
 *
 * Polar redirects buyers here after a successful checkout (configured as the
 * Success URL on the checkout link). This page is informational only — access
 * is granted by Polar's GitHub Repository benefit, never by this page — so it
 * stays fully static and reads no query parameters.
 *
 * @returns The order confirmation page with next steps.
 */
const Thanks = () => {
  // A post-purchase page only makes sense where a purchase is possible.
  if (!isUpsellEnabled) notFound();

  return (
    <div className="min-h-screen pt-16">
      <main className="mx-auto max-w-5xl px-6 py-24 md:py-32" id="main">
        <div className="space-y-4 text-center">
          <span
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-orange-700 to-orange-600 text-2xl text-white shadow-lg dark:from-orange-600"
            aria-hidden="true"
          >
            ✓
          </span>
          <h1 className="font-serif text-3xl font-bold text-stone-900 md:text-4xl dark:text-stone-50">
            Thank you for your purchase
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-300">
            Your order for <strong>NextStarter Pro</strong> is confirmed. Here
            is how to get into the private repository and start building.
          </p>
        </div>

        <ol className="mx-auto mt-12 max-w-3xl space-y-4">
          {steps.map((step) => (
            <li
              key={step.id}
              className="flex gap-4 rounded-lg border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900/50"
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-600 font-semibold text-white dark:bg-orange-500"
                aria-hidden="true"
              >
                {step.id}
              </span>
              <div className="space-y-2">
                <h2 className="font-medium text-stone-900 dark:text-stone-50">
                  {step.title}
                </h2>
                <p className="text-stone-600 dark:text-stone-400">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-col items-center gap-4">
          <Button
            asChild
            size="lg"
            className="dark:to-coral-600 bg-linear-to-r from-orange-700 to-orange-600 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] dark:from-orange-600"
          >
            <Link href={portalUrl} target="_blank" rel="noopener noreferrer">
              Open your customer portal
            </Link>
          </Button>
          {supportEmail ? (
            <p className="text-center text-sm text-stone-600 dark:text-stone-400">
              Something not right with your order?{" "}
              <a
                href={`mailto:${supportEmail}`}
                className="underline transition-colors hover:text-orange-700 dark:hover:text-orange-400"
              >
                Email {supportEmail}
              </a>{" "}
              and include the email address you used at checkout.
            </p>
          ) : null}
          <Link
            href="/"
            className="text-sm text-stone-600 underline transition-colors hover:text-orange-700 dark:text-stone-400 dark:hover:text-orange-400"
          >
            Back to the home page
          </Link>
        </div>
      </main>
    </div>
  );
};

Thanks.displayName = "Thanks";

export default Thanks;
