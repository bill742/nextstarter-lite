import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Example from "./example";
import Section from "./section";
import { sections } from "./sections";

/** Placeholder slides. Numbered, so the scroll position is obvious. */
const slides = [1, 2, 3, 4, 5, 6];

const horizontalCode = `import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

{/* px-12 leaves room for the controls, which sit outside the track.
    aria-label names the region — required once a page has two of them. */}
<div className="px-12">
  <Carousel aria-label="Product screenshots" opts={{ align: "start" }}>
    <CarouselContent>
      {slides.map((slide) => (
        <CarouselItem className="sm:basis-1/2 lg:basis-1/3" key={slide}>
          …
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</div>`;

const verticalCode = `<div className="py-12">
  <Carousel className="mx-auto max-w-sm" orientation="vertical">
    <CarouselContent className="h-56">
      {slides.map((slide) => (
        <CarouselItem className="basis-1/2" key={slide}>…</CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</div>`;

/**
 * A slide's contents.
 *
 * @param slide - The slide number.
 * @returns A filled panel carrying the number.
 */
const Slide = ({ slide }: { slide: number }) => (
  <div className="flex h-28 items-center justify-center rounded-lg border border-stone-200 bg-stone-50 text-2xl font-bold text-stone-500 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400">
    {slide}
  </div>
);

Slide.displayName = "Slide";

/**
 * The carousel section.
 *
 * @returns The horizontal and vertical orientations of `Carousel`.
 */
const Carousels = () => (
  <Section
    intro={
      <p>
        A thin wrapper over{" "}
        <code className="font-mono text-sm">embla-carousel-react</code>. The
        track is a region with slides announced as such, the controls disable
        themselves at each end rather than wrapping silently, and the left and
        right arrow keys scroll it while focus is inside.
      </p>
    }
    section={sections.carousel}
  >
    <Example
      code={horizontalCode}
      description="Slide width comes from the basis on each item, so how many are visible is a responsive decision rather than a prop."
      title="Horizontal"
    >
      <div className="px-12">
        <Carousel
          aria-label="Horizontal carousel example"
          opts={{ align: "start" }}
        >
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem className="sm:basis-1/2 lg:basis-1/3" key={slide}>
                <Slide slide={slide} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Example>

    <Example
      code={verticalCode}
      description="The same component on the other axis. The track needs an explicit height, since there is nothing else to derive one from."
      title="Vertical"
    >
      <div className="py-12">
        <Carousel
          aria-label="Vertical carousel example"
          className="mx-auto max-w-sm"
          orientation="vertical"
        >
          <CarouselContent className="h-56">
            {slides.map((slide) => (
              <CarouselItem className="basis-1/2" key={slide}>
                <Slide slide={slide} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </Example>
  </Section>
);

Carousels.displayName = "Carousels";

export default Carousels;
