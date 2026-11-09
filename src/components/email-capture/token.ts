import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "node:crypto";

import { emailConfirmSecret } from "@/lib/email-capture";

/** How long a confirmation link works. */
export const CONFIRM_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const IV_BYTES = 12;
const TAG_BYTES = 16;

/** AES-256 key derived from the configured secret. */
const key = () => createHash("sha256").update(emailConfirmSecret).digest();

/**
 * Seals an email address into the token carried by the confirmation link.
 *
 * Encrypted (AES-256-GCM), not just signed. The link is a page URL, and this
 * site's analytics records page URLs, so a signed-but-readable token would
 * hand every confirming visitor's email address to PostHog. GCM also
 * authenticates the token: a forged or altered one fails to open.
 *
 * @param email - The normalised address.
 * @returns A URL-safe token.
 */
export const sealEmail = (email: string) => {
  const iv = randomBytes(IV_BYTES);
  const cipher = createCipheriv("aes-256-gcm", key(), iv);
  const body = Buffer.concat([
    cipher.update(JSON.stringify({ e: email, t: Date.now() }), "utf8"),
    cipher.final(),
  ]);
  return Buffer.concat([iv, body, cipher.getAuthTag()]).toString("base64url");
};

/**
 * Opens a confirmation token.
 *
 * @param token - The token from the link.
 * @returns The email address, or `null` when the token is malformed, forged,
 *   or older than {@link CONFIRM_TTL_MS}.
 */
export const openEmail = (token: string): string | null => {
  try {
    const raw = Buffer.from(token, "base64url");
    if (raw.length <= IV_BYTES + TAG_BYTES) return null;

    const decipher = createDecipheriv(
      "aes-256-gcm",
      key(),
      raw.subarray(0, IV_BYTES)
    );
    decipher.setAuthTag(raw.subarray(raw.length - TAG_BYTES));
    const json = Buffer.concat([
      decipher.update(raw.subarray(IV_BYTES, raw.length - TAG_BYTES)),
      decipher.final(),
    ]).toString("utf8");

    const { e, t } = JSON.parse(json) as { e?: unknown; t?: unknown };
    if (typeof e !== "string" || typeof t !== "number") return null;
    // A minute of grace for clock skew between server instances.
    if (Date.now() - t > CONFIRM_TTL_MS || t > Date.now() + 60_000) return null;

    return e;
  } catch {
    return null;
  }
};
