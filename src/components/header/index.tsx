"use client";

import { useEffect, useState } from "react";

import Cta from "./cta";
import Logo from "./logo";
import MobileMenu from "./mobile-menu";
import ModeToggle from "./mode-toggle";
import Navigation from "./navigation";

/**
 * Header component for site-wide navigation and branding
 * Features glassmorphic design with smooth scroll effects
 * @returns Dynamic header component with navigation and theme toggle
 */
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-stone-200/50 bg-white/80 shadow-sm backdrop-blur-md dark:border-stone-800/50 dark:bg-stone-950/80"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo/Brand */}
        <div className="flex items-center gap-8">
          <Logo />
          <Navigation />
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          <Cta />

          <ModeToggle />

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-stone-200 transition-colors hover:bg-stone-50 md:hidden dark:border-stone-800 dark:hover:bg-stone-900"
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="h-5 w-5 text-stone-600 dark:text-stone-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <title>Menu icon</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Animated border accent */}
      <div
        className={`h-[px absolute bottom-0 left-0 bg-linear-to-r from-transparent via-orange-500 to-transparent transition-opacity duration-300 ${
          isScrolled ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
      />

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

Header.displayName = "Header";

export default Header;
