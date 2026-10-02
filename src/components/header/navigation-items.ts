import { hasUpdates } from "@/lib/changelog";
import { isUpsellEnabled } from "@/lib/upsell";

export interface NavigationItem {
  href: string;
  id: number;
  label: string;
}

const allNavigationItems: NavigationItem[] = [
  { href: "#about", id: 3, label: "About" },
  { href: "#stack", id: 2, label: "Tech Stack" },
  { href: "#features", id: 1, label: "Features" },
  { href: "/pro", id: 4, label: "Pro" },
  { href: "/whats-new", id: 5, label: "What’s New" },
];

/**
 * Header navigation items for the current configuration.
 *
 * The Pro entry is filtered out when no upsell is configured, and What's New
 * when there are no updates to show, so the nav can never link to a route that
 * is switched off.
 */
export const navigationItems = allNavigationItems.filter(
  (item) =>
    (item.href !== "/pro" || isUpsellEnabled) &&
    (item.href !== "/whats-new" || hasUpdates)
);

/**
 * The header's call-to-action button, shown beside the theme toggle and at the
 * foot of the mobile menu. Set it to `null` to remove it from both.
 */
export const headerCta: NavigationItem | null = {
  href: "#getting-started",
  id: 0,
  label: "Get Started",
};
