import { MetadataRoute } from "next";

import { siteUrl } from "@/lib/utils";

export const dynamic = "force-static";

/**
 * Generates sitemap.xml for search engine indexing. Add an entry here for each
 * page you want search engines to find.
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
    {
      changeFrequency: "yearly",
      lastModified: new Date(),
      priority: 0.3,
      url: `${siteUrl}/privacy`,
    },
  ];
}
