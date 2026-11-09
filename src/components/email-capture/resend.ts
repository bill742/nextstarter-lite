import { createHash } from "node:crypto";

import { resendApiKey, resendFrom, resendSegmentId } from "@/lib/email-capture";
import { siteUrl } from "@/lib/utils";

import { sealEmail } from "./token";

const RESEND_API = "https://api.resend.com";

/**
 * Calls the Resend REST API. Plain `fetch` rather than the `resend` SDK keeps
 * this free starter's dependency list unchanged for a marketing-only feature.
 *
 * @param path - API path, starting with `/`.
 * @param body - Optional JSON body.
 * @param headers - Extra request headers.
 * @returns The raw response.
 */
const resend = (
  path: string,
  body?: unknown,
  headers: Record<string, string> = {}
) =>
  fetch(`${RESEND_API}${path}`, {
    body: body === undefined ? undefined : JSON.stringify(body),
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
      ...headers,
    },
    method: "POST",
  });

/**
 * Adds a confirmed address to the updates Segment.
 *
 * Creates the Contact, or — when it already exists (signed up before, or
 * added another way) — adds the existing Contact to the Segment. Contacts are
 * global in Resend, so neither path creates a duplicate.
 *
 * @param email - The confirmed, normalised address.
 * @returns `"created"` for a brand-new Contact, `"existing"` when a Contact
 *   for the address was already there, or `null` when Resend refused.
 */
export const addToSegment = async (
  email: string
): Promise<"created" | "existing" | null> => {
  const created = await resend("/contacts", {
    email,
    segments: [{ id: resendSegmentId }],
    unsubscribed: false,
  });
  if (created.ok) return "created";

  if (created.status === 409 || created.status === 422) {
    const added = await resend(
      `/contacts/${encodeURIComponent(email)}/segments/${resendSegmentId}`
    );
    if (added.ok) return "existing";
    // eslint-disable-next-line no-console
    console.error(
      "Resend refused to add a contact to the segment",
      added.status
    );
    return null;
  }

  // eslint-disable-next-line no-console
  console.error("Resend refused to create a contact", created.status);
  return null;
};

/**
 * The event Resend Automations listen for to send the welcome email. Set the
 * automation's trigger to exactly this name.
 */
export const CONFIRMED_EVENT = "updates.confirmed";

/**
 * Tells Resend that an address has just confirmed, so a Resend Automation
 * can send the welcome email (and anything after it).
 *
 * The welcome email itself is a published Template in Resend, not code in
 * this repo: the copy, and any founder code in it, change in Resend's editor
 * without a deploy, and the code stays out of this public repository.
 *
 * Best effort: a failure is logged and swallowed, because the visitor is
 * already on the list and a missed welcome email should not tell them
 * otherwise.
 *
 * @param email - The confirmed, normalised address.
 */
export const sendConfirmedEvent = async (email: string) => {
  try {
    const response = await resend("/events/send", {
      email,
      event: CONFIRMED_EVENT,
    });
    if (!response.ok) {
      // eslint-disable-next-line no-console
      console.error("Resend refused the confirmed event", response.status);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Sending the confirmed event failed", error);
  }
};

/**
 * Sends the double opt-in email with the confirmation link.
 *
 * At most one email per address per hour: the request carries an
 * idempotency key built from a hash of the address and the current hour.
 * Resend answers a repeat within that hour with a 409 (the body differs,
 * because every token is unique) and sends nothing, which caps how often the
 * form can be used to email someone who never asked. A repeat is reported as
 * sent, so the visitor sees the same reply either way.
 *
 * @param email - The normalised address.
 * @returns Whether the email was sent (or already sent this hour).
 */
export const sendConfirmation = async (email: string) => {
  const link = `${siteUrl}/updates/confirm?token=${sealEmail(email)}`;
  const hour = Math.floor(Date.now() / 3_600_000);
  const addressHash = createHash("sha256").update(email).digest("hex");

  const response = await resend(
    "/emails",
    {
      from: resendFrom,
      html: `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:24px;background:#fafaf9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#1c1917;">
    <div style="max-width:480px;margin:0 auto;background:#ffffff;border:1px solid #e7e5e4;border-radius:12px;padding:32px;">
      <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;">Confirm your NextStarter updates</h1>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#44403c;">
        Someone — hopefully you — asked to get NextStarter updates and the founding offer at this address. Confirm to join the list.
      </p>
      <p style="margin:0 0 24px;">
        <a href="${link}" style="display:inline-block;background:#c2410c;color:#ffffff;text-decoration:none;font-weight:600;padding:12px 20px;border-radius:8px;">Confirm my email</a>
      </p>
      <p style="margin:0;font-size:14px;line-height:1.6;color:#57534e;">
        The link works for 7 days. If you didn't sign up, ignore this email — you won't be added or hear from us again.
      </p>
    </div>
  </body>
</html>`,
      subject: "Confirm your NextStarter updates",
      text: [
        "Someone — hopefully you — asked to get NextStarter updates and the founding offer at this address.",
        "",
        `Confirm to join the list: ${link}`,
        "",
        "The link works for 7 days. If you didn't sign up, ignore this email — you won't be added or hear from us again.",
      ].join("\n"),
      to: [email],
    },
    { "Idempotency-Key": `updates-confirm/${addressHash}/${hour}` }
  );

  if (response.ok || response.status === 409) return true;

  // eslint-disable-next-line no-console
  console.error("Resend refused the confirmation email", response.status);
  return false;
};
