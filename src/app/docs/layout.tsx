import DocsNav from "@/components/docs/docs-nav";

/**
 * Shared shell for every page under /docs: the sidebar beside the article on
 * wide screens, above it on narrow ones.
 *
 * `<main>` lives here rather than in each page so the skip link lands on the
 * article, past the sidebar, on every docs route.
 *
 * @param children - The docs page.
 * @returns The docs layout.
 */
const DocsLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen pt-16">
    <div className="mx-auto max-w-6xl gap-12 px-6 py-24 md:py-32 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)]">
      <aside className="mb-12 lg:mb-0">
        <DocsNav />
      </aside>
      <main className="max-w-3xl min-w-0" id="main">
        {children}
      </main>
    </div>
  </div>
);

DocsLayout.displayName = "DocsLayout";

export default DocsLayout;
