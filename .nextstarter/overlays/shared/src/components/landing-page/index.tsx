import About from "./about";
import Features from "./features";
import GettingStarted from "./getting-started";
import Hero from "./hero";
import ScrollTargetRestorer from "./scroll-target-restorer";
import Stack from "./stack";

/**
 * Example home page: hero, about, tech stack, features, and getting started
 * sections. Replace these with your own content.
 * @returns Home page sections
 */
const LandingPage = () => {
  return (
    <>
      <ScrollTargetRestorer />

      <Hero />

      <About />

      <Stack />

      <Features />

      <GettingStarted />
    </>
  );
};

LandingPage.displayName = "LandingPage";

export default LandingPage;
