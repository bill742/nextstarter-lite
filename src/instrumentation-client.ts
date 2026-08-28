import posthog from "posthog-js";

import {
  isAnalyticsEnabled,
  posthogApiHost,
  posthogKey,
  posthogUiHost,
} from "@/lib/analytics";

/**
 * Client-side analytics bootstrap.
 *
 * Next runs this file before any application code on the client. It is the
 * whole analytics surface — there is no `<Analytics />` component to render in
 * the layout.
 *
 * Like the upsell in `lib/upsell.ts`, this is opt-in: with no
 * `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` set, PostHog never initializes and the app
 * makes no
 * third-party requests at all. A project scaffolded from this starter therefore
 * does not quietly ship traffic to someone else's analytics account. The flag
 * and the host live in `lib/analytics.ts` so that `/privacy` describes this
 * exact configuration rather than a hand-written copy of it.
 *
 * The configuration below is deliberately explicit rather than relying on
 * PostHog's `defaults` snapshot, because in this project each option is a
 * privacy decision that should be readable at a glance. See `/privacy`, which
 * describes exactly this behaviour to visitors.
 */
if (isAnalyticsEnabled) {
  posthog.init(posthogKey, {
    // A same-origin path, rewritten to PostHog by next.config.ts, so ad
    // blockers have no PostHog hostname to match. The upstream is still EU
    // Cloud: UK adequacy regulations cover UK→EEA transfers, which keeps this
    // out of the international-transfer paperwork a US host would need.
    api_host: posthogApiHost,
    // Off by default under data minimisation: autocapture records clicks and
    // the text of the elements clicked, which is far more than a marketing
    // site needs to answer "which pages get read". Flip to `true` if you want
    // click data and your privacy notice says so.
    autocapture: false,
    capture_pageleave: "if_capture_pageview",
    // App Router navigations are history changes, not document loads.
    capture_pageview: "history_change",
    // Core Web Vitals — this is what replaced Vercel Speed Insights. Web
    // vitals capture is independent of `autocapture`, so it survives the line
    // above.
    capture_performance: { web_vitals: true },
    /*
     * The reason this site needs no cookie banner.
     *
     * UK cookie consent comes from PECR reg. 6, which is triggered by storing
     * or reading information on the visitor's device — not by UK GDPR. In
     * "always" mode PostHog writes nothing to cookies or local/session storage
     * and counts visitors with a server-side privacy-preserving hash instead,
     * so reg. 6 is never engaged.
     *
     * The trade-off is real and intentional: `identify()` cannot be called in
     * this mode, so there are no cross-session user journeys. This site has no
     * accounts, so there is nothing to identify.
     *
     * UK GDPR still applies to the IP address PostHog processes to derive the
     * hash and coarse geography. That is covered by legitimate interest and
     * disclosed at /privacy — a lawful basis and a notice are required whether
     * or not a banner is.
     */
    cookieless_mode: "always",
    // Session replay records what visitors do on the page. It is a much larger
    // privacy commitment than page counts and is not something a starter
    // should switch on for you.
    disable_session_recording: true,
    // The proxy fronts ingestion and assets only, so the dashboard address
    // has to be given explicitly or the toolbar cannot find it.
    ui_host: posthogUiHost,
  });
}
