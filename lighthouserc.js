/**
 * Lighthouse CI — mobile (Lighthouse's default preset: 4x CPU throttling and
 * simulated slow 4G).
 *
 * Thresholds are split on purpose. Accessibility and SEO are deterministic
 * audits that either pass or do not, so they are held at a flat 100 — the same
 * "verified, not claimed" standard as the Axe-core scans in the Playwright
 * suite. Performance is a timing measurement on a shared CI runner and moves a
 * few points between runs, so it gets a floor rather than an exact target;
 * pinning it to 100 would produce a badge that fails at random and gets
 * ignored.
 *
 * Best practices is held at a flat 100. It was previously capped at 0.95
 * because `@vercel/analytics` and `@vercel/speed-insights` requested
 * /_vercel/* script paths that only exist on a Vercel deployment, so a local
 * build 404'd and lost 4 points. Analytics is now PostHog, initialized from
 * src/instrumentation-client.ts and gated on NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN —
 * unset
 * in CI, so nothing third-party loads during the audit and the deduction is
 * gone.
 */
module.exports = {
  ci: {
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 1 }],
        "categories:best-practices": ["error", { minScore: 1 }],
        // Measured at 92 locally; the floor leaves room for runner noise.
        "categories:performance": ["error", { minScore: 0.85 }],
        "categories:seo": ["error", { minScore: 1 }],
      },
    },
    collect: {
      // Three runs, asserted against the median, to damp runner variance.
      numberOfRuns: 3,
      settings: {
        chromeFlags: "--no-sandbox --headless=new",
      },
      startServerCommand: "npm run start",
      url: ["http://localhost:3000/"],
    },
    upload: {
      outputDir: ".lighthouseci",
      target: "filesystem",
    },
  },
};
