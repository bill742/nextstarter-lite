"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { docsPages } from "@/lib/docs";
import { cn } from "@/lib/utils";

/**
 * The docs sidebar.
 *
 * A client component only for `usePathname`: the current page is marked with
 * `aria-current="page"` so a screen reader announces it, not just its colour.
 * Above the `lg` breakpoint it sticks beside the article; below it, it sits
 * above the article as a wrapping row of links.
 *
 * @returns The docs navigation.
 */
const DocsNav = () => {
  const pathname = usePathname();

  return (
    <nav aria-label="Documentation" className="lg:sticky lg:top-24">
      <p className="mb-3 text-xs font-semibold tracking-wider text-stone-600 uppercase dark:text-stone-400">
        Documentation
      </p>
      <ul className="flex flex-wrap gap-1 lg:flex-col">
        {docsPages.map((page) => {
          const isActive = page.href === pathname;

          return (
            <li key={page.href}>
              <Link
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-orange-50 text-orange-800 dark:bg-orange-950/50 dark:text-orange-300"
                    : "text-stone-600 hover:text-orange-800 dark:text-stone-400 dark:hover:text-orange-400"
                )}
                href={page.href}
              >
                {page.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

DocsNav.displayName = "DocsNav";

export default DocsNav;
