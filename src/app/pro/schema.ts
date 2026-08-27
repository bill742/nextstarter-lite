import { faqSections } from "@/lib/faq";
import { siteUrl } from "@/lib/utils";

/**
 * FAQPage markup for /pro, generated from the same data the page renders
 * (see lib/faq.ts) so the structured data always matches the visible content.
 *
 * Note: Google restricted FAQ rich results to government and health sites in
 * 2023, so this is not expected to produce rich snippets. It is here for
 * correctness and to help search engines parse the question-shaped content.
 */
export const faqSchema = {
  "@context": "https://schema.org",
  "@id": `${siteUrl}/pro#faq`,
  "@type": "FAQPage",
  mainEntity: faqSections.flatMap((section) =>
    section.items.map((item) => ({
      "@type": "Question",
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
      name: item.question,
    }))
  ),
};

/**
 * Breadcrumb trail for /pro (Home → Pro).
 *
 * The SoftwareApplication entity in this file is global and already carries
 * both the free and Pro offers, so /pro deliberately does NOT declare a second
 * product entity — two entities describing one product with different @ids
 * confuses search engines rather than informing them.
 */
export const proBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      item: siteUrl,
      name: "Home",
      position: 1,
    },
    {
      "@type": "ListItem",
      item: `${siteUrl}/pro`,
      name: "Pro",
      position: 2,
    },
  ],
};
