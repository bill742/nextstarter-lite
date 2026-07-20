import About from "./about";
import Features from "./features";
import GettingStarted from "./getting-started";
import Stack from "./stack";
import Upgrade from "./upgrade";

/**
 * Default home page component displaying project features and installation instructions
 * @returns Home page with technology carousel, features list, and GitHub link
 */
const LandingPage = () => {
  return (
    <>
      <h2 className="sr-only">
        NextStarter - A modern Next.js boilerplate for building production-ready
        web applications.
      </h2>
      <About />

      <Stack />

      <Features />

      <Upgrade />

      <GettingStarted />
    </>
  );
};

LandingPage.displayName = "LandingPage  ";

export default LandingPage;
