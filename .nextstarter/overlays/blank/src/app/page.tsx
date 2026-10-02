import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  description: process.env.NEXT_PUBLIC_SITE_META_DESCRIPTION,
};

/**
 * Home page
 * @returns The home page
 */
const Home = () => {
  return (
    <div className="min-h-screen pt-16">
      <main className="mx-auto max-w-3xl px-6 py-24 md:py-32" id="main">
        <h1 className="font-serif text-4xl font-bold text-stone-900 md:text-5xl dark:text-stone-50">
          {process.env.NEXT_PUBLIC_SITE_NAME}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-stone-600 dark:text-stone-300">
          Get started by editing{" "}
          <code className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-base text-stone-900 dark:bg-stone-800 dark:text-stone-100">
            src/app/page.tsx
          </code>
          .
        </p>
      </main>
    </div>
  );
};

Home.displayName = "Home";

export default Home;
