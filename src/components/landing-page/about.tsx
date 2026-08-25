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
            About {process.env.NEXT_PUBLIC_SITE_NAME}
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600 md:text-xl dark:text-stone-300">
            This is a boilerplate I put together for creating my front-end
            projects with <strong>NextJS</strong>, TypeScript, and Tailwind. It
            includes all of the linting and formatting rules that I like to use
            with ESLint and Prettier as well as a theme switcher for dark and
            light modes. It also includes a few other niceties like a custom 404
            page, robots.txt and sitemap.xml files, and VS Code settings.
          </p>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-stone-600 md:text-xl dark:text-stone-300">
            To begin your project, please see the{" "}
            <strong>Getting Started</strong> section below.
          </p>
        </div>
      </section>
      {/* Divider */}
      <div className="mx-auto h-px w-full max-w-5xl bg-linear-to-r from-transparent via-stone-200 to-transparent dark:via-stone-800" />
    </>
  );
};

About.displayName = "About";

export default About;
