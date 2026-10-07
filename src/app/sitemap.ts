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
    // Ungated: the route exists in any configuration of this site. The blank
    // starter deletes the route and replaces this sitemap.
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 0.7,
      url: `${siteUrl}/ui-components`,
    },
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
