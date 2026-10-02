import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Example from "./example";
import Section from "./section";
import { sections } from "./sections";

const anatomyCode = `import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Accessibility, verified</CardTitle>
    <CardDescription>Axe-core runs over every page on every push.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Light and dark are both scanned…</p>
  </CardContent>
  <CardFooter className="border-t">
    <Button size="sm" variant="outline">Read the report</Button>
  </CardFooter>
</Card>`;

const actionCode = `{/* CardAction moves itself into the header's second column */}
<CardHeader className="border-b">
  <CardTitle>Deployment</CardTitle>
  <CardDescription>Last shipped 4 minutes ago</CardDescription>
  <CardAction>
    <Button size="icon-sm" variant="ghost">
      <MoreHorizontal aria-hidden="true" />
      <span className="sr-only">Deployment options</span>
    </Button>
  </CardAction>
</CardHeader>`;

const surfaceCode = `{/* No header, no footer — Card is just the surface */}
<Card className="gap-2 py-5">
  <CardContent>
    <p className="text-2xl font-bold">98</p>
    <p className="text-sm text-muted-foreground">Lighthouse, mobile</p>
  </CardContent>
</Card>`;

/** The three figures in the stat example. */
const stats = [
  { label: "Lighthouse, mobile", value: "98" },
  { label: "Axe violations", value: "0" },
  { label: "First load JS", value: "112 kB" },
];

/**
 * The card section.
 *
 * @returns The anatomy of `Card` and two ways of composing it.
 */
const Cards = () => (
  <Section
    intro={
      <p>
        Seven parts that compose rather than one component with a dozen props.
        Use only the parts you need — a card with nothing but{" "}
        <code className="font-mono text-sm">CardContent</code> inside it is a
        perfectly ordinary use of it. Colours come from the{" "}
        <code className="font-mono text-sm">card</code> tokens, so cards invert
        with the theme on their own.
      </p>
    }
    section={sections.card}
  >
    <Example
      code={anatomyCode}
      description="Header, content, and footer. The footer takes its top border from a plain border-t; the padding follows automatically."
      title="Anatomy"
    >
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Accessibility, verified</CardTitle>
          <CardDescription>
            Axe-core runs over every page on every push.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            Light and dark are both scanned, because a contrast failure that
            only exists in one theme is still a failure.
          </p>
        </CardContent>
        <CardFooter className="border-t">
          <Button size="sm" variant="outline">
            Read the report
          </Button>
        </CardFooter>
      </Card>
    </Example>

    <Example
      code={actionCode}
      description="CardAction places a control in the top-right of the header, and the header switches to a two-column grid to make room for it."
      title="With an action"
    >
      <Card className="max-w-md">
        <CardHeader className="border-b">
          <CardTitle>Deployment</CardTitle>
          <CardDescription>Last shipped 4 minutes ago</CardDescription>
          <CardAction>
            <Button size="icon-sm" variant="ghost">
              <MoreHorizontal aria-hidden="true" />
              <span className="sr-only">Deployment options</span>
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
            Production is running commit{" "}
            <code className="font-mono">04acb83</code> on the main branch.
          </p>
        </CardContent>
      </Card>
    </Example>

    <Example
      code={surfaceCode}
      description="Dropping the header and tightening the padding turns the same component into a bare surface."
      title="As a plain surface"
    >
      <ul className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <li key={stat.label}>
            <Card className="gap-2 py-5">
              <CardContent>
                <p className="text-2xl font-bold text-stone-900 dark:text-stone-50">
                  {stat.value}
                </p>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </Example>
  </Section>
);

Cards.displayName = "Cards";

export default Cards;
