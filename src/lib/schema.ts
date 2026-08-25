import { isUpsellEnabled } from "./upsell";
import { siteUrl } from "./utils";

const SITE_URL = siteUrl;
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;
const GITHUB_URL = "https://github.com/bill742/nextstarter-lite";
const NPM_URL = "https://www.npmjs.com/package/@bill742/create-nextstarter";
const X_URL = "";

/**
 * Characters that are legal in a JSON string but hostile inside a `<script>`
 * element. `<` is the only one that can actually close the tag, but escaping
 * `>` and `&` too keeps the payload inert in every HTML parsing context, and
 * U+2028/U+2029 are line terminators that older JavaScript parsers choke on.
 *
 * Each replacement is a standard JSON `\uXXXX` escape, so a parser reads back
 * exactly the same string — this changes the bytes in the HTML, never the data
 * a search engine sees.
 */
const HTML_ESCAPES: Record<string, string> = {
  "&": "\\u0026",
  "<": "\\u003c",
  ">": "\\u003e",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029",
};

/**
 * Serializes a schema object for a `<script type="application/ld+json">` tag.
 *
 * `JSON.stringify` alone does not HTML-escape, so any `</script>` reaching the
 * data — from an environment variable, or from page copy that flows into the
 * FAQ schema — would close the tag early and let whatever follows execute as
 * markup. Always use this instead of `JSON.stringify` for JSON-LD.
 *
 * @param schema - The structured-data object to serialize
 * @returns JSON with HTML-significant characters escaped
 */
export const jsonLd = (schema: object): string =>
  JSON.stringify(schema).replace(
    /[<>&\u2028\u2029]/g,
    (character) => HTML_ESCAPES[character]
  );

export const softwareSchema = {
  "@context": "https://schema.org",
  "@id": `${SITE_URL}/#software`,
  "@type": "SoftwareApplication",
  accessibilityFeature: [
    "structuralNavigation",
    "highContrastDisplay",
    "displayTransformability",
  ],
  accessibilityStandard: "WCAG 2.1 AA",
  alternateName: "NextStarter Next.js Boilerplate",
  applicationCategory: "DeveloperApplication",
  applicationSubCategory: "Web Application Framework",
  author: { "@id": `${SITE_URL}/#organization` },
  codeRepository: GITHUB_URL,
  description:
    "A free, accessible Next.js boilerplate with TypeScript, Tailwind CSS, shadcn/ui, and Playwright. WCAG 2.1 AA verified, with ESLint, Prettier, theming, and GitHub Actions CI preconfigured.",
  downloadUrl: NPM_URL,
  featureList: [
    "WCAG 2.1 AA accessibility verification",
    "TypeScript and Tailwind CSS configuration",
    "shadcn/ui component library with theming",
    "Light and dark theme support",
    "Playwright end-to-end testing",
    "ESLint and Prettier configuration",
    "GitHub Actions CI workflow",
    "Custom 404 page, robots.txt, and sitemap.xml",
    "VS Code integration and extensions",
  ],
  installUrl: NPM_URL,
  isAccessibleForFree: true,
  license: "https://opensource.org/licenses/MIT",
  name: SITE_NAME,
  offers: [
    {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      category: "Free",
      name: SITE_NAME,
      price: "0",
      priceCurrency: "USD",
      url: SITE_URL,
    },
    // The paid offer is only a truthful claim when there is something to buy,
    // so it drops out with the rest of the upsell surface.
    ...(isUpsellEnabled
      ? [
          {
            "@type": "Offer",
            availability: "https://schema.org/InStock",
            category: "One-time purchase, lifetime access",
            description:
              "Clerk authentication, Prisma and PostgreSQL, Stripe subscriptions, Resend email, admin dashboard, MDX blog, internationalization with RTL support, security headers, rate limiting, analytics, and error tracking.",
            name: "NextStarter Pro",
            price: "199",
            priceCurrency: "USD",
            url: `${SITE_URL}/pro`,
          },
        ]
      : []),
  ],

  operatingSystem: "Any",

  programmingLanguage: ["TypeScript", "JavaScript"],

  publisher: { "@id": `${SITE_URL}/#organization` },
  // Matches .node-version and the README. Next.js 16 dropped Node 18 (its hard
  // floor is 20.9), so this is a factual claim search engines read — keep it in
  // step with the runtime the project actually supports.
  softwareRequirements: "Node.js 22 or later",
  url: SITE_URL,
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@id": `${SITE_URL}/#organization`,
  "@type": "Organization",
  description:
    "NextStarter builds free and premium Next.js boilerplates for developers who need accessible, production-ready foundations.",
  logo: `${SITE_URL}/icon.png`,
  name: SITE_NAME,
  // sameAs is the disambiguation lever — see note below
  sameAs: [GITHUB_URL, NPM_URL, X_URL].filter(Boolean),
  url: SITE_URL,
};
