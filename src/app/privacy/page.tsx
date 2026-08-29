import type { Metadata } from "next";
import Link from "next/link";

import {
  isAnalyticsEnabled,
  posthogHost,
  posthogRegion,
} from "@/lib/analytics";
import { privacyContactEmail } from "@/lib/privacy";
import { isUpsellEnabled } from "@/lib/upsell";

/**
 * Bump this whenever the substance of the notice changes — a new processor, a
 * new category of data, a changed lawful basis. It is deliberately a constant
 * rather than `new Date()`, which would claim the notice was revised today on
 * every single build.
 */
const LAST_UPDATED = "27 August 2026";

export const metadata: Metadata = {
  alternates: {
    canonical: "/privacy",
  },
  description:
    "What this site collects, why, who processes it, and how to exercise your rights under the UK GDPR.",
  title: "Privacy",
};

/**
 * A section of the notice.
 *
 * @param children - The section body.
 * @param id - Anchor id, so individual sections can be linked to directly.
 * @param title - The section heading.
 * @returns A titled section with consistent spacing.
 */
const Section = ({
  children,
  id,
  title,
}: {
  children: React.ReactNode;
  id: string;
  title: string;
}) => (
  <section className="space-y-4" id={id}>
    <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">
      {title}
    </h2>
    {children}
  </section>
);

Section.displayName = "Section";

/**
 * Privacy notice.
 *
 * Everything here is derived from configuration rather than asserted: the
 * analytics section reads `lib/analytics.ts`, the purchase section reads
 * `lib/upsell.ts`. A deployment with analytics switched off genuinely collects
 * nothing, and this page says so instead of describing collection that is not
 * happening.
 *
 * Article 13 of the UK GDPR requires this information to be available at the
 * point data is collected, which is why the footer links it from every page.
 *
 * @returns The privacy notice page.
 */
