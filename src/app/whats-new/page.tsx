import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  formatUpdateDate,
  hasUpdates,
  liteUpdates,
  proUpdates,
  type UpdateEntry,
  type UpdateTag,
} from "@/lib/changelog";
import { isUpsellEnabled } from "@/lib/upsell";

export const metadata: Metadata = {
  alternates: {
    canonical: "/whats-new",
  },
  description:
    "Every update to the free starter and to NextStarter Pro, newest first, with the date each one shipped.",
  title: "What’s New",
};

/**
 * Badge colours per category.
 *
 * The label is the meaning; the colour only reinforces it, so the list stays
 * readable to anyone who cannot separate these hues. Every pair clears 4.5:1
 * in its own theme, because the labels are small bold text and WCAG treats
 * that as normal text.
 */
const tagStyles: Record<UpdateTag, string> = {
  Added:
    "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
  Changed: "bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
  Fixed: "bg-sky-50 text-sky-800 dark:bg-sky-950 dark:text-sky-200",
  Maintenance:
    "bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300",
  Release:
    "bg-orange-50 text-orange-800 dark:bg-orange-950 dark:text-orange-200",
  Security: "bg-rose-50 text-rose-800 dark:bg-rose-950 dark:text-rose-200",
};

/**
 * One update in the timeline.
 *
 * @param entry - The update to render.
 * @returns A list item carrying its own anchor id.
 */
const Update = ({ entry }: { entry: UpdateEntry }) => (
  <li
    className="scroll-mt-24 rounded-lg border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900/50"
    id={entry.id}
  >
    <div className="flex flex-wrap items-center gap-3">
      <time
        className="text-sm font-medium text-stone-600 dark:text-stone-400"
        dateTime={entry.date}
      >
        {formatUpdateDate(entry.date)}
      </time>
      <span
        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${tagStyles[entry.tag]}`}
      >
        {entry.tag}
      </span>
    </div>
    <h3 className="mt-3 font-medium text-stone-900 dark:text-stone-50">
      {entry.title}
    </h3>
    <p className="mt-2 leading-relaxed text-stone-600 dark:text-stone-400">
      {entry.summary}
    </p>
  </li>
);

Update.displayName = "Update";

/**
 * A titled timeline of updates for one product.
 *
 * @param children - Introductory copy shown above the list.
 * @param entries - The updates, already ordered newest first.
 * @param id - Anchor id, so each product's history can be linked to directly.
 * @param title - The section heading.
 * @returns A titled ordered list of updates.
 */
const Timeline = ({
  children,
  entries,
  id,
  title,
}: {
  children: React.ReactNode;
  entries: UpdateEntry[];
  id: string;
  title: string;
}) => (
  <section aria-labelledby={`${id}-heading`} className="scroll-mt-24" id={id}>
    <div className="space-y-3">
      <h2
        className="font-serif text-2xl font-bold text-stone-900 md:text-3xl dark:text-stone-50"
        id={`${id}-heading`}
      >
        {title}
      </h2>
      <div className="leading-relaxed text-stone-600 dark:text-stone-300">
        {children}
      </div>
    </div>

    <ol className="mt-8 space-y-4">
      {entries.map((entry) => (
        <Update entry={entry} key={entry.id} />
      ))}
    </ol>
  </section>
);

Timeline.displayName = "Timeline";

/**
 * The What's New page.
 *
 * Two lists rather than one merged history, because they describe two
 * different products: this free starter, whose repository anyone can read, and
 * NextStarter Pro, whose repository is private. The Pro list follows the same
 * `isUpsellEnabled` gate as the rest of the sales surface — a project
 * scaffolded from this starter shows only its own history, not the release
 * notes of a product it is not selling.
 *
 * @returns The What's New page.
 */
const WhatsNew = () => {
  // No history, no page — a cloned starter should not publish an empty
  // timeline, and emptying the data is how you clear ours out.
  if (!hasUpdates) notFound();

  return (
    <div className="min-h-screen pt-16">
      <main className="mx-auto max-w-3xl px-6 py-24 md:py-32" id="main">
        <div className="space-y-4">
          <h1 className="font-serif text-3xl font-bold text-stone-900 md:text-4xl dark:text-stone-50">
            What&rsquo;s New
          </h1>
          <p className="text-lg leading-relaxed text-stone-600 dark:text-stone-300">
            Everything that has shipped
            {isUpsellEnabled ? " in both versions" : ""}, newest first, with the
            date it landed.
          </p>
        </div>

        <div className="mt-16 space-y-20">
          <Timeline
            entries={liteUpdates}
            id="lite"
            title={isUpsellEnabled ? "The free starter" : "Updates"}
          >
            <p>
              The open-source starter — the landing page, the tooling, the
              tests, and the accessibility and performance work that runs on
              every push. Every change below is public: the full commit history
              lives in the{" "}
              <a
                className="underline transition-colors hover:text-orange-700 dark:hover:text-orange-400"
                href="https://github.com/bill742/nextstarter-lite"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub repository
              </a>
              .
            </p>
          </Timeline>

          {isUpsellEnabled && proUpdates.length > 0 ? (
            <Timeline entries={proUpdates} id="pro" title="NextStarter Pro">
              <p>
                Pro is a private repository, so its changelog and releases are
                visible only to buyers. This list is the public record of what
                has shipped into it — the SaaS foundation the free starter does
                not carry, and the maintenance that keeps it current. It reached{" "}
                <strong className="font-medium text-stone-900 dark:text-stone-100">
                  1.0.0
                </strong>{" "}
                on 2 September 2026, and buyers take every change here with a{" "}
                <span className="font-mono text-sm">git pull</span> rather than
                waiting for a release.
              </p>
              <p className="mt-4">
                <Link
                  className="underline transition-colors hover:text-orange-700 dark:hover:text-orange-400"
                  href="/pro"
                >
                  See what NextStarter Pro includes
                </Link>
              </p>
            </Timeline>
          ) : null}
        </div>

        <div className="mt-16">
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
};

WhatsNew.displayName = "WhatsNew";

export default WhatsNew;
