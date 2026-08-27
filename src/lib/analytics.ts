/**
 * Analytics configuration, shared by the client bootstrap and the privacy
 * notice.
 *
 * Both read from here on purpose. `/privacy` describes what this site does
 * with visitor data, and the only way that description stays true is if it is
 * derived from the same values that configure the SDK rather than written out
 * by hand and left to drift.
 */

/** PostHog project token. Empty when analytics is switched off. */
export const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY || "";

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

/** Ingestion host the SDK posts to. */
export const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST || DEFAULT_POSTHOG_HOST;

/**
 * Which PostHog Cloud region the host points at.
 *
 * This drives a real sentence in the privacy notice, because the answer
 * changes the transfer position: UK adequacy regulations cover UK→EEA, so the
 * EU region needs no transfer mechanism, while the US region requires the UK
 * IDTA or the UK Addendum to the SCCs. Anything else is a self-hosted instance
 * or a reverse proxy, where only the operator knows where the data lands.
 */
export const posthogRegion: "EU" | "US" | "other" = posthogHost.includes(
  "us.i.posthog.com"
)
  ? "US"
  : posthogHost.includes("eu.i.posthog.com")
    ? "EU"
    : "other";
