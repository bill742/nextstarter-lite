import Link from "next/link";

import { Button } from "@/components/ui/button";
import { proUrl } from "@/lib/upsell";
import { cn } from "@/lib/utils";

/**
 * The orange gradient purchase button, shared by the hero and the closing CTA.
 *
 * @param children - The button label.
 * @param className - Extra classes merged onto the button (e.g. full width).
 * @returns A button linking out to the checkout.
 */
const ProCta = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <Button
    asChild
    size="lg"
    className={cn(
      "dark:to-coral-600 bg-linear-to-r from-orange-700 to-orange-600 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98] dark:from-orange-600",
      className
    )}
  >
    <Link href={proUrl} target="_blank" rel="noopener noreferrer">
      {children}
    </Link>
  </Button>
);

ProCta.displayName = "ProCta";

export default ProCta;
