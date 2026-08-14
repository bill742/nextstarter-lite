"use client";

import { useScrollToSection } from "@/lib/use-scroll-to-section";

interface CtaProps {
  /**
   * Run after the scroll is requested. The mobile menu passes its close
   * handler here — it locks body scroll while open, so the menu has to close
   * for the scroll to actually happen.
   */
  onNavigate?: () => void;
}

/**
 * Call-to-action button component for header
 * Scrolls to the getting started section when clicked
 * @param onNavigate - Optional callback fired after the scroll is requested
 * @returns CTA button that navigates to getting started section
 */
const Cta = ({ onNavigate }: CtaProps) => {
  const scrollToSection = useScrollToSection();

  const handleClick = () => {
    scrollToSection("getting-started");
    onNavigate?.();
  };

  return (
    <button
      type="button"
      className="dark:to-coral-600 hidden rounded-lg bg-linear-to-r from-orange-700 to-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:scale-[1.02] hover:shadow-md active:scale-[0.98] sm:block dark:from-orange-800"
      onClick={handleClick}
      aria-label="Get Started"
    >
      Get Started
    </button>
  );
};

Cta.displayName = "Cta";

export default Cta;
