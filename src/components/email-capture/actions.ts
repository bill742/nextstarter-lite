"use server";

import { isEmailCaptureEnabled } from "@/lib/email-capture";

import { botReason } from "./bot-check";
import { addToSegment, sendConfirmation } from "./resend";
import { openEmail } from "./token";

/** What a form shows after a submission. */
export interface EmailCaptureState {
  status: "idle" | "success" | "error";
  message?: string;
  /** What was submitted, echoed back on error so the field is not cleared. */
  email?: string;
}

/**
 * A deliberately loose check: one `@`, something either side, a dot in the
 * domain, no spaces. Resend does the strict validation; this only stops
 * obvious typos before a network round trip. Matches the browser's own
 * `type="email"` check closely enough that the two rarely disagree.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CLOSED: EmailCaptureState = {
  message: "Sign-ups are closed on this site.",
  status: "error",
};

/**
 * Step one of the double opt-in: emails a confirmation link. Adapted from
 * NextStarter Pro's `joinWaitlist`, which re-validates on the server and
 * normalises the address the same way.
 *
 * Nothing is added to the list here. That happens in {@link confirmUpdates},
 * once the owner of the address clicks through — so typing in someone else's
 * address only ever sends them one email they can ignore.
 *
 * New, repeat, and already-subscribed addresses all get the identical reply.
 * A distinct "already on the list" answer would let anyone check whether
 * someone else had subscribed.
 *
 * Submissions that trip a bot check (see `bot-check.ts`) get the normal
 * success reply but send nothing, so a script learns nothing from the
 * response that would help it get past the check.
 *
 * Refuses outright when the capture is switched off (see
 * `lib/email-capture.ts`), so posting to this action directly on a deployment
 * without the upsell flag does nothing.
 *
 * @param _previous - The previous form state (unused; required by `useActionState`).
 * @param formData - The submitted form, carrying `email` and the bot-check fields.
 * @returns The state for the form to render.
 */
export const joinUpdates = async (
  _previous: EmailCaptureState,
  formData: FormData
): Promise<EmailCaptureState> => {
  if (!isEmailCaptureEnabled) return CLOSED;

  const raw = formData.get("email");
  const email = typeof raw === "string" ? raw.trim().toLowerCase() : "";

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return {
      email: email.slice(0, 254),
      message: "Enter a valid email address.",
      status: "error",
    };
  }

  const bot = botReason(formData);
  if (bot) {
    // The reason only, never the address, so the logs show whether the
    // checks are doing anything without keeping what the bot submitted.
    // eslint-disable-next-line no-console
    console.info("Dropped a likely bot signup:", bot);
    return { status: "success" };
  }

  try {
    if (await sendConfirmation(email)) return { status: "success" };
  } catch (error) {
    // Server-side only: lands in the host's function logs, never the browser.
    // eslint-disable-next-line no-console
    console.error("Email signup failed", error);
  }

  return {
    email,
    message: "Something went wrong. Please try again.",
    status: "error",
  };
};

/**
 * Step two of the double opt-in: adds the address in a confirmation link to
 * the updates Segment.
 *
 * Runs from a button on `/updates/confirm`, not on page load. Mail security
 * scanners open links in incoming email to check them; confirming on a plain
 * GET would let a scanner subscribe someone who never clicked.
 *
 * @param _previous - The previous form state (unused; required by `useActionState`).
 * @param formData - The confirm form, carrying the link's `token`.
 * @returns The state for the confirm page to render.
 */
export const confirmUpdates = async (
  _previous: EmailCaptureState,
  formData: FormData
): Promise<EmailCaptureState> => {
  if (!isEmailCaptureEnabled) return CLOSED;

  const token = formData.get("token");
  const email = typeof token === "string" ? openEmail(token) : null;

  if (!email) {
    return {
      message:
        "This confirmation link has expired or is not valid. Sign up again to get a new one.",
      status: "error",
    };
  }

  try {
    if (await addToSegment(email)) return { status: "success" };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Email confirmation failed", error);
  }

  return {
    message: "Something went wrong. Please try again.",
    status: "error",
  };
};
