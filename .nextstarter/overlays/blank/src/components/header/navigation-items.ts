export interface NavigationItem {
  href: string;
  id: number;
  label: string;
}

/**
 * Header navigation items, shown in the header on desktop and in the mobile
 * menu on small screens.
 *
 * Route links (`/about`) render as anchors. Section links (`#features`) render
 * as buttons that smooth-scroll to the element with that id on the home page.
 */
export const navigationItems: NavigationItem[] = [
  { href: "/", id: 1, label: "Home" },
];

/**
 * The header's call-to-action button, shown beside the theme toggle and at the
 * foot of the mobile menu. Set it to an item such as
 * `{ href: "/contact", id: 0, label: "Contact" }` to show it.
 */
export const headerCta: NavigationItem | null = null;
