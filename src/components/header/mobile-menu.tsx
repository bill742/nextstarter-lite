"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

import { scrollToSection } from "@/lib/utils";

import Cta from "./cta";
import { navigationItems } from "./navigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Mobile navigation menu with slide-in animation
 * @param isOpen - Whether the menu is open
 * @param onClose - Function to close the menu
 * @returns Mobile menu overlay with navigation links
 */
const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleNavClick = (href: string) => {
    scrollToSection(href.substring(1));
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 bg-stone-900/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Mobile menu panel */}
      <div
        className={`fixed top-0 right-0 z-50 flex h-screen w-70 flex-col border-l border-stone-200/50 bg-white/95 shadow-2xl backdrop-blur-md transition-transform duration-300 ease-out md:hidden dark:border-stone-800/50 dark:bg-stone-950/95 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex shrink-0 items-center justify-between border-b border-stone-200/50 p-6 dark:border-stone-800/50">
          <span className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50">
            Menu
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 transition-colors hover:bg-stone-50 dark:border-stone-800 dark:hover:bg-stone-900"
            aria-label="Close menu"
          >
            <X className="h-5 w-5 text-stone-600 dark:text-stone-400" />
          </button>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 overflow-y-auto p-6">
          <ul className="space-y-2">
            {navigationItems.map((navItem) => (
              <li key={navItem.id}>
                <button
                  type="button"
                  onClick={() => handleNavClick(navItem.href)}
                  className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-left text-base font-medium text-stone-900 transition-all hover:bg-orange-50 hover:text-orange-700 dark:text-stone-100 dark:hover:bg-orange-950/30 dark:hover:text-orange-400"
                >
                  <span>{navItem.label}</span>
                  <span className="text-stone-400 transition-transform group-hover:translate-x-1 dark:text-stone-600">
                    →
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile CTA */}
        <div className="shrink-0 border-t border-stone-200/50 p-6 dark:border-stone-800/50">
          <Cta />
        </div>
      </div>
    </>
  );
};

MobileMenu.displayName = "MobileMenu";

export default MobileMenu;
