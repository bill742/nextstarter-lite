import type { Metadata } from "next";
import Link from "next/link";

import UiComponentsPage from "@/components/ui-components";

export const metadata: Metadata = {
  alternates: {
    canonical: "/ui-components",
  },
  description:
    "Live examples of every UI component in the starter — buttons, cards, carousels, and tooltips — with the colour and type foundations behind them and the code for each.",
  openGraph: {
    description:
      "Live examples of every UI component in the starter, with the colour and type foundations behind them.",
    title: "UI Components — the starter's design system",
    // Relative: Next resolves it against the metadataBase in the root layout,
    // so a clone of this starter gets its own domain here.
    url: "/ui-components",
  },
  title: "UI Components",
};

/**
 * The /ui-components route — the catalogue of the starter's design system.
 *
 * Ungated, unlike /pro: the components ship with every copy of this
 * repository, so the page is always accurate and always worth indexing.
 *
 * @returns The component catalogue.
 */
const UiComponents = () => (
  <div className="min-h-screen pt-16">
    <main className="mx-auto max-w-7xl" id="main">
      <UiComponentsPage />

      <div className="mx-auto max-w-5xl px-6 pb-24">
        <Link
          className="text-sm text-stone-600 underline transition-colors hover:text-orange-700 dark:text-stone-400 dark:hover:text-orange-400"
          href="/"
        >
          Back to the home page
        </Link>
      </div>
    </main>
  </div>
);

UiComponents.displayName = "UiComponents";

export default UiComponents;
