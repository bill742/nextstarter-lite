"use client";

import { useEffect, useState } from "react";

import { cn, scrollToSection } from "@/lib/utils";

import { sectionOrder } from "./sections";

/**
 * The slice of the viewport a section has to cross to become the current one —
 * the same band the /pro nav uses, for the same reason: these sections are
 * taller than the screen, so plain intersection would light two at once.
 */
const ACTIVE_BAND = "-20% 0px -70% 0px";

/**
 * A sticky in-page nav for the component catalogue.
 *
 * Real anchors, so a section can be copied, opened in a new tab, and reached
 * with JS off; the click is intercepted and routed through `scrollToSection`
 * for the reduced-motion-aware scroll the rest of the site uses.
 *
 * @returns The section navigation bar.
 */
const SectionNav = () => {
  const [activeId, setActiveId] = useState(sectionOrder[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const inBand = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        // An empty band means the reader is between sections; the last one to
        // enter stays lit rather than flickering off.
        if (inBand[0]) setActiveId(inBand[0].target.id);
      },
      { rootMargin: ACTIVE_BAND }
    );

    for (const section of sectionOrder) {
      const element = document.getElementById(section.id);

      if (element) observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="On this page"
      // top-18 is the header's height: 40px of controls plus its py-4.
      className="sticky top-18 z-40 border-b border-stone-200/50 bg-white/80 backdrop-blur-md dark:border-stone-800/50 dark:bg-stone-950/80"
    >
      <ul className="mx-auto flex max-w-5xl justify-center-safe gap-1 overflow-x-auto px-6 py-2">
        {sectionOrder.map((section) => {
          const isActive = section.id === activeId;

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-orange-50 text-orange-800 dark:bg-orange-950/50 dark:text-orange-300"
                    : "text-stone-600 hover:text-orange-800 dark:text-stone-400 dark:hover:text-orange-400"
                )}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(section.id);
                }}
              >
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

SectionNav.displayName = "SectionNav";

export default SectionNav;
