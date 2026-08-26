import AboutCtas from "./about-ctas";

/**
 * About section component
 * Describes the purpose and features of the Next.js boilerplate project
 * @returns About section with project description and call-to-action
 */
const About = () => {
  return (
    <>
      <section
        className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-6 py-24 text-center md:py-32"
        id="about"
      >
        <div className="space-y-6">
          <h1 className="font-serif text-3xl font-bold text-stone-900 md:text-4xl dark:text-stone-50">
            About {process.env.NEXT_PUBLIC_SITE_NAME} - the accessible Next.js
            boilerplate
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600 md:text-xl dark:text-stone-300">
            {process.env.NEXT_PUBLIC_SITE_NAME} is a free, open source{" "}
            <strong>Next.js</strong> boilerplate that hands you a project
            already set up. TypeScript, Tailwind, and shadcn/ui are wired
            together, with the linting, formatting, and testing decisions made
            for you. Skip the weekend of configuration and start on the product
            instead.
          </p>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600 md:text-xl dark:text-stone-300">
            It is accessible from the first commit: WCAG 2.1 AA verified with
            Axe-core, perfect Lighthouse scores enforced in CI, and Playwright
            end-to-end tests running against Chromium, Firefox, and WebKit.
          </p>

          <div className="pt-2">
            <AboutCtas />
          </div>
        </div>
      </section>
      {/* Divider */}
      <div className="mx-auto h-px w-full max-w-5xl bg-linear-to-r from-transparent via-stone-200 to-transparent dark:via-stone-800" />
    </>
  );
};

About.displayName = "About";

export default About;
