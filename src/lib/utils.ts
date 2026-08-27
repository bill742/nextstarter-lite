import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes with proper precedence handling
 * @param inputs - Array of class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Scrolls to a section accounting for fixed header height
 * @param sectionId - The ID of the section to scroll to
 */
export const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const scrollBehavior = prefersReducedMotion ? "auto" : "smooth";

    section.scrollIntoView({
      behavior: scrollBehavior,
      block: "start",
    });
  }
};

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

/**
 * The site's base URL with any trailing slash removed.
 *
 * Callers append their own leading-slash paths (`${siteUrl}/pro`), so a
 * trailing slash on the environment variable would produce `//pro`. Normalizing
 * here means either form of `NEXT_PUBLIC_SITE_URL` works — which matters
 * because this is a starter, and the value is whatever the person cloning it
 * happened to paste.
 */
export const siteUrl = rawSiteUrl.replace(/\/+$/, "");

const DEV_SITE_URL = "http://localhost:3000";

/**
 * Parses an absolute URL, returning `null` instead of throwing.
 *
 * @param value - The candidate URL string
 * @returns The parsed `URL`, or `null` if the value is not an absolute URL
 */
const parseUrl = (value: string): URL | null => {
  try {
    return new URL(value);
  } catch {
    return null;
  }
};

/**
 * The site's base URL as a `URL`, for the root layout's `metadataBase`.
 *
 * `new URL(value)` throws a `TypeError` on anything that is not an absolute
 * URL, and `metadataBase` is evaluated at module scope in the root layout — so
 * a `NEXT_PUBLIC_SITE_URL` of `nextstarter.app` or `/` (no scheme) would break
 * every route in the app rather than just producing wrong metadata. For the
 * same reason `siteUrl` normalizes trailing slashes, an unusable value falls
 * back to localhost, which is what an unset variable already resolves to.
 */
export const metadataBaseUrl =
  parseUrl(rawSiteUrl) ?? new URL(DEV_SITE_URL);
