import { hasUpdates } from "@/lib/changelog";
import { isUpsellEnabled } from "@/lib/upsell";

const allNavigationItems = [
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
