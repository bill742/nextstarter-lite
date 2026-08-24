/**
 * Configuration for the optional upsell surface: the landing page's `#pro`
 * teaser, the `/pro` page, and the post-purchase `/thanks` page.
 *
 * This starter doubles as a live marketing site and as the template people
 * scaffold from. Everything in here is therefore opt-in: with no
 * `NEXT_PUBLIC_PRO_URL` set, the whole upsell surface switches off — the teaser
 * and its navigation entries stop rendering and the two routes 404 — so a new
 * project never ships someone else's sales pitch, dangling links, or support
 * address. Set the variable and the full marketing site comes back.
 */

/** Checkout destination for the upsell CTA. Empty when nothing is for sale. */
export const proUrl = process.env.NEXT_PUBLIC_PRO_URL || "";

/**
 * Whether this deployment is selling something.
 *
 * Gating the routes and the links on one flag is deliberate: it is impossible
 * for the nav to link to a page that 404s, because both read this value.
 */
export const isUpsellEnabled = proUrl.length > 0;

/** Customer portal where buyers claim their purchase. May be empty. */
export const portalUrl = process.env.NEXT_PUBLIC_POLAR_PORTAL_URL || "";

/** Support address for order problems and pre-purchase questions. May be empty. */
export const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "";
