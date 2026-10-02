/**
 * The source data behind /whats-new.
 *
 * Both arrays start empty, and while they are empty the `/whats-new` route
 * 404s and drops out of the navigation and the sitemap (see `hasUpdates`).
 * Add your first entry to `liteUpdates` and the page comes back.
 */

/** How an update is classified, following Keep a Changelog's vocabulary. */
export type UpdateTag =
  "Added" | "Changed" | "Fixed" | "Maintenance" | "Release" | "Security";

/** A single shipped update. */
export type UpdateEntry = {
  /** ISO `YYYY-MM-DD`, the date the work landed on `main`. */
  date: string;
  /** Stable anchor id, so an individual update can be linked to directly. */
  id: string;
  /** One or two sentences on what changed and why it matters. */
  summary: string;
  /** Which kind of change this is. */
  tag: UpdateTag;
  /** The headline, written as the outcome rather than the commit subject. */
  title: string;
};

/**
 * Formats an entry date for display.
 *
 * Fixed to `en-GB` and UTC rather than the visitor's locale and zone: these
 * pages are statically rendered, so a locale-dependent format would be frozen
 * at whatever the build machine happened to be, and a zone-dependent one can
 * render the day before west of Greenwich.
 *
 * @param date - An ISO `YYYY-MM-DD` date.
 * @returns The date as e.g. "31 August 2026".
 */
export const formatUpdateDate = (date: string): string =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00Z`));

/** Updates to this project, newest first. */
export const liteUpdates: UpdateEntry[] = [];

/**
 * Whether there is anything to show on `/whats-new`. The route, its navigation
 * entries, and its sitemap listing all read this, so the nav can never link to
 * a page that 404s.
 */
export const hasUpdates = liteUpdates.length > 0;

/** Updates to a paid edition, shown only when the upsell is enabled. */
export const proUpdates: UpdateEntry[] = [];
