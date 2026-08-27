import { supportEmail } from "@/lib/upsell";

/**
 * Where privacy and data-protection enquiries go.
 *
 * Falls back to the support address, because on a small site they are usually
 * the same inbox and requiring two variables to say one thing invites one of
 * them being left blank. Set `NEXT_PUBLIC_PRIVACY_EMAIL` to separate them.
 *
 * If neither is configured the notice omits its contact section rather than
 * rendering a dead link — but a deployment that collects anything should set
 * one, since the UK GDPR requires a route for people to exercise their rights.
 */
export const privacyContactEmail =
  process.env.NEXT_PUBLIC_PRIVACY_EMAIL || supportEmail;
