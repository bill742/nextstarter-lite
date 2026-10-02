import { siteUrl } from "./utils";

const SITE_URL = siteUrl;
const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME;

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

export const websiteSchema = {
  "@context": "https://schema.org",
  "@id": `${SITE_URL}/#website`,
  "@type": "WebSite",
  description: process.env.NEXT_PUBLIC_SITE_META_DESCRIPTION,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}/#organization` },
  url: SITE_URL,
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@id": `${SITE_URL}/#organization`,
  "@type": "Organization",
  name: SITE_NAME,
  // Profiles that identify this organization elsewhere (GitHub, LinkedIn, X…).
  // Search engines use them to tell you apart from others with the same name.
  sameAs: [] as string[],
  url: SITE_URL,
};
