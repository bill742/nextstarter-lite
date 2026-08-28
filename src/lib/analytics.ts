/**
 * Analytics configuration, shared by the client bootstrap, the Next config's
 * reverse proxy, and the privacy notice.
 *
 * All three read from here on purpose. `/privacy` describes what this site
 * does with visitor data, and the only way that description stays true is if
 * it is derived from the same values that configure the SDK rather than
 * written out by hand and left to drift.
 */

/** PostHog project token. Empty when analytics is switched off. */
export const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN || "";

/**
 * Whether this deployment sends anything to PostHog.
 *
 * Like `isUpsellEnabled`, this is opt-in: with no key, PostHog never
 * initializes, the site makes no third-party requests, and `/privacy` says so
 * instead of describing collection that is not happening.
 */
export const isAnalyticsEnabled = posthogKey.length > 0;

/** EU Cloud — see `posthogRegion` for why this is the default. */
const DEFAULT_POSTHOG_HOST = "https://eu.i.posthog.com";

/**
 * Where PostHog actually lives.
 *
 * This is the upstream the proxy forwards to, not the address the browser
 * talks to — see `posthogApiHost`. It is also what the privacy notice reads
 * to describe the transfer position.
 */
export const posthogUpstreamHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || DEFAULT_POSTHOG_HOST;

/**
 * Which PostHog Cloud region the upstream points at.
 *
 * This drives a real sentence in the privacy notice, because the answer
 * changes the transfer position: UK adequacy regulations cover UK→EEA, so the
 * EU region needs no transfer mechanism, while the US region requires the UK
 * IDTA or the UK Addendum to the SCCs. Anything else is a self-hosted instance
 * where only the operator knows where the data lands.
 */
export const posthogRegion: "EU" | "US" | "other" =
  posthogUpstreamHost.includes("us.i.posthog.com")
    ? "US"
    : posthogUpstreamHost.includes("eu.i.posthog.com")
      ? "EU"
      : "other";

/**
 * Static assets (the SDK bundle, remote config, lazy-loaded extras) come from
 * a different host than event ingestion, so the proxy needs both.
 */
export const posthogAssetsHost =
  posthogRegion === "EU"
    ? "https://eu-assets.i.posthog.com"
    : posthogRegion === "US"
      ? "https://us-assets.i.posthog.com"
      : posthogUpstreamHost;

/**
 * The PostHog dashboard, passed to the SDK as `ui_host`.
 *
 * Without it the toolbar tries to reach the dashboard through the proxy path
 * and cannot find it, because the proxy only fronts ingestion and assets.
 */
export const posthogUiHost =
  posthogRegion === "EU"
    ? "https://eu.posthog.com"
    : posthogRegion === "US"
      ? "https://us.posthog.com"
      : posthogUpstreamHost;

/**
 * The address the browser sends analytics to: a same-origin path, rewritten to
 * PostHog by the proxy in next.config.ts.
 *
 * Blocklists match on PostHog's domains, so a direct connection is dropped by
 * uBlock, Brave's default shields, Firefox strict mode, and blocking DNS
 * resolvers — verified against this site, where Brave recorded nothing until
 * shields were turned off for the domain. A developer-tools audience runs
 * those in numbers, so the undercount is not a rounding error.
 *
 * The trade-off is that analytics traffic now flows through this site's own
 * hosting rather than straight to PostHog, and is billed accordingly.
 */
export const posthogApiHost = "/ingest";
