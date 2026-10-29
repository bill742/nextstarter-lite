import Link from "next/link";

/**
 * The small building blocks the docs pages are written in.
 *
 * They live together because none of them is useful on its own, and keeping
 * the styling here means every page uses the same link colour, code colours,
 * and heading rhythm without repeating the class lists.
 */

/**
 * A section of a docs page.
 *
 * @param children - The section body.
 * @param id - Anchor id, so a section can be linked to directly.
 * @param title - The section heading.
 * @returns A titled section.
 */
export const DocsSection = ({
  children,
  id,
  title,
}: {
  children: React.ReactNode;
  id: string;
  title: string;
}) => (
  <section className="scroll-mt-24 space-y-4" id={id}>
    <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">
      {title}
    </h2>
    {children}
  </section>
);

DocsSection.displayName = "DocsSection";

/**
 * Inline code — a file path, a variable name, a command.
 *
 * @param children - The code.
 * @returns A styled `<code>` element.
 */
export const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="rounded bg-stone-200/70 px-1.5 py-0.5 font-mono text-sm text-stone-900 dark:bg-stone-800 dark:text-stone-100">
    {children}
  </code>
);

Code.displayName = "Code";

/**
 * A block of code or terminal commands.
 *
 * @param code - The snippet, already formatted.
 * @returns A scrollable `<pre>` block.
 */
export const CodeBlock = ({ code }: { code: string }) => (
  // tabIndex makes an overflowing block scrollable by keyboard, which axe
  // flags when it is missing.
  <pre
    className="overflow-x-auto rounded-lg border border-stone-200 bg-white p-4 text-sm text-stone-800 dark:border-stone-800 dark:bg-stone-900/50 dark:text-stone-200"
    tabIndex={0}
  >
    <code className="font-mono">{code}</code>
  </pre>
);

CodeBlock.displayName = "CodeBlock";

/**
 * A link in running text.
 *
 * Routes (`/docs/testing`) and in-page anchors render through `next/link`;
 * anything else is treated as external and opens in a new tab, the same way
 * the GitHub links elsewhere on the site do.
 *
 * @param children - The link text.
 * @param href - Where it goes.
 * @returns An anchor.
 */
export const DocsLink = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const className =
    "font-medium text-stone-900 underline transition-colors hover:text-orange-700 dark:text-stone-100 dark:hover:text-orange-400";

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link className={className} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
};

DocsLink.displayName = "DocsLink";

/**
 * A callout for something that is easy to get wrong — the kind of thing that
 * fails silently rather than with an error.
 *
 * @param children - The note's content.
 * @param title - A short label for the note.
 * @returns A highlighted aside.
 */
export const Note = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => (
  <aside className="rounded-lg border border-orange-200 bg-orange-50 p-4 text-stone-700 dark:border-orange-900 dark:bg-orange-950/40 dark:text-stone-300">
    <p className="font-semibold text-stone-900 dark:text-stone-50">{title}</p>
    <div className="mt-1 space-y-2">{children}</div>
  </aside>
);

Note.displayName = "Note";

/** One row of a `ReferenceList`. */
export type ReferenceItem = {
  /** What it does, in a sentence or two. */
  description: React.ReactNode;
  /** The variable, script, or file being described. */
  name: string;
  /** Shown beside the name — "Required", "Optional", a default value. */
  tag?: string;
};

/**
 * A list of names and what each one does — environment variables, scripts,
 * CI jobs.
 *
 * A description list rather than a table: the names are long and the
 * descriptions are sentences, and a three-column table either scrolls
 * sideways or wraps every cell on a phone.
 *
 * @param items - The entries to list.
 * @returns A styled `<dl>`.
 */
export const ReferenceList = ({ items }: { items: ReferenceItem[] }) => (
  <dl className="divide-y divide-stone-200 rounded-lg border border-stone-200 bg-white dark:divide-stone-800 dark:border-stone-800 dark:bg-stone-900/50">
    {items.map((item) => (
      <div className="space-y-1 p-4" key={item.name}>
        <dt className="flex flex-wrap items-center gap-2">
          <code className="font-mono text-sm font-semibold break-all text-stone-900 dark:text-stone-50">
            {item.name}
          </code>
          {item.tag ? (
            <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-semibold text-stone-700 dark:bg-stone-800 dark:text-stone-300">
              {item.tag}
            </span>
          ) : null}
        </dt>
        <dd className="text-sm leading-relaxed">{item.description}</dd>
      </div>
    ))}
  </dl>
);

ReferenceList.displayName = "ReferenceList";
