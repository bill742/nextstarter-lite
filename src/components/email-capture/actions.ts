"use server";

import {
  isEmailCaptureEnabled,
  resendApiKey,
  resendSegmentId,
} from "@/lib/email-capture";

/** What the form shows after a submission. */
export interface EmailCaptureState {
  status: "idle" | "success" | "already" | "error";
  message?: string;
  /** What was submitted, echoed back on error so the field is not cleared. */
  email?: string;
}

const RESEND_API = "https://api.resend.com";

/**
 * A deliberately loose check: one `@`, something either side, a dot in the
 * domain, no spaces. Resend does the strict validation; this only stops
 * obvious typos before a network round trip. Matches the browser's own
 * `type="email"` check closely enough that the two rarely disagree.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Calls the Resend REST API. Plain `fetch` rather than the `resend` SDK keeps
 * this free starter's dependency list unchanged for a marketing-only feature.
 *
 * @param path - API path, starting with `/`.
 * @param body - Optional JSON body.
 * @returns The raw response.
 */
const resend = (path: string, body?: unknown) =>
  fetch(`${RESEND_API}${path}`, {
    body: body === undefined ? undefined : JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

/**
 * Adds a visitor to the updates list. Adapted from NextStarter Pro's
 * `joinWaitlist`: re-validates on the server, normalises the address, and
 * treats a repeat signup as a friendly "already on the list" rather than an
 * error.
 *
 * Refuses outright when the capture is switched off (see
 * `lib/email-capture.ts`), so posting to this action directly on a deployment
 * without the upsell flag does nothing.
 *
 * @param _previous - The previous form state (unused; required by `useActionState`).
 * @param formData - The submitted form, carrying `email`.
 * @returns The state for the form to render.
 */
export const joinUpdates = async (
  _previous: EmailCaptureState,
  formData: FormData
): Promise<EmailCaptureState> => {
  if (!isEmailCaptureEnabled) {
    return { message: "Sign-ups are closed on this site.", status: "error" };
  }

  const raw = formData.get("email");
  const email = typeof raw === "string" ? raw.trim().toLowerCase() : "";

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return {
      email: email.slice(0, 254),
      message: "Enter a valid email address.",
      status: "error",
    };
  }

  try {
    const created = await resend("/contacts", {
      email,
      segments: [{ id: resendSegmentId }],
      unsubscribed: false,
    });

    if (created.ok) return { status: "success" };

    // The contact already exists (signed up before, or added another way).
    // Make sure they are in this Segment, and tell them they are on the list.
    // Contacts are global in Resend now, so this never creates a duplicate.
    if (created.status === 409 || created.status === 422) {
      const added = await resend(
        `/contacts/${encodeURIComponent(email)}/segments/${resendSegmentId}`
      );
      if (added.ok) return { status: "already" };
    }

    // Server-side only: lands in the host's function logs, never the browser.
    // eslint-disable-next-line no-console
    console.error("Resend rejected an email signup", created.status);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Email signup failed", error);
  }

  return {
    email,
    message: "Something went wrong. Please try again.",
    status: "error",
  };
};