const Privacy = () => {
  return (
    <div className="min-h-screen pt-16">
      <main className="mx-auto max-w-3xl px-6 py-24 md:py-32" id="main">
        <div className="space-y-4">
          <h1 className="font-serif text-3xl font-bold text-stone-900 md:text-4xl dark:text-stone-50">
            Privacy
          </h1>
          <p className="text-lg leading-relaxed text-stone-600 dark:text-stone-300">
            This notice explains what {process.env.NEXT_PUBLIC_SITE_NAME}{" "}
            collects when you visit this site, why, and what you can do about
            it. It is written to the UK GDPR and the Privacy and Electronic
            Communications Regulations (PECR).
          </p>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Last updated {LAST_UPDATED}
          </p>
        </div>

        <div className="mt-12 space-y-12 leading-relaxed text-stone-600 dark:text-stone-400">
          <Section id="summary" title="The short version">
            <ul className="list-disc space-y-2 pl-6">
              <li>
                There are no advertising or tracking cookies on this site.
              </li>
              <li>
                {isAnalyticsEnabled
                  ? "Analytics runs without cookies and without storing anything on your device, which is why you are not being asked to accept anything."
                  : "Analytics is switched off entirely on this deployment."}
              </li>
              <li>
                There are no forms, accounts, or newsletter sign-ups here.
              </li>
              <li>
                Nothing you do on this site is sold, shared with advertisers, or
                used to build a profile of you.
              </li>
            </ul>
          </Section>

          <Section id="analytics" title="Analytics">
            {isAnalyticsEnabled ? (
              <>
                <p>
                  This site uses PostHog to count page views and measure loading
                  performance. It is configured in cookieless mode, which means
                  PostHog stores nothing at all on your device — no cookies, no
                  local storage, no session storage. Visitors are counted using
                  a privacy-preserving hash calculated on PostHog&rsquo;s
                  servers, and there is no identifier that follows you between
                  visits.
                </p>
                <p>
                  Because nothing is stored on or read from your device, the
                  consent rules in PECR regulation 6 — the reason most sites
                  show you a cookie banner — are not engaged. That is why there
                  is no banner here.
                </p>
                <p>
                  The UK GDPR still applies, because your IP address is
                  processed to produce that hash. It is discarded immediately
                  afterwards, never stored, and no location is derived from it
                  &mdash; this site keeps no record of which country you read it
                  from. The lawful basis is legitimate interests: understanding
                  which pages people actually read, using the least identifying
                  method available. Click tracking and session recording are
                  both switched off.
                </p>
                <p>
                  PostHog acts as our processor under Article 28.{" "}
                  {posthogRegion === "EU" ? (
                    <>
                      Data is processed on PostHog&rsquo;s EU Cloud. Transfers
                      from the UK to the EEA are covered by the UK&rsquo;s
                      adequacy regulations, so no additional transfer mechanism
                      is required.
                    </>
                  ) : posthogRegion === "US" ? (
                    <>
                      Data is processed on PostHog&rsquo;s US Cloud, so the
                      transfer out of the UK relies on the International Data
                      Transfer Agreement or the UK Addendum to the Standard
                      Contractual Clauses.
                    </>
                  ) : (
                    <>
                      Data is sent to{" "}
                      <span className="font-mono text-sm">{posthogHost}</span>.
                    </>
                  )}
                </p>
              </>
            ) : (
              <p>
                Analytics is switched off on this deployment. No analytics
                provider is loaded, and this site makes no third-party requests
                while you read it.
              </p>
            )}
          </Section>

          <Section id="device" title="What this site stores on your device">
            <p>
              Two things, both of which exist only to make the site work the way
              you asked it to. Neither is used to track you, and neither
              requires consent under PECR, which exempts storage that is
              strictly necessary for a service you have requested.
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-stone-900 dark:text-stone-200">
                  Your light or dark theme choice
                </strong>{" "}
                — kept in local storage so the site does not flash back to the
                wrong theme on your next visit. Set only if you use the theme
                toggle.
              </li>
              <li>
                <strong className="text-stone-900 dark:text-stone-200">
                  A scroll position
                </strong>{" "}
                — kept in session storage when you click a navigation link that
                points at a section of the home page, so the page can scroll to
                it after loading. Your browser discards it when you close the
                tab.
              </li>
            </ul>
            <p>
              Both are readable and clearable from your browser&rsquo;s own
              settings, and neither leaves your device.
            </p>
          </Section>

          <Section id="hosting" title="Hosting">
            <p>
              This site is served as static pages. Like any web host, the server
              handling your request necessarily sees your IP address in order to
              send the page back to you.
            </p>
          </Section>

          {isUpsellEnabled ? (
            <Section id="purchases" title="If you buy NextStarter Pro">
              <p>
                Checkout is handled entirely by Polar, which acts as the
                merchant of record for the sale. You leave this site to pay, and
                the details you enter — your name, email address, billing
                country and payment details — go to Polar, not to us. Payment
                card details never reach this site.
              </p>
              <p>
                Polar processes that information as a controller in its own
                right for the purposes of taking payment, issuing invoices and
                meeting its tax obligations, and its own privacy notice governs
                it. We receive the order and the email address associated with
                it so we can grant repository access and provide support.
              </p>
              <p>
                The confirmation page you land on after paying is a static page.
                It reads nothing from the address bar, so no order identifier is
                ever passed on to analytics.
              </p>
            </Section>
          ) : null}

          {privacyContactEmail ? (
            <Section id="email" title="If you email us">
              <p>
                We keep the correspondence so we can answer you and refer back
                to it if you get in touch again. The lawful basis is legitimate
                interests — replying to someone who has contacted us — or
                performance of a contract where the email concerns an order.
              </p>
            </Section>
          ) : null}

          <Section id="rights" title="Your rights">
            <p>
              Under the UK GDPR you have the right to ask what personal data we
              hold about you, to have it corrected or deleted, to restrict or
              object to how we use it, and to receive it in a portable form.
              Where we rely on legitimate interests, you can object at any time.
            </p>
            <p>
              In practice there is usually very little to give you. The
              analytics described above is deliberately built so that no data
              can be traced back to an individual visitor — which means that if
              you ask for a copy of it, we have no way to find
              &ldquo;your&rdquo; records among it. That is a consequence of the
              design, not an evasion.
            </p>
          </Section>

          <Section id="contact" title="Contact and complaints">
            {privacyContactEmail ? (
              <p>
                For anything in this notice, or to exercise any of the rights
                above, email{" "}
                <a
                  href={`mailto:${privacyContactEmail}`}
                  className="underline transition-colors hover:text-orange-700 dark:hover:text-orange-400"
                >
                  {privacyContactEmail}
                </a>
                .
              </p>
            ) : null}
            <p>
              If you are unhappy with how we have handled your personal data you
              can complain to the Information Commissioner&rsquo;s Office, the
              UK&rsquo;s data protection regulator, at{" "}
              <a
                href="https://ico.org.uk/make-a-complaint/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-colors hover:text-orange-700 dark:hover:text-orange-400"
              >
                ico.org.uk
              </a>
              . We would rather you came to us first so we can put it right.
            </p>
          </Section>
        </div>

        <div className="mt-16">
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

Privacy.displayName = "Privacy";

export default Privacy;
