/**
 * Lighthouse CI — desktop preset.
 *
 * Desktop is the configuration the README and marketing copy quote, so it is
 * held to a higher performance floor than mobile: production scores 100 across
 * all four categories, and a local desktop run scores 100 for performance.
 *
 * Deliberately standalone rather than importing lighthouserc.js — the repo's
 * ESLint config forbids `require()`, and duplicating four assertions is a
 * smaller cost than an ignore rule. Keep the two files in step.
 *
 * Best practices is held at a flat 100 for the same reason as in
 * lighthouserc.js: the Vercel analytics scripts that used to 404 in a local
 * build are gone, and PostHog stays uninitialized without a project key.
 */
module.exports = {
  ci: {
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 1 }],
        "categories:best-practices": ["error", { minScore: 1 }],
        // Measured at 100 locally on desktop.
        "categories:performance": ["error", { minScore: 0.95 }],
        "categories:seo": ["error", { minScore: 1 }],
      },
    },
    collect: {
      numberOfRuns: 3,
      settings: {
        chromeFlags: "--no-sandbox --headless=new",
        preset: "desktop",
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
