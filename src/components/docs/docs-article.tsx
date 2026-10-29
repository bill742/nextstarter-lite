import Link from "next/link";

import { docsPages, getDocsPage } from "@/lib/docs";

/**
 * The body of one docs page: its heading and lede, the content, and links to
 * the previous and next pages in reading order.
 *
 * The heading and lede come from `lib/docs.ts` rather than from the page, so
 * they always match the sidebar label and the meta description.
 *
 * @param children - The page content, usually a series of `DocsSection`s.
 * @param href - The page's route, used to look up its entry.
 * @returns The rendered article.
 */
const DocsArticle = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => {
  const page = getDocsPage(href);
  const index = docsPages.indexOf(page);
  const previous = docsPages[index - 1];
  const next = docsPages[index + 1];

  return (
    <article>
      <div className="space-y-4">
        <h1 className="font-serif text-3xl font-bold text-stone-900 md:text-4xl dark:text-stone-50">
          {page.title}
        </h1>
        <p className="text-lg leading-relaxed text-stone-600 dark:text-stone-300">
          {page.description}
        </p>
      </div>

      <div className="mt-12 space-y-12 leading-relaxed text-stone-600 dark:text-stone-400">
        {children}
      </div>

      <nav
        aria-label="Previous and next pages"
        className="mt-16 grid gap-4 border-t border-stone-200 pt-8 sm:grid-cols-2 dark:border-stone-800"
      >
        {previous ? (
          <Link
            className="group rounded-lg border border-stone-200 bg-white p-4 transition-colors hover:border-orange-300 dark:border-stone-800 dark:bg-stone-900/50 dark:hover:border-orange-800"
            href={previous.href}
          >
            <span className="block text-sm text-stone-600 dark:text-stone-400">
              Previous
            </span>
            <span className="font-medium text-stone-900 group-hover:text-orange-800 dark:text-stone-50 dark:group-hover:text-orange-400">
              {previous.label}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            className="group rounded-lg border border-stone-200 bg-white p-4 text-right transition-colors hover:border-orange-300 dark:border-stone-800 dark:bg-stone-900/50 dark:hover:border-orange-800"
            href={next.href}
          >
            <span className="block text-sm text-stone-600 dark:text-stone-400">
              Next
            </span>
            <span className="font-medium text-stone-900 group-hover:text-orange-800 dark:text-stone-50 dark:group-hover:text-orange-400">
              {next.label}
            </span>
          </Link>
        ) : null}
      </nav>
    </article>
  );
};

DocsArticle.displayName = "DocsArticle";

export default DocsArticle;
