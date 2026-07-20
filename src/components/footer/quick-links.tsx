"use client";

import { scrollToSection } from "@/lib/utils";

const quickLinkItems = [
  { href: "#about", id: 1, label: "About" },
  { href: "#stack", id: 2, label: "Tech Stack" },
  { href: "#features", id: 3, label: "Features" },
  { href: "#pro", id: 5, label: "Upgrade to Pro" },
  { href: "#getting-started", id: 4, label: "Getting Started" },
];

/**
 * Quick navigation links component for footer
 * Renders a list of clickable links that smoothly scroll to different sections of the page
 * @returns List of quick navigation links with hover effects
 */
const QuickLinks = () => {
  return (
    <ul className="space-y-2 text-sm">
      {quickLinkItems.map((link) => (
        <li key={link.id}>
          <button
            type="button"
            onClick={() => scrollToSection(link.href.substring(1))}
            className="text-stone-600 transition-colors hover:text-orange-800 dark:text-stone-400 dark:hover:text-orange-400"
            aria-label={link.label}
          >
            {link.label}
            <div className="bg-primary absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></div>
          </button>
        </li>
      ))}
    </ul>
  );
};

QuickLinks.displayName = "QuickLinks";

export default QuickLinks;
