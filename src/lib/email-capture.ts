import { isUpsellEnabled } from "@/lib/upsell";

/**
 * Configuration for the "updates and founding offer" email capture shown on
 * the home page, `/pro`, and `/whats-new`.
 *
 * Email capture is a NextStarter Pro feature (Pro's waitlist / launch mode),
 * so in this free starter it exists only for the live marketing site. Two
 * things keep it out of anyone else's project:
 *
 * - It rides on the upsell flag. With no `NEXT_PUBLIC_PRO_URL` the form never
 *   renders and both server actions refuse every submission, even if the
 *   Resend settings are present.
 * - `.nextstarter/manifest.json` deletes the form, its server actions, and the
 *   `/updates/confirm` route when a project is scaffolded, so none of it ships
 *   in the template.
 *
 * This file stays behind in scaffolded projects only because `/privacy` reads
 * it to decide whether to describe sign-ups. There, it always evaluates false.
 *
 * Sign-up is double opt-in. Submitting the form only sends a confirmation
 * email; the address becomes a Resend Contact in one Segment (what Resend
 * called an Audience before November 2025) when its owner clicks through.
 * Nothing is stored before then, so there is no database to run.
 *
 * Every value here is server-only on purpose: nothing may reach the client
 * bundle. Read them from server components and server actions only.
 */

/** Resend API key with access to Contacts and Emails. */
export const resendApiKey = process.env.RESEND_API_KEY || "";

/** The Resend Segment that confirmed contacts are added to. */
export const resendSegmentId = process.env.RESEND_SEGMENT_ID || "";

/**
 * Sender for the confirmation email, on a domain verified in Resend, e.g.
 * `NextStarter <updates@nextstarter.app>`.
 */
export const resendFrom = process.env.RESEND_FROM || "";

/**
 * Secret that encrypts the confirmation link's token. Anyone holding it could
 * mint links that add arbitrary addresses, so it gets a minimum length.
 */
export const emailConfirmSecret = process.env.EMAIL_CONFIRM_SECRET || "";

/**
 * Whether the email capture is live on this deployment.
 *
 * Fails closed: missing any value switches the whole surface off rather than
 * showing a form that cannot send its confirmation email.
 */
export const isEmailCaptureEnabled =
  isUpsellEnabled &&
  resendApiKey.length > 0 &&
  resendSegmentId.length > 0 &&
  resendFrom.length > 0 &&
  emailConfirmSecret.length >= 32;
