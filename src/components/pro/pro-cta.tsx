"use client";

import Link from "next/link";
import posthog from "posthog-js";

import { Button } from "@/components/ui/button";
import { isAnalyticsEnabled } from "@/lib/analytics";
import { proUrl } from "@/lib/upsell";
import { cn } from "@/lib/utils";

/**
 * The orange gradient purchase button, shared by the hero and the closing CTA.
 *
 * Clicking it sends one named `checkout_clicked` event — the "clicked Buy"
 * step of the /pro conversion funnel. This is the only click the site records:
 * autocapture stays off (see `instrumentation-client.ts`), so no element text
 * or other clicks are collected, and `/privacy` says exactly this.
 *
 * @param children - The button label.
 * @param className - Extra classes merged onto the button (e.g. full width).
 * @param location - Which button on the page was clicked, sent with the event.
 * @returns A button linking out to the checkout.
 */
const ProCta = ({
  children,
  className,
  location,
}: {
  children: React.ReactNode;
  className?: string;
  location: "hero" | "final";
}) => (
  <Button
    asChild
    size="lg"
    className={cn(
      "dark:to-coral-600 bg-linear-to-r from-orange-700 to-orange-600 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] dark:from-orange-600",
      className
    )}
  >
    <Link
      href={proUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        // The checkout opens in a new tab, so this page stays alive long
        // enough for the event to send.
        if (isAnalyticsEnabled)
          posthog.capture("checkout_clicked", { location });
      }}
    >
      {children}
    </Link>
  </Button>
);

ProCta.displayName = "ProCta";

export default ProCta;
