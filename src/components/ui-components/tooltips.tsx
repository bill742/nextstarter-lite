import { Info } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import Example, { Specimen, SpecimenList } from "./example";
import Section from "./section";
import { sections } from "./sections";

/** The four sides a tooltip can take, with the copy each one shows. */
const sides = [
  { label: "top", text: "Above the trigger" },
  { label: "right", text: "To the right" },
  { label: "bottom", text: "Below the trigger" },
  { label: "left", text: "To the left" },
] as const;

const sideCode = `import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline">Hover me</Button>
    </TooltipTrigger>
    <TooltipContent side="top">Above the trigger</TooltipContent>
  </Tooltip>
</TooltipProvider>`;

const iconCode = `{/* The trigger still needs its own name — the tooltip is not one */}
<Tooltip>
  <TooltipTrigger asChild>
    <Button size="icon-sm" variant="ghost">
      <Info aria-hidden="true" />
      <span className="sr-only">About the build</span>
    </Button>
  </TooltipTrigger>
  <TooltipContent>Built from the main branch</TooltipContent>
</Tooltip>`;

/**
 * The tooltip section.
 *
 * @returns `Tooltip` on each side, and on an icon-only trigger.
 */
const Tooltips = () => (
  <Section
    intro={
      <p>
        Radix underneath, so a tooltip opens on hover <em>and</em> on keyboard
        focus, closes on <kbd className="font-mono text-sm">Esc</kbd>, and is
        associated with its trigger for assistive technology. It is a hint about
        a control, never the control&rsquo;s only label — tab through the
        examples below rather than hovering them to see the difference.
      </p>
    }
    section={sections.tooltip}
  >
    <Example
      code={sideCode}
      description="A side is a preference, not a guarantee: Radix flips a tooltip that would fall outside the viewport."
      title="Sides"
    >
      <TooltipProvider>
        <SpecimenList>
          {sides.map((side) => (
            <Specimen key={side.label} label={`side="${side.label}"`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Hover me</Button>
                </TooltipTrigger>
                <TooltipContent side={side.label}>{side.text}</TooltipContent>
              </Tooltip>
            </Specimen>
          ))}
        </SpecimenList>
      </TooltipProvider>
    </Example>

    <Example
      code={iconCode}
      description="The pairing this component exists for — and the one most often got wrong. The trigger keeps its own accessible name; the tooltip adds detail."
      title="On an icon button"
    >
      <TooltipProvider>
        <SpecimenList>
          <Specimen label="icon trigger">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon-sm" variant="ghost">
                  <Info aria-hidden="true" />
                  <span className="sr-only">About the build</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Built from the main branch</TooltipContent>
            </Tooltip>
          </Specimen>
          <Specimen label="text trigger">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" variant="secondary">
                  Deploy
                </Button>
              </TooltipTrigger>
              <TooltipContent>Pushes to production immediately</TooltipContent>
            </Tooltip>
          </Specimen>
        </SpecimenList>
      </TooltipProvider>
    </Example>
  </Section>
);

Tooltips.displayName = "Tooltips";

export default Tooltips;
