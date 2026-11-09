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
 *   renders and the server action refuses every submission, even if the
 *   Resend keys are present.
 * - `.nextstarter/manifest.json` deletes the form and its server action when a
 *   project is scaffolded, so the component never ships in the template.
 *
 * This file stays behind in scaffolded projects only because `/privacy` reads
 * it to decide whether to describe sign-ups. There, it always evaluates false.
 *
 * Signups are stored as Resend Contacts in one Segment (what Resend called an
 * Audience before November 2025), so the list can be emailed from Resend's
 * Broadcasts at launch without running a database.
 *
 * The keys are server-only on purpose: nothing here may reach the client
 * bundle. Read these values from server components and server actions only.
 */

/** Resend API key with access to Contacts. Server-only. */
export const resendApiKey = process.env.RESEND_API_KEY || "";

/** The Resend Segment that new contacts are added to. Server-only. */
export const resendSegmentId = process.env.RESEND_SEGMENT_ID || "";

/**
 * Whether the email capture is live on this deployment.
 *
 * Fails closed: missing any of the three values switches the whole surface
 * off rather than showing a form that silently drops emails.
 */
export const isEmailCaptureEnabled =
  isUpsellEnabled && resendApiKey.length > 0 && resendSegmentId.length > 0;
