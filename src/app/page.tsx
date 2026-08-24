import type { Metadata } from "next";

import LandingPage from "@/components/landing-page";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  description: process.env.NEXT_PUBLIC_SITE_META_DESCRIPTION,
};

/**
 * Home page component that conditionally renders production or development content
 * @returns Home page with environment-specific content
 */
const Home = () => {
  return (
    <div className="min-h-screen pt-16">
      <main className="mx-auto max-w-7xl" id="main">
        <LandingPage />
      </main>
    </div>
  );
};

Home.displayName = "Home";

export default Home;
