import Buttons from "./buttons";
import Cards from "./cards";
import Carousels from "./carousels";
import Colors from "./colors";
import Hero from "./hero";
import SectionNav from "./section-nav";
import Tooltips from "./tooltips";
import Typography from "./typography";

/**
 * The /ui-components page.
 *
 * Foundations first, then one section per component in `src/components/ui`, in
 * the order `sectionOrder` lists them — the sticky nav renders from the same
 * array, so adding a component here means adding it there and nowhere else.
 *
 * Keeping the catalogue in the app rather than in a separate tool is a
 * deliberate trade: no extra dependency, no second build, and the examples
 * cannot drift from the components, because they import them.
 *
 * @returns The full component catalogue.
 */
const UiComponentsPage = () => (
  <>
    <Hero />

    {/* Sticky from here down: the hero carries the h1, so the nav only earns
        its space once the reader has scrolled past it. */}
    <SectionNav />

    <div className="mx-auto max-w-5xl space-y-20 px-6 py-16 md:py-20">
      <Colors />
      <Typography />
      <Buttons />
      <Cards />
      <Carousels />
      <Tooltips />
    </div>
  </>
);

UiComponentsPage.displayName = "UiComponentsPage";

export default UiComponentsPage;
