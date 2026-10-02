import Example from "./example";
import Section from "./section";
import { sections } from "./sections";

type TypeStep = {
  /** The classes that produce the step, applied to the sample. */
  className: string;
  /** Where the step is used. */
  role: string;
  /** The words shown in the sample. */
  sample: string;
};

/**
 * The type scale, largest first.
 *
 * Headings are set in the serif display face and body copy in the sans stack —
 * the contrast between the two is doing the work that a second accent colour
 * would otherwise have to do.
 */
const scale: TypeStep[] = [
  {
    className: "font-serif text-3xl font-bold md:text-4xl",
    role: "h1 — one per page",
    sample: "Ship accessible Next.js apps",
  },
  {
    className: "font-serif text-2xl font-bold md:text-3xl",
    role: "h2 — section heading",
    sample: "What you get",
  },
  {
    className: "text-lg font-medium",
    role: "h3 — subsection heading",
    sample: "Tested on every push",
  },
  {
    className: "text-lg leading-relaxed",
    role: "Lead paragraph",
    sample: "The introduction that follows a page title.",
  },
  {
    className: "leading-relaxed",
    role: "Body",
    sample: "The default: 16px, relaxed leading, stone-600 on light.",
  },
  {
    className: "text-sm",
    role: "Small — captions, meta",
    sample: "Updated 17 September 2026",
  },
  {
    className: "font-mono text-sm",
    role: "Mono — code and values",
    sample: "npx create-next-app",
  },
];

/**
 * One row of the scale: the sample set in the step, with the classes that
 * produced it beside it.
 *
 * @param step - The step to render.
 * @returns A list item pairing a sample with its classes.
 */
const Step = ({ className, role, sample }: TypeStep) => (
  <li className="flex flex-col gap-2 border-b border-stone-200 pb-6 last:border-0 last:pb-0 md:flex-row md:items-baseline md:justify-between md:gap-8 dark:border-stone-800">
    <p className={`${className} text-stone-900 dark:text-stone-50`}>{sample}</p>

    <div className="shrink-0 md:text-right">
      <p className="text-sm text-stone-600 dark:text-stone-400">{role}</p>
      <p className="font-mono text-xs text-stone-500 dark:text-stone-400">
        {className}
      </p>
    </div>
  </li>
);

Step.displayName = "Step";

const scaleCode = `<h1 className="font-serif text-3xl font-bold md:text-4xl">Page title</h1>
<h2 className="font-serif text-2xl font-bold md:text-3xl">Section</h2>
<p className="text-lg leading-relaxed text-stone-600 dark:text-stone-300">
  A lead paragraph.
</p>
<p className="leading-relaxed text-stone-600 dark:text-stone-400">Body copy.</p>`;

const familyCode = `// src/app/layout.tsx
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "700"],
});

<body className={\`\${geistSans.variable} \${geistMono.variable} antialiased\`}>

{/* Reach for a family explicitly where it matters */}
<code className="font-mono text-sm">npm run dev</code>
<span className="font-(family-name:var(--font-geist-sans))">Geist Sans</span>`;

/**
 * The typography section.
 *
 * @returns The type scale and the font families.
 */
const Typography = () => (
  <Section
    intro={
      <p>
        A serif display face for headings against a sans body, and a single mono
        for code. The scale below is the one the rest of the site is built from
        — matching it is what makes a new page look like it belongs.
      </p>
    }
    section={sections.typography}
  >
    <Example
      code={scaleCode}
      description="Seven steps, largest first. Headings scale up at the md breakpoint; body copy does not."
      title="Type scale"
    >
      <ul className="space-y-6">
        {scale.map((step) => (
          <Step key={step.role} {...step} />
        ))}
      </ul>
    </Example>

    <Example
      code={familyCode}
      description="Geist Sans and Geist Mono are loaded by next/font in the root layout and exposed as CSS variables; the serif is the system stack, so it costs nothing to download."
      title="Font families"
    >
      <ul className="grid gap-6 sm:grid-cols-3">
        <li>
          <p className="font-(family-name:var(--font-geist-sans)) text-2xl text-stone-900 dark:text-stone-50">
            Ag 123
          </p>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Geist Sans
          </p>
          <p className="font-mono text-xs text-stone-500 dark:text-stone-400">
            --font-geist-sans
          </p>
        </li>
        <li>
          <p className="font-mono text-2xl text-stone-900 dark:text-stone-50">
            Ag 123
          </p>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Geist Mono
          </p>
          <p className="font-mono text-xs text-stone-500 dark:text-stone-400">
            --font-geist-mono
          </p>
        </li>
        <li>
          <p className="font-serif text-2xl text-stone-900 dark:text-stone-50">
            Ag 123
          </p>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
            Serif display
          </p>
          <p className="font-mono text-xs text-stone-500 dark:text-stone-400">
            font-serif
          </p>
        </li>
      </ul>
    </Example>
  </Section>
);

Typography.displayName = "Typography";

export default Typography;
