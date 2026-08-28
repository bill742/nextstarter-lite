import type { NextConfig } from "next";

import { posthogAssetsHost, posthogUpstreamHost } from "./src/lib/analytics";

const nextConfig: NextConfig = {
  // Next generates AGENTS.md and CLAUDE.md on `next dev` to brief coding
  // agents on its own conventions. This project keeps its agent instructions
  // elsewhere, and the regenerated files only showed up as untracked noise in
  // `git status` after every dev run.
  agentRules: false,
  /**
   * Same-origin proxy for PostHog.
   *
   * The browser talks to /ingest on this domain and Next forwards it, so no
   * request carries a PostHog hostname for a blocklist to match. Without this,
   * every visitor running uBlock, Brave shields, Firefox strict mode, or a
   * blocking DNS resolver is simply missing from the numbers.
   *
   * Order matters: /static and /array serve the SDK bundle and its remote
   * config from the assets host, which is a different origin from event
   * ingestion. The catch-all has to come last or it swallows both.
   */
  async rewrites() {
    return [
      {
        destination: `${posthogAssetsHost}/static/:path*`,
        source: "/ingest/static/:path*",
      },
      {
        destination: `${posthogAssetsHost}/array/:path*`,
        source: "/ingest/array/:path*",
      },
      {
        destination: `${posthogUpstreamHost}/:path*`,
        source: "/ingest/:path*",
      },
    ];
  },
  /**
   * PostHog's ingestion endpoints have significant trailing slashes (`/i/v0/e/`).
   * Next's default is to redirect those to the slash-less form, which turns
   * every event POST into a redirect the SDK does not follow.
   */
  skipTrailingSlashRedirect: true,
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
