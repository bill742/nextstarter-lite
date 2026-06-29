"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

import { scrollToSection } from "@/lib/utils";

/** sessionStorage key holding the section to scroll to after navigating home. */
const SCROLL_TARGET_KEY = "nextstarter:scroll-target";

/**
 * Returns a handler that scrolls to a landing page section.
 *
 * When already on the home page, it smoothly scrolls to the section in place.
 * On any other route, it stashes the target section and navigates to the home
 * page (without a visible hash); the landing page scrolls to it on load.
 *
 * @returns A callback that takes a section id (without the leading `#`).
 */
export const useScrollToSection = () => {
  const pathname = usePathname();
  const router = useRouter();

  return useCallback(
    (sectionId: string) => {
      if (pathname === "/") {
        scrollToSection(sectionId);
      } else {
        sessionStorage.setItem(SCROLL_TARGET_KEY, sectionId);
        router.push("/");
      }
    },
    [pathname, router]
  );
};
