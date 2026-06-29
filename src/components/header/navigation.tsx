import { scrollToSection } from "@/lib/utils";

import { navigationItems } from "./navigation-items";

/**
 * Main navigation component for header
 * Renders navigation links that smoothly scroll to page sections
 * @returns Navigation menu with smooth scroll buttons (hidden on mobile)
 */
const Navigation = () => {
  return (
    <nav className="hidden items-center gap-6 md:flex">
      <ul className="hidden space-x-6 md:flex md:items-center">
        {navigationItems.map((navItem) => (
          <li key={navItem.id}>
            <button
              type="button"
              onClick={() => scrollToSection(navItem.href.substring(1))}
              className="text-sm font-medium text-stone-600 transition-colors hover:text-orange-800 dark:text-stone-400 dark:hover:text-orange-400"
              aria-label={navItem.label}
            >
              {navItem.label}
              <div className="bg-primary absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></div>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Navigation.displayName = "Navigation";

export default Navigation;
