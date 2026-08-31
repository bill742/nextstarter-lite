import About from "./about";
import Features from "./features";
import GettingStarted from "./getting-started";
import Hero from "./hero";
import ScrollTargetRestorer from "./scroll-target-restorer";
import Stack from "./stack";
import Upgrade from "./upgrade";

/**
 * Default home page component displaying project features and installation instructions
 * @returns Home page with hero, technology carousel, features list, and GitHub link
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

      <Upgrade />
    </>
  );
};

LandingPage.displayName = "LandingPage  ";

export default LandingPage;
