import NavLink from "@/components/nav-link";

import type { NavigationItem } from "./navigation-items";

interface CtaProps {
  /** Where the button goes — a section (`#getting-started`) or a route. */
  item: NavigationItem;
  /**
   * Run after the navigation is requested. The mobile menu passes its close
   * handler here — it locks body scroll while open, so the menu has to close
   * for the scroll to actually happen.
   */
  onNavigate?: () => void;
}

/**
 * Call-to-action button component for header
 * Renders the configured `headerCta`; the header omits it when that is `null`
 * @param item - The navigation item the CTA points at
 * @param onNavigate - Optional callback fired after the navigation is requested
 * @returns CTA that scrolls to a section or links to a route
 */
const Cta = ({ item, onNavigate }: CtaProps) => {
  return (
    <NavLink
      href={item.href}
      className="dark:to-coral-600 hidden rounded-lg bg-linear-to-r from-orange-700 to-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-[scale,box-shadow] hover:scale-[1.02] hover:shadow-md active:scale-[0.98] sm:block dark:from-orange-800"
      onNavigate={onNavigate}
    >
      {item.label}
    </NavLink>
  );
};

Cta.displayName = "Cta";

export default Cta;
