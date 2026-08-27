"use client";

import { Button } from "@/components/ui/button";
import { isUpsellEnabled } from "@/lib/upsell";
import { useScrollToSection } from "@/lib/use-scroll-to-section";

/**
 * Call to action pair for the About section.
 *
 * The primary action sends people to the Getting Started steps; the secondary
 * one surfaces the Pro teaser, which otherwise sits at the very bottom of the
 * page. Both scroll through the same hook the header CTA and nav links use, so
 * the reduced-motion handling and the cross-route fallback stay in one place.
 *
 * The Pro button follows {@link isUpsellEnabled} for the same reason the nav
 * does: with no upsell configured the `#pro` section never renders, and a
 * button that scrolls to a section that is not there is a dead control.
 *
 * @returns The About section's call-to-action buttons
 */
const AboutCtas = () => {
  const scrollToSection = useScrollToSection();

  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
      <Button
        size="lg"
        className="dark:to-coral-600 w-full bg-linear-to-r from-orange-700 to-orange-600 font-bold text-white shadow-lg transition-[scale,box-shadow] hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] sm:w-auto dark:from-orange-600"
        onClick={() => scrollToSection("getting-started")}
      >
        Start a project — it&apos;s free
      </Button>

      {isUpsellEnabled && (
        <Button
          size="lg"
          className="w-full border border-stone-300 bg-white font-semibold text-stone-900 shadow-sm transition-[scale,box-shadow] hover:scale-[1.02] hover:bg-stone-50 hover:shadow-md active:scale-[0.98] sm:w-auto dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:bg-stone-800"
          onClick={() => scrollToSection("pro")}
        >
          See what Pro adds
        </Button>
      )}
    </div>
  );
};

AboutCtas.displayName = "AboutCtas";

export default AboutCtas;
