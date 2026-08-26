/** The concrete deliverables, in the order a buyer experiences them. */
const deliverables = [
  {
    body: "Polar adds you to the private NextStarter Pro repository automatically at checkout. You connect your GitHub account in the customer portal, accept the emailed invitation, and clone — usually within a couple of minutes of paying.",
    id: 1,
    title: "Instant access to the private repository",
  },
  {
    body: "Delivery is through GitHub, not a zip file. Keep NextStarter as a git remote and pull new features and fixes whenever you want them; the CHANGELOG and GitHub Releases record what changed in every version.",
    id: 2,
    title: "Lifetime updates via git pull",
  },
  {
    body: "A single-developer license covering unlimited personal and commercial projects — client work, side projects, and your own products. You can ship what you build however you like; you just can't redistribute the starter itself.",
    id: 3,
    title: "An unlimited-projects license",
  },
  {
    body: "Setup, a guide for each integration, and deployment walkthroughs for Vercel and for self-hosting. The docs live in the repository, so they're versioned with the code they describe.",
    id: 4,
    title: "Documentation that keeps up",
  },
];

/**
 * The "what you actually receive" section.
 *
 * A $199 purchase of something the buyer cannot see before paying needs this
 * to be concrete and unambiguous — how access arrives, how updates arrive, and
 * what the license permits.
 *
 * @returns The deliverables section.
 */
const WhatYouGet = () => {
  return (
    <>
      <section
        className="mx-auto max-w-5xl px-6 py-24 md:py-32"
        id="delivery"
        aria-labelledby="delivery-heading"
      >
        <div className="space-y-8">
          <div className="space-y-4 text-center">
            <h2
              className="font-serif text-3xl font-bold text-stone-900 md:text-4xl dark:text-stone-50"
              id="delivery-heading"
            >
              What you actually receive
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-300">
              No zip file, no drip-fed course, no seat that expires.
            </p>
          </div>

          <ol className="mx-auto max-w-3xl space-y-4">
            {deliverables.map((item) => (
              <li
                key={item.id}
                className="flex gap-4 rounded-lg border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900/50"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-600 font-semibold text-white dark:bg-orange-500"
                  aria-hidden="true"
                >
                  {item.id}
                </span>
                <div className="space-y-2">
                  <h3 className="font-medium text-stone-900 dark:text-stone-50">
                    {item.title}
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto h-px w-full max-w-5xl bg-linear-to-r from-transparent via-stone-200 to-transparent dark:via-stone-800" />
    </>
  );
};

WhatYouGet.displayName = "WhatYouGet";

export default WhatYouGet;
