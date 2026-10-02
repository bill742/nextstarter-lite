/**
 * Hero for the component catalogue.
 *
 * Says what the page is for in one line: these are the components that are in
 * the repository right now, rendered live. A boilerplate that lists components
 * it does not ship is worse than one that lists none, so this page is generated
 * from nothing — it imports the same modules an application would.
 *
 * @returns The catalogue hero.
 */
const Hero = () => (
  <section className="mx-auto max-w-3xl px-6 py-24 text-center md:py-28">
    <p className="text-sm font-semibold tracking-widest text-orange-700 uppercase dark:text-orange-400">
      Design System
    </p>

    <h1 className="mt-4 font-serif text-3xl font-bold text-stone-900 md:text-4xl dark:text-stone-50">
      UI Components
    </h1>

    <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-300">
      Every component in{" "}
      <code className="font-mono text-base">src/components/ui</code>, plus the
      colour and type foundations they are built from. The previews are the real
      components — they render here exactly as they will in your app, and the
      accessibility scan that runs on every push scans this page too.
    </p>

    <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-stone-600 dark:text-stone-400">
      Switch the theme with the toggle in the header: everything below follows
      it, because none of it hard-codes a colour.
    </p>
  </section>
);

Hero.displayName = "Hero";

export default Hero;
