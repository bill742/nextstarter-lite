import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProPage from "@/components/pro";
import { isUpsellEnabled } from "@/lib/upsell";

import { faqSchema, proBreadcrumbSchema } from "./schema";

export const metadata: Metadata = {
  alternates: { canonical: "/pro" },
  description:
    "Clerk auth, Prisma + PostgreSQL, Stripe subscriptions, admin dashboard, MDX blog, and i18n with RTL. One-time $199, lifetime access. No subscription.",
  openGraph: {
    description:
      "Clerk auth, Prisma + PostgreSQL, Stripe subscriptions, admin dashboard, MDX blog, and i18n with RTL support.",
    title: "NextStarter Pro — the full SaaS stack, one-time $199",
    // Relative, like the canonical above: Next resolves it against the
    // metadataBase set in the root layout, so a clone of this starter gets its
    // own domain here instead of nextstarter.app.
    url: "/pro",
  },
  // renders as "NextStarter Pro — Auth, Payments & Database | NextStarter"
  title: "NextStarter Pro — Auth, Payments & Database",
};

/**
 * The /pro route — the destination page for NextStarter Pro.
 *
 * This page owns the full Pro pitch; the home page keeps only a short teaser
 * at #pro that links here. Splitting them that way gives each page a distinct
 * search target instead of two pages competing for the same query.
 *
 * @returns The Pro page with its structured data.
 */
const Pro = () => {
  // Nothing for sale, no sales page. Keeps a scaffolded project from shipping
  // a pitch for a product it does not have.
  if (!isUpsellEnabled) notFound();

  return (
    <div className="min-h-screen pt-16">
      <main className="mx-auto max-w-7xl" id="main">
        <ProPage />
      </main>

      {/* JSON-LD — see lib/schema.ts. The SoftwareApplication entity is global
          (rendered in the root layout) and already carries both offers, so this
          page deliberately adds only a breadcrumb and the FAQ. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(proBreadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </div>
  );
};

Pro.displayName = "Pro";

export default Pro;
