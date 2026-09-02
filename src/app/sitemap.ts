import { MetadataRoute } from "next";

import { hasUpdates } from "@/lib/changelog";
import { isUpsellEnabled } from "@/lib/upsell";
import { siteUrl } from "@/lib/utils";

export const dynamic = "force-static";

/**
 * Generates sitemap.xml for search engine indexing
 * @returns Promise resolving to sitemap metadata route configuration
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      changeFrequency: "weekly",
      lastModified: new Date(),
      priority: 1,
      url: `${siteUrl}/`,
    },
    // Tracks the same gate as the route itself, which 404s with no updates.
    ...(hasUpdates
      ? [
          {
            changeFrequency: "monthly" as const,
            lastModified: new Date(),
            priority: 0.6,
            url: `${siteUrl}/whats-new`,
          },
        ]
      : []),
    {
      changeFrequency: "yearly",
      lastModified: new Date(),
      priority: 0.3,
      url: `${siteUrl}/privacy`,
    },
    // Listing /pro while it 404s would be a crawl error, so it tracks the gate.
    ...(isUpsellEnabled
      ? [
          {
            changeFrequency: "monthly" as const,
            lastModified: new Date(),
            priority: 0.9,
            url: `${siteUrl}/pro`,
          },
        ]
      : []),
  ];
}
