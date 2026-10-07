import { cn } from "@/lib/utils";

import Example from "./example";
import Section from "./section";
import { sections } from "./sections";

type SwatchToken = {
  /** The Tailwind background class. Written out in full, because Tailwind
   *  scans source text and cannot see a class assembled at runtime. */
  className: string;
  /** What to call it in the label. */
  name: string;
  /** The value from `globals.css`, for the times you need it outside Tailwind. */
  value?: string;
};

/**
 * The neutral ramp. Everything that is not an accent is built from this.
 *
 * The hex values mirror the `@theme` block in `src/app/globals.css` — that file
 * is the source of truth, this is the readable copy of it.
 */
const stone: SwatchToken[] = [
  { className: "bg-stone-50", name: "stone-50", value: "#fafaf9" },
  { className: "bg-stone-100", name: "stone-100", value: "#f5f5f4" },
  { className: "bg-stone-200", name: "stone-200", value: "#e7e5e4" },
  { className: "bg-stone-300", name: "stone-300", value: "#d6d3d1" },
  { className: "bg-stone-400", name: "stone-400", value: "#a8a29e" },
  { className: "bg-stone-500", name: "stone-500", value: "#78716c" },
  { className: "bg-stone-600", name: "stone-600", value: "#57534e" },
  { className: "bg-stone-700", name: "stone-700", value: "#44403c" },
  { className: "bg-stone-800", name: "stone-800", value: "#292524" },
  { className: "bg-stone-900", name: "stone-900", value: "#1c1917" },
  { className: "bg-stone-950", name: "stone-950", value: "#0c0a09" },
];

/** The accent ramp. Used sparingly: links, hovers, and the active state. */
const orange: SwatchToken[] = [
  { className: "bg-orange-50", name: "orange-50", value: "#fff7ed" },
  { className: "bg-orange-100", name: "orange-100", value: "#ffedd5" },
  { className: "bg-orange-200", name: "orange-200", value: "#fed7aa" },
  { className: "bg-orange-300", name: "orange-300", value: "#fdba74" },
  { className: "bg-orange-400", name: "orange-400", value: "#fb923c" },
  { className: "bg-orange-500", name: "orange-500", value: "#f97316" },
  { className: "bg-orange-600", name: "orange-600", value: "#ea580c" },
  { className: "bg-orange-700", name: "orange-700", value: "#c2410c" },
  { className: "bg-orange-800", name: "orange-800", value: "#9a3412" },
  { className: "bg-orange-900", name: "orange-900", value: "#7c2d12" },
  { className: "bg-orange-950", name: "orange-950", value: "#431407" },
];

/**
 * The semantic tokens the `ui` components are written against.
 *
 * These are the ones that move: each is redefined under `.dark`, which is how
 * a component styled with `bg-card text-card-foreground` inverts without a
 * single `dark:` variant of its own. The swatches below therefore change when
 * you flip the theme toggle — that is the point of them.
 */
const semantic: SwatchToken[] = [
  { className: "bg-background", name: "background" },
  { className: "bg-foreground", name: "foreground" },
  { className: "bg-card", name: "card" },
  { className: "bg-popover", name: "popover" },
  { className: "bg-primary", name: "primary" },
  { className: "bg-secondary", name: "secondary" },
  { className: "bg-muted", name: "muted" },
  { className: "bg-accent", name: "accent" },
  { className: "bg-destructive", name: "destructive" },
  { className: "bg-border", name: "border" },
  { className: "bg-input", name: "input" },
  { className: "bg-ring", name: "ring" },
];

/** The chart ramp, five hues that stay distinguishable side by side. */
const chart: SwatchToken[] = [
  { className: "bg-chart-1", name: "chart-1" },
  { className: "bg-chart-2", name: "chart-2" },
  { className: "bg-chart-3", name: "chart-3" },
  { className: "bg-chart-4", name: "chart-4" },
  { className: "bg-chart-5", name: "chart-5" },
];

/**
 * A swatch with its name, and its value where there is a fixed one.
 *
 * The label sits under the block rather than inside it, so no swatch has to
 * carry legible text on top of an arbitrary colour.
 *
 * @param swatch - The colour to show.
 * @returns A labelled swatch.
 */
const Swatch = ({ className, name, value }: SwatchToken) => (
  <li>
    <div
      className={cn(
        "h-14 rounded-lg border border-stone-900/10 dark:border-white/15",
        className
      )}
    />
    <p className="mt-2 font-mono text-xs text-stone-700 dark:text-stone-300">
      {name}
    </p>
    {value ? (
      <p className="font-mono text-xs text-stone-500 dark:text-stone-400">
        {value}
      </p>
    ) : null}
  </li>
);

Swatch.displayName = "Swatch";

/**
 * A grid of swatches.
 *
 * @param swatches - The colours to lay out.
 * @returns A responsive grid.
 */
const Swatches = ({ swatches }: { swatches: SwatchToken[] }) => (
  <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
    {swatches.map((swatch) => (
      <Swatch key={swatch.name} {...swatch} />
    ))}
  </ul>
);

Swatches.displayName = "Swatches";

const paletteCode = `/* src/app/globals.css */
@theme {
  --color-stone-600: #57534e;
  --color-orange-700: #c2410c;
}

{/* Anywhere in a component */}
<p className="text-stone-600 dark:text-stone-400">Body copy</p>
<a className="hover:text-orange-700 dark:hover:text-orange-400">A link</a>`;

const semanticCode = `/* src/app/globals.css - one definition per theme */
@theme {
  --color-card: #ffffff;
  --color-card-foreground: hsl(222.2, 84%, 4.9%);
}

.dark {
  --color-card: hsl(222.2, 84%, 4.9%);
  --color-card-foreground: hsl(210, 40%, 98%);
}

{/* The component needs no dark: variant of its own */}
<div className="bg-card text-card-foreground">…</div>`;

/**
 * The colour section.
 *
 * @returns The palette and the semantic tokens.
 */
const Colors = () => (
  <Section
    intro={
      <p>
        Every colour is defined in{" "}
        <code className="font-mono text-sm">src/app/globals.css</code>. Stone, a
        neutral grey, is used for most of the interface, and orange is kept for
        the few things that should stand out. The components in{" "}
        <code className="font-mono text-sm">src/components/ui</code> don&rsquo;t
        use those shades directly. They use named tokens such as{" "}
        <code className="font-mono text-sm">card</code> and{" "}
        <code className="font-mono text-sm">border</code>, which describe what a
        colour is for, so changing a token restyles every component that uses
        it.
      </p>
    }
    section={sections.color}
  >
    <Example
      code={paletteCode}
      description="The neutral ramp. Page backgrounds, borders, and every level of text."
      title="Stone"
    >
      <Swatches swatches={stone} />
    </Example>

    <Example
      code={paletteCode}
      description="The accent. Links, hover states, and the active item in a navigation."
      title="Orange"
    >
      <Swatches swatches={orange} />
    </Example>

    <Example
      code={semanticCode}
      description="Each token has one value for light mode and another for dark mode, so these swatches change when you switch themes. A component built with these tokens works in both modes without any dark: classes of its own."
      title="Semantic tokens"
    >
      <Swatches swatches={semantic} />
    </Example>

    <Example
      code={`<span className="bg-chart-1" />`}
      description="Five hues that stay distinguishable beside one another, for data visualisation."
      title="Chart"
    >
      <Swatches swatches={chart} />
    </Example>
  </Section>
);

Colors.displayName = "Colors";

export default Colors;
