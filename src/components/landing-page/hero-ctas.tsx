"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { isUpsellEnabled } from "@/lib/upsell";
import { useScrollToSection } from "@/lib/use-scroll-to-section";

/**
 * The hero's call-to-action pair.
 *
 * The primary action drops people at the Getting Started steps through the
 * same hook the header CTA and the nav links use, so reduced-motion handling
 * and the cross-route fallback stay in one place. The secondary action goes to
 * the full `/pro` page rather than the teaser at the bottom of this one — an
 * upgrade CTA should land on the page that sells, not on a summary.
 *
 * The Pro button follows {@link isUpsellEnabled} for the same reason the nav
 * does: with no upsell configured `/pro` 404s, and a button that links to a
 * missing route is a dead control.
 *
 * The primary button's gradient darkens left to right rather than lightening
 * like the header CTA's. White on `orange-600` is 3.6:1, which clears AA for
 * the header's small caps but not for text this size; ending on `orange-800`
 * keeps every point of the button past 4.5:1.
 *
 * @returns The hero's call-to-action buttons.
 */
const HeroCtas = () => {
  const scrollToSection = useScrollToSection();

  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
      <Button
        size="lg"
        className="h-12 w-full bg-linear-to-r from-orange-700 to-orange-800 px-8 text-base font-bold text-white shadow-lg transition-[scale,box-shadow] hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] sm:w-auto"
        onClick={() => scrollToSection("getting-started")}
      >
        Get started free
      </Button>

      {isUpsellEnabled && (
        <Button
          asChild
          size="lg"
          className="h-12 w-full border border-stone-300 bg-white px-8 text-base font-semibold text-stone-900 shadow-sm transition-[scale,box-shadow] hover:scale-[1.02] hover:bg-stone-50 hover:shadow-md active:scale-[0.98] sm:w-auto dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800"
        >
          <Link href="/pro">
            Upgrade to Pro
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      )}
    </div>
  );
};

HeroCtas.displayName = "HeroCtas";

export default HeroCtas;
