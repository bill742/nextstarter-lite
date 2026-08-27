"use client";

import Link from "next/link";

import { useScrollToSection } from "@/lib/use-scroll-to-section";

/**
 * Whether an href points at another route rather than a section of the home
 * page. Section links look like `#features`; route links like `/pro`.
 *
 * @param href - The href from a navigation item.
 * @returns `true` for a route, `false` for an on-page section.
 */
const isRouteHref = (href: string) => href.startsWith("/");

interface NavLinkProps {
  children: React.ReactNode;
  className?: string;
  href: string;
  /** Run after the navigation is requested — the mobile menu closes itself. */
  onNavigate?: () => void;
}

/**
 * A navigation item that renders the right element for its href.
 *
 * Section links (`#features`) stay buttons: they don't navigate, they scroll,
 * and the scroll is handled in JS so it can also work from another route.
 *
 * Route links (`/pro`) must render a real anchor. A `<button>` that calls
 * `router.push` looks identical but is not a link — search engines can't follow
 * it, so it contributes nothing to internal linking, and users lose
 * middle-click, cmd-click, "open in new tab", and the status-bar URL preview.
 *
 * @param props - The nav link props.
 * @returns An anchor for routes, a button for on-page sections.
 */
const NavLink = ({ children, className, href, onNavigate }: NavLinkProps) => {
  const scrollToSection = useScrollToSection();

  if (isRouteHref(href)) {
    return (
      <Link href={href} className={className} onClick={onNavigate}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        scrollToSection(href.substring(1));
        onNavigate?.();
      }}
    >
      {children}
    </button>
  );
};

NavLink.displayName = "NavLink";

export default NavLink;
