import NavLink from "@/components/nav-link";

import { navigationItems } from "./navigation-items";

/**
 * Main navigation component for header
 * Renders navigation items that either scroll to a section or link to a route
 * @returns Navigation menu (hidden on mobile)
 */
const Navigation = () => {
  return (
    <nav className="hidden items-center gap-6 md:flex">
      <ul className="hidden space-x-6 md:flex md:items-center">
        {navigationItems.map((navItem) => (
          <li key={navItem.id}>
            <NavLink
              href={navItem.href}
              className="text-sm font-medium text-stone-600 transition-colors hover:text-orange-800 dark:text-stone-400 dark:hover:text-orange-400"
            >
              {navItem.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Navigation.displayName = "Navigation";

export default Navigation;
