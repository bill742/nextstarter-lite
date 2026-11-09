/**
 * Quiet bot checks for the signup form.
 *
 * Aimed at generic form-spam scripts, which fill in every field they find and
 * submit at once. Neither check shows anything to people, loads a third-party
 * script, or changes what `/privacy` says. A bot written for this site in
 * particular can get past both; if that starts happening, Resend's sending
 * stats will show confirmation emails rising without confirmed contacts, and
 * the next step is a real bot check (Vercel BotID or Cloudflare Turnstile) in
 * the same server action.
 */

/**
 * The honeypot input's name. Deliberately meaningless: a name like `website`
 * or `phone` invites browser autofill, which would make real people look like
 * bots.
 */
export const HONEYPOT_FIELD = "hp_field";

/** Hidden input carrying how long the form was on screen, in milliseconds. */
export const TIMING_FIELD = "hp_elapsed";

/** Nobody types an email address and presses submit faster than this. */
export const MIN_FILL_MS = 2000;

/**
 * Decides whether a submission looks automated.
 *
 * A missing timing value is allowed through: it is what a visitor without
 * JavaScript sends, and the honeypot still applies to them.
 *
 * @param formData - The submitted form.
 * @returns The reason it looks like a bot, or `null` if it looks human.
 */
export const botReason = (
  formData: FormData
): "honeypot" | "too-fast" | null => {
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.length > 0) return "honeypot";

  const elapsed = Number(formData.get(TIMING_FIELD) || NaN);
  if (Number.isFinite(elapsed) && elapsed < MIN_FILL_MS) return "too-fast";

  return null;
};
