import { ArrowRight, Download, Plus, Star, Trash2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

import Example, { Specimen, SpecimenList } from "./example";
import Section from "./section";
import { sections } from "./sections";

/** The `variant` values, in the order they escalate in emphasis. */
const variants = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "link",
  "destructive",
] as const;

/** The text sizes. `icon-*` are shown separately, with icons in them. */
const sizes = ["xs", "sm", "default", "lg"] as const;

/**
 * The icon-only sizes, each with the icon and the accessible name it gets.
 *
 * An icon button has no text, so it has to carry its name some other way — here
 * a visually hidden span. Leave that out and the button is announced as
 * "button", which is the single most common accessibility defect in a component
 * library.
 */
const iconSizes = [
  { Icon: Plus, label: "Add", size: "icon-xs" },
  { Icon: Download, label: "Download", size: "icon-sm" },
  { Icon: Star, label: "Favourite", size: "icon" },
  { Icon: Trash2, label: "Delete", size: "icon-lg" },
] as const;

const variantCode = `import { Button } from "@/components/ui/button";

<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Destructive</Button>`;

const sizeCode = `<Button size="xs">Extra small</Button>
<Button size="sm">Small</Button>
<Button>Default</Button>
<Button size="lg">Large</Button>`;

const iconCode = `{/* Icon-only: the name lives in a visually hidden span */}
<Button size="icon" variant="outline">
  <Star aria-hidden="true" />
  <span className="sr-only">Favourite</span>
</Button>

{/* With a label, the icon is decoration and is hidden from assistive tech */}
<Button>
  <Download aria-hidden="true" />
  Download
</Button>`;

const stateCode = `<Button disabled>Disabled</Button>
<Button aria-invalid="true" variant="outline">Invalid</Button>

{/* asChild hands the styling to the child, so a link stays a link */}
<Button asChild>
  <Link href="/">
    Home page
    <ArrowRight aria-hidden="true" />
  </Link>
</Button>`;

/**
 * The button section.
 *
 * @returns Every variant, size, and state of `Button`.
 */
const Buttons = () => (
  <Section
    intro={
      <p>
        One component,{" "}
        <code className="font-mono text-sm">class-variance-authority</code> for
        the variants, and a <code className="font-mono text-sm">Slot</code> from
        Radix behind <code className="font-mono text-sm">asChild</code> so a
        button&rsquo;s styling can be handed to a link. Every one below is
        focusable. Tab through them to see the focus ring the whole system
        shares.
      </p>
    }
    section={sections.button}
  >
    <Example
      code={variantCode}
      description="Six levels of emphasis. One default per view is the rule of thumb; destructive is reserved for actions that lose data."
      title="Variants"
    >
      <SpecimenList>
        {variants.map((variant) => (
          <Specimen key={variant} label={variant}>
            <Button variant={variant}>
              {variant === "destructive" ? "Delete" : "Get started"}
            </Button>
          </Specimen>
        ))}
      </SpecimenList>
    </Example>

    <Example
      code={sizeCode}
      description="Four text sizes. The height is fixed per size and the padding tightens when the button contains an icon."
      title="Sizes"
    >
      <SpecimenList>
        {sizes.map((size) => (
          <Specimen key={size} label={size}>
            <Button size={size}>Button</Button>
          </Specimen>
        ))}
      </SpecimenList>
    </Example>

    <Example
      code={iconCode}
      description="Square sizes for icon-only buttons, and icons alongside a label. Icons inside a button are sized automatically."
      title="With icons"
    >
      <div className="space-y-8">
        <SpecimenList>
          {iconSizes.map(({ Icon, label, size }) => (
            <Specimen key={size} label={size}>
              <Button size={size} variant="outline">
                <Icon aria-hidden="true" />
                <span className="sr-only">{label}</span>
              </Button>
            </Specimen>
          ))}
        </SpecimenList>

        <SpecimenList>
          <Specimen label="leading icon">
            <Button>
              <Download aria-hidden="true" />
              Download
            </Button>
          </Specimen>
          <Specimen label="trailing icon">
            <Button variant="secondary">
              Continue
              <ArrowRight aria-hidden="true" />
            </Button>
          </Specimen>
        </SpecimenList>
      </div>
    </Example>

    <Example
      code={stateCode}
      description="Disabled drops to half opacity and stops pointer events. aria-invalid tints the ring, which is how a button that failed validation reports it."
      title="States and asChild"
    >
      <SpecimenList>
        <Specimen label="disabled">
          <Button disabled>Disabled</Button>
        </Specimen>
        <Specimen label="disabled outline">
          <Button disabled variant="outline">
            Disabled
          </Button>
        </Specimen>
        <Specimen label="aria-invalid">
          <Button aria-invalid="true" variant="outline">
            Invalid
          </Button>
        </Specimen>
        <Specimen label="asChild - renders an anchor">
          <Button asChild>
            <Link href="/">
              Home page
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </Specimen>
      </SpecimenList>
    </Example>
  </Section>
);

Buttons.displayName = "Buttons";

export default Buttons;
