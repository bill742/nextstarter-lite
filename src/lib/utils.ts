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

/**
 * The site's base URL with any trailing slash removed.
 *
 * Callers append their own leading-slash paths (`${siteUrl}/pro`), so a
 * trailing slash on the environment variable would produce `//pro`. Normalizing
 * here means either form of `NEXT_PUBLIC_SITE_URL` works — which matters
 * because this is a starter, and the value is whatever the person cloning it
 * happened to paste.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(
  /\/+$/,
  ""
);
