"use client";

import { useEffect, useState } from "react";

import { cn, scrollToSection } from "@/lib/utils";

/** The page's sections, in the order `ProPage` renders them. */
const sections = [
  { id: "overview", label: "Overview" },
  { id: "compare", label: "Free vs. Pro" },
  { id: "included", label: "What Pro adds" },
  { id: "delivery", label: "What you get" },
  { id: "faq", label: "FAQ" },
  { id: "buy", label: "Pricing" },
];

/**
 * The slice of the viewport a section has to cross to become the current one:
 * a band just below the header, well short of the midpoint. Sections here are
 * taller than the screen, so highlighting on plain intersection would light up
 * two at once — the band picks whichever one the reader is actually in.
 */
const ACTIVE_BAND = "-25% 0px -70% 0px";

/**
 * A sticky in-page nav for the /pro sections.
 *
 * The links are real anchors so they can be copied, opened in a new tab, and
 * followed with JS off, but the click is handled here and routed through
 * `scrollToSection` — the same smooth, reduced-motion-aware scroll the home
 * page nav uses.
 *
 * @returns The section navigation bar.
 */
const SectionNav = () => {
  const [activeId, setActiveId] = useState(sections[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const inBand = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        // An empty band means the reader is on a boundary between sections;
        // the last section to enter it stays lit rather than flickering off.
        if (inBand[0]) setActiveId(inBand[0].target.id);
      },
      { rootMargin: ACTIVE_BAND }
    );

    for (const section of sections) {
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
        {sections.map((section) => {
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
