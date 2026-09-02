import NavLink from "@/components/nav-link";
import { hasUpdates } from "@/lib/changelog";
import { isUpsellEnabled } from "@/lib/upsell";

const allQuickLinkItems = [
  { href: "#about", id: 1, label: "About" },
  { href: "#stack", id: 2, label: "Tech Stack" },
  { href: "#features", id: 3, label: "Features" },
  { href: "/pro", id: 5, label: "Upgrade to Pro" },
  { href: "#getting-started", id: 4, label: "Getting Started" },
  { href: "/whats-new", id: 6, label: "What’s New" },
];

/** Filtered so the footer never links to a switched-off route. */
const quickLinkItems = allQuickLinkItems.filter(
  (item) =>
    (item.href !== "/pro" || isUpsellEnabled) &&
    (item.href !== "/whats-new" || hasUpdates)
);

/**
 * Quick navigation links component for footer
 * Renders links that either smoothly scroll to a section of the landing page
 * or navigate to another route
 * @returns List of quick navigation links with hover effects
 */
const QuickLinks = () => {
  return (
    <ul className="space-y-2 text-sm">
      {quickLinkItems.map((link) => (
        <li key={link.id}>
          <NavLink
            href={link.href}
            className="text-stone-600 transition-colors hover:text-orange-800 dark:text-stone-400 dark:hover:text-orange-400"
          >
            {link.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

QuickLinks.displayName = "QuickLinks";

export default QuickLinks;
