import { MetadataRoute } from "next";

import { siteUrl } from "@/lib/utils";

export const dynamic = "force-static";

/**
 * Generates robots.txt configuration for search engine crawlers
 * @returns Robots metadata route configuration
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      disallow: [],
      userAgent: "*",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
