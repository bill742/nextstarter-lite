import CodeBlock from "./code-block";

/**
 * A single example: a title, a live preview, and the source behind it.
 *
 * The preview is the real component imported from `src/components/ui` — not a
 * screenshot and not a copy — so this page fails visibly if a component
 * regresses, and the accessibility scan that runs over it in CI is scanning the
 * components themselves.
 *
 * @param children - The live preview.
 * @param code - The snippet shown under the preview.
 * @param description - Optional note about what the example demonstrates.
 * @param title - The example heading.
 * @returns A framed example with its code.
 */
const Example = ({
  children,
  code,
  description,
  title,
}: {
  children: React.ReactNode;
  code: string;
  description?: React.ReactNode;
  title: string;
}) => (
  <article className="overflow-hidden rounded-xl border border-stone-200 bg-white dark:border-stone-800 dark:bg-stone-900/50">
    <div className="border-b border-stone-200 px-6 py-4 dark:border-stone-800">
      <h3 className="font-medium text-stone-900 dark:text-stone-50">{title}</h3>
      {description ? (
        <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
          {description}
        </p>
      ) : null}
    </div>

    <div className="px-6 py-8">{children}</div>

    <CodeBlock code={code} />
  </article>
);

Example.displayName = "Example";

/**
 * The row of specimens inside an example.
 *
 * A list, because that is what it is: a set of sibling variants a screen reader
 * should be able to count and step through.
 *
 * @param children - `Specimen` items.
 * @returns A wrapping list of specimens.
 */
export const SpecimenList = ({ children }: { children: React.ReactNode }) => (
  <ul className="flex flex-wrap items-end gap-x-8 gap-y-6">{children}</ul>
);

SpecimenList.displayName = "SpecimenList";

/**
 * One specimen with the prop value that produced it underneath.
 *
 * The label is visible text rather than a `title` or a tooltip: the whole point
 * is to read the variant name and the rendering together.
 *
 * @param children - The rendered component.
 * @param label - The prop value being demonstrated.
 * @returns A labelled list item.
 */
export const Specimen = ({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) => (
  <li className="flex flex-col items-center gap-2">
    {children}
    <span className="font-mono text-xs text-stone-500 dark:text-stone-400">
      {label}
    </span>
  </li>
);

Specimen.displayName = "Specimen";

export default Example;
