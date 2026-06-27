import {
  SiEslint,
  SiGithubactions,
  SiNextdotjs,
  SiPrettier,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const icons = [
  {
    icon: SiNextdotjs,
    id: "1",
    label: "NextJS",
  },
  {
    icon: SiTypescript,
    id: "2",
    label: "TypeScript",
  },
  {
    icon: SiTailwindcss,
    id: "13",
    label: "Tailwind",
  },
  {
    icon: SiPrettier,
    id: "4",
    label: "Prettier",
  },
  {
    icon: SiEslint,
    id: "5",
    label: "ESLint",
  },
  {
    icon: VscVscode,
    id: "6",
    label: "VS Code",
  },
];

/**
 * Technology stack showcase component
 * Displays the tech stack used in the project with icons in both grid (desktop) and carousel (mobile) layouts
 * @returns Tech stack section with responsive icon display
 */
const Stack = () => {
  return (
    <>
      <section
        className="bg-stone-50/50 py-24 md:py-32 dark:bg-stone-900/30"
        id="stack"
      >
        <div className="mx-auto max-w-5xl px-6"></div>
        <div className="flex w-full flex-col gap-8">
          <h2 className="text-center font-serif text-3xl font-bold text-stone-900 md:text-4xl dark:text-stone-50">
            Tech Stack
          </h2>
          <ul className="hidden list-disc gap-8 text-lg md:grid md:grid-cols-3">
            {icons.map((icon) => (
              <li key={icon.id} className="flex flex-col items-center gap-2">
                <icon.icon size="80" role="img" aria-label={icon.label} />
                <span>{icon.label}</span>
              </li>
            ))}
          </ul>
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-50 self-center md:hidden md:max-w-lg"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {icons.map((icon) => (
                <CarouselItem
                  key={icon.id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center p-6 md:aspect-square">
                        <icon.icon
                          size="80"
                          role="img"
                          aria-label={icon.label}
                        />
                        <span className="mt-4 text-center text-lg font-medium">
                          {icon.label}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>
      <div className="mx-auto h-px w-full max-w-5xl bg-linear-to-r from-transparent via-stone-200 to-transparent dark:via-stone-800" />
    </>
  );
};

Stack.displayName = "Stack";

export default Stack;
