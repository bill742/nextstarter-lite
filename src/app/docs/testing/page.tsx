import DocsArticle from "@/components/docs/docs-article";
import {
  Code,
  CodeBlock,
  DocsLink,
  DocsSection,
  Note,
  ReferenceList,
} from "@/components/docs/prose";
import { getDocsMetadata } from "@/lib/docs";

const HREF = "/docs/testing";

export const metadata = getDocsMetadata(HREF);

/**
 * Testing and CI: the Playwright suite, the accessibility scans, Lighthouse,
 * and the GitHub Actions jobs.
 *
 * @returns The testing page.
 */
const Testing = () => (
  <DocsArticle href={HREF}>
    <DocsSection id="playwright" title="End-to-end tests">
      <p>
        The tests are{" "}
        <DocsLink href="https://playwright.dev/">Playwright</DocsLink> specs in{" "}
        <Code>tests/</Code>, named <Code>*.spec.ts</Code>. They run in Chromium,
        Firefox, and WebKit.
      </p>
      <CodeBlock
        code={`npm run test                              # every spec, every browser
npx playwright test --project=chromium    # one browser
npx playwright test tests/privacy-page.spec.ts   # one spec
npx playwright show-report                # open the last HTML report`}
      />
      <p>
        Playwright serves the production build with <Code>npm run start</Code>,
        so run <Code>npm run build</Code> first. Locally it reuses a server that
        is already running on port 3000, including <Code>npm run dev</Code>. It
        loads <Code>.env</Code> as well, so the tests see the same configuration
        as the app.
      </p>
      <p>
        Specs for optional features follow the configuration. A spec that needs
        a variable you have not set skips itself instead of failing, so the
        suite passes with no keys.
      </p>
    </DocsSection>

    <DocsSection id="accessibility" title="Accessibility scans">
      <p>
        Every page spec runs an{" "}
        <DocsLink href="https://github.com/dequelabs/axe-core">
          Axe-core
        </DocsLink>{" "}
        scan in light mode, switches to dark mode with the theme toggle, and
        scans again. Any violation fails the test. Copy the pattern from an
        existing spec when you add a page:
      </p>
      <CodeBlock
        code={`import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("has no detectable accessibility issues", async ({ page }) => {
  await page.goto("/your-page");

  const light = await new AxeBuilder({ page }).analyze();
  expect(light.violations).toEqual([]);

  await page.locator("#themeToggle").first().click();
  // The click can leave the toggle focused with its tooltip mid-animation.
  // Drop focus and wait for it to close so the scan sees a stable page.
  await page.locator("#themeToggle").first().blur();
  await expect(page.getByRole("tooltip")).toHaveCount(0);

  const dark = await new AxeBuilder({ page }).analyze();
  expect(dark.violations).toEqual([]);
});`}
      />
      <p>
        An automated scan cannot catch every WCAG failure. Keep using semantic
        HTML, label every control, and check that new UI works with a keyboard
        alone.
      </p>
    </DocsSection>

    <DocsSection id="lighthouse" title="Lighthouse">
      <p>
        Lighthouse CI audits the home page against a production build, three
        times per preset, and asserts against the median. Accessibility, best
        practices, and SEO must score a flat 100. Performance has a floor of 85,
        because it is a timing measurement on a shared runner and moves a few
        points between runs. The thresholds are in <Code>lighthouserc.js</Code>{" "}
        (mobile) and <Code>lighthouserc.desktop.js</Code>.
      </p>
      <CodeBlock
        code={`npm run build
npm run lighthouse           # mobile preset
npm run lighthouse:desktop   # desktop preset`}
      />
    </DocsSection>

    <DocsSection id="ci" title="Continuous integration">
      <p>
        One GitHub Actions workflow, <Code>.github/workflows/ci.yml</Code>, runs
        on every push to <Code>main</Code>, on every pull request into it, and
        on demand. Every job reads its Node version from{" "}
        <Code>.node-version</Code>.
      </p>
      <ReferenceList
        items={[
          {
            description:
              "ESLint, with the results uploaded to the repository's Security tab. Also runs weekly.",
            name: "eslint",
          },
          {
            description: (
              <>
                <Code>npm audit signatures</Code>, then a check for high or
                critical advisories. Also runs weekly, to catch a package
                revoked after it reached the lockfile.
              </>
            ),
            name: "supply-chain",
          },
          {
            description: <Code>npm run typecheck</Code>,
            name: "typecheck",
          },
          {
            description:
              "Checks the code against the project's conventions and comments the report on pull requests.",
            name: "code-review",
          },
          {
            description:
              "A React Doctor scan. Advisory: it comments on pull requests but never fails the build.",
            name: "react-doctor",
          },
          {
            description:
              "Builds the site and runs the Playwright suite in all three browsers.",
            name: "test",
          },
          {
            description: "Lighthouse CI, mobile and desktop.",
            name: "lighthouse",
          },
        ]}
      />
      <p>
        The build needs the site variables. See{" "}
        <DocsLink href="/docs/environment-variables#ci">
          Environment Variables → In CI
        </DocsLink>
        .
      </p>
      <Note title="Bump the Playwright image with Playwright">
        <p>
          The test job runs inside Playwright&rsquo;s official container image,
          which has the browsers built in. The image tag (such as{" "}
          <Code>mcr.microsoft.com/playwright:v1.62.1-noble</Code>) must match
          the <Code>@playwright/test</Code> version in <Code>package.json</Code>
          . When you upgrade the package, update the tag in <Code>ci.yml</Code>{" "}
          too, or no browser will launch.
        </p>
      </Note>
    </DocsSection>

    <DocsSection id="before-committing" title="Before committing">
      <p>The full local check matches CI:</p>
      <CodeBlock
        code={`npm run lint
npm run typecheck
npm run build
npm run test`}
      />
    </DocsSection>
  </DocsArticle>
);

Testing.displayName = "Testing";

export default Testing;
