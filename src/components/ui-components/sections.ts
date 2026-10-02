/**
 * The catalogue's sections.
 *
 * One entry per component in `src/components/ui`, plus the two foundation
 * sections the components are built out of. The section nav, the headings, and
 * the anchor ids all read from here, so a new component is added in one place
 * and cannot end up in the nav without a section to scroll to — or the reverse.
 *
 * Ids are shaped `category-component`, matching the convention most component
 * galleries use, so a link like `/ui-components#actions-button` says what it
 * points at.
 */
export type ShowcaseSection = {
  /** The group the section belongs to, shown above its heading. */
  category: string;
  /** Anchor id. Stable: these get linked to from outside the page. */
  id: string;
  /** Short label for the section nav, where horizontal space is scarce. */
  label: string;
  /** The section heading. */
  title: string;
};

/** Every section, keyed by the thing it documents. */
export const sections = {
  button: {
    category: "Actions",
    id: "actions-button",
    label: "Button",
    title: "Button",
  },
  card: {
    category: "Data display",
    id: "data-display-card",
    label: "Card",
    title: "Card",
  },
  carousel: {
    category: "Media",
    id: "media-carousel",
    label: "Carousel",
    title: "Carousel",
  },
  color: {
    category: "Foundations",
    id: "foundations-color",
    label: "Color",
    title: "Color",
  },
  tooltip: {
    category: "Overlays",
    id: "overlays-tooltip",
    label: "Tooltip",
    title: "Tooltip",
  },
  typography: {
    category: "Foundations",
    id: "foundations-typography",
    label: "Typography",
    title: "Typography",
  },
} satisfies Record<string, ShowcaseSection>;

/**
 * The sections in render order — foundations first, then the components in
 * category order. The nav renders this array; the page renders the matching
 * components in the same sequence.
 */
export const sectionOrder: ShowcaseSection[] = [
  sections.color,
  sections.typography,
  sections.button,
  sections.card,
  sections.carousel,
  sections.tooltip,
];
