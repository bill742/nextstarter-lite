"use client";

import { useEffect } from "react";

import { consumePendingScrollTarget } from "@/lib/use-scroll-to-section";
import { scrollToSection } from "@/lib/utils";

/**
 * Completes a section navigation that started on another route.
 *
 * Nav links outside the home page stash their target section and route here
 * (see `useScrollToSection`). This picks the target back up once the landing
 * page has mounted and scrolls to it. Renders nothing.
 *
 * @returns Nothing — this component only runs an effect.
 */
const ScrollTargetRestorer = () => {
  useEffect(() => {
    // Wait a frame so the sections below have been laid out; scrolling during
    // the mount commit lands at the wrong offset.
    //
    // Read the target inside the frame, not out here: Strict Mode runs this
    // effect, cleans it up, then runs it again. Consuming in the effect body
    // would clear the target on the first pass and cancel the frame that was
    // going to use it, leaving the second pass with nothing to scroll to.
    const frame = requestAnimationFrame(() => {
      const sectionId = consumePendingScrollTarget();

      if (sectionId) scrollToSection(sectionId);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  return null;
};

ScrollTargetRestorer.displayName = "ScrollTargetRestorer";

export default ScrollTargetRestorer;
