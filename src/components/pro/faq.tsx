import { faqSections } from "@/lib/faq";

/**
 * Buyer FAQ, rendered from the shared data in lib/faq.ts.
 *
 * Built on native <details>/<summary> rather than a JS accordion: it keeps the
 * page a server component, works with JavaScript disabled, and gets correct
 * keyboard and screen-reader behaviour from the browser for free. Every answer
 * stays in the DOM whether or not it's expanded, so search engines index the
 * content regardless of its open state.
 *
 * @returns The FAQ section.
 */
const Faq = () => {
  return (
    <>
      <section
        className="mx-auto max-w-5xl px-6 py-24 md:py-32"
        id="faq"
        aria-labelledby="faq-heading"
      >
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <h2
              className="font-serif text-3xl font-bold text-stone-900 md:text-4xl dark:text-stone-50"
              id="faq-heading"
            >
              Frequently asked questions
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-300">
              Everything buyers ask before they buy. If yours isn&apos;t here,
              just ask — the last answer has the address.
            </p>
          </div>

          <div className="mx-auto max-w-3xl space-y-10">
            {faqSections.map((section) => (
              <div key={section.id} className="space-y-3">
                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-50">
                  {section.title}
                </h3>

                <div className="divide-y divide-stone-200 overflow-hidden rounded-lg border border-stone-200 bg-white dark:divide-stone-800 dark:border-stone-800 dark:bg-stone-900/50">
                  {section.items.map((item) => (
                    <details key={item.id} className="group" id={item.id}>
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-medium text-stone-900 transition-colors hover:bg-stone-50 focus-visible:ring-2 focus-visible:ring-orange-600 focus-visible:outline-none focus-visible:ring-inset dark:text-stone-50 dark:hover:bg-stone-800/50 dark:focus-visible:ring-orange-400 [&::-webkit-details-marker]:hidden">
                        {item.question}
                        <span
                          className="shrink-0 text-xl leading-none text-orange-600 transition-transform duration-200 group-open:rotate-45 dark:text-orange-400"
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </summary>
                      <p className="p-6 leading-relaxed text-stone-600 dark:text-stone-300">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto h-px w-full max-w-5xl bg-linear-to-r from-transparent via-stone-200 to-transparent dark:via-stone-800" />
    </>
  );
};

Faq.displayName = "Faq";

export default Faq;
