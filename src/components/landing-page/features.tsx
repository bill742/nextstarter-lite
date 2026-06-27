import FeatureItem from "./feature-item";

/**
 * Features section component
 * Displays a grid of project features and capabilities
 * @returns Features section with heading and feature list grid
 */
const Features = () => {
  return (
    <>
      <section className="mx-auto max-w-5xl px-6 py-24 md:py-32" id="features">
        <div className="space-y-8">
          <h2 className="text-center font-serif text-3xl font-bold text-stone-900 md:text-4xl dark:text-stone-50">
            Features
          </h2>
          <ul className="grid gap-4 text-stone-600 md:grid-cols-2 md:gap-6 dark:text-stone-300">
            <FeatureItem
              content="Authentication with "
              link="https://clerk.com"
              linkText="Clerk"
            />
            <FeatureItem content="WCAG 2.1 AA accessibility, verified with Axe-core" />
            <FeatureItem content="ShadCN/UI for theming and component library" />
            <FeatureItem content="Built-in light and dark themes" />
            <FeatureItem content="End-to-end testing with Playwright" />
            <FeatureItem content="ESLint config and rules" />
            <FeatureItem content="Prettier configuration setup for Tailwind" />
            <FeatureItem
              content="Icons from "
              link="https://react-icons.github.io/react-icons/"
              linkText="React Icons"
            />
            <FeatureItem content="Custom 404 page, robots.txt, and sitemap.xml" />
            <FeatureItem content="GitHub Actions CI workflow" />
          </ul>
        </div>
      </section>
      <div className="mx-auto h-px w-full max-w-5xl bg-linear-to-r from-transparent via-stone-200 to-transparent dark:via-stone-800" />
    </>
  );
};

Features.displayName = "Features";

export default Features;
