import type { ShowcaseSection } from "./sections";

/**
 * One section of the catalogue: a category kicker, a heading, an introduction,
 * and its examples.
 *
 * The section takes its identity from the shared `sections` record rather than
 * from props written at the call site, so the anchor the nav scrolls to and the
 * heading a reader lands on can never drift apart.
 *
 * @param children - The examples in this section.
 * @param intro - Copy explaining what the component is for.
 * @param section - The entry from `sections` this renders.
 * @returns A labelled section with a stable anchor id.
 */
const Section = ({
  children,
  intro,
  section,
}: {
  children: React.ReactNode;
  intro: React.ReactNode;
  section: ShowcaseSection;
}) => (
  <section
    aria-labelledby={`${section.id}-heading`}
    // Clears the fixed header and the sticky section nav together, so a
    // deep-linked section does not land underneath them.
    className="scroll-mt-32"
    id={section.id}
  >
    <p className="text-xs font-semibold tracking-widest text-orange-700 uppercase dark:text-orange-400">
      {section.category}
    </p>

    <h2
      className="mt-2 font-serif text-2xl font-bold text-stone-900 md:text-3xl dark:text-stone-50"
      id={`${section.id}-heading`}
    >
      {section.title}
    </h2>

    <div className="mt-3 max-w-2xl leading-relaxed text-stone-600 dark:text-stone-300">
      {intro}
    </div>

    <div className="mt-8 space-y-6">{children}</div>
  </section>
);

Section.displayName = "Section";

export default Section;
