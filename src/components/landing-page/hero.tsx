import HeroCtas from "./hero-ctas";

/**
 * Landing page hero.
 *
 * The About section used to open the page, which meant the first thing a
 * visitor read was an explanation rather than a reason to care. This section
 * takes that spot and carries the `h1`: one claim, one sentence of support,
 * and the two actions the page exists to drive — scaffold a project, or buy
 * Pro.
 *
 * Deliberately image-free. Illustrations would clash with the type-led design
 * of the rest of the page, and every asset here is one more thing to strip out
 * of a scaffolded project. The only decoration is a CSS glow, which deletes in
 * one line.
 *
 * @returns The landing page hero section.
 */
const Hero = () => {
  return (
    <>
      <section
        className="relative isolate flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center md:py-32"
        id="hero"
      >
        {/* Decoration only — delete this div and the section stands on its own. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,var(--color-orange-100)_0%,transparent_70%)] opacity-70 dark:bg-[radial-gradient(60%_50%_at_50%_0%,var(--color-orange-950)_0%,transparent_70%)] dark:opacity-60"
        />

        <div className="mx-auto max-w-4xl space-y-8">
          <p className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-semibold tracking-widest text-orange-800 uppercase dark:border-orange-900 dark:bg-orange-950/50 dark:text-orange-300">
            Next.js 16 · TypeScript · WCAG 2.1 AA
          </p>

          <h1 className="font-serif text-4xl font-bold tracking-tight text-balance text-stone-900 md:text-6xl dark:text-stone-50">
            Ship{" "}
            <span className="text-orange-700 dark:text-orange-400">
              accessible
            </span>{" "}
            Next.js apps in minutes
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-pretty text-stone-600 md:text-xl dark:text-stone-300">
            The free, open source Next.js boilerplate that hands you a
            configured project — accessibility, end-to-end tests, and CI
            included. Skip the weekend of setup.
          </p>

          <HeroCtas />

          <p className="text-sm text-stone-600 dark:text-stone-400">
            MIT licensed · No sign up · One command to scaffold
          </p>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto h-px w-full max-w-5xl bg-linear-to-r from-transparent via-stone-200 to-transparent dark:via-stone-800" />
    </>
  );
};

Hero.displayName = "Hero";

export default Hero;
