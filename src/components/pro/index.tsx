import Comparison from "./comparison";
import Faq from "./faq";
import FinalCta from "./final-cta";
import Hero from "./hero";
import Integrations from "./integrations";
import SectionNav from "./section-nav";
import WhatYouGet from "./what-you-get";

/**
 * The /pro landing page.
 *
 * Composed the same way as the home page: ordered sections separated by
 * gradient dividers, so the two routes read as one site. The order follows the
 * buyer's questions — what is it, how does it compare to free, what's in it,
 * what do I receive, what am I still unsure about, and then the ask.
 *
 * @returns The full Pro page content.
 */
const ProPage = () => {
  return (
    <>
      <Hero />

      {/* Sticky from here down: the hero has the h1 and the first CTA, so the
          section nav only earns its space once the reader scrolls past it. */}
      <SectionNav />

      <Comparison />

      <Integrations />

      <WhatYouGet />

      <Faq />

      <FinalCta />
    </>
  );
};

ProPage.displayName = "ProPage";

export default ProPage;
