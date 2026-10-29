import DocsArticle from "@/components/docs/docs-article";
import {
  Code,
  CodeBlock,
  DocsLink,
  DocsSection,
  ReferenceList,
} from "@/components/docs/prose";
import { getDocsMetadata } from "@/lib/docs";

const HREF = "/docs/getting-started";

export const metadata = getDocsMetadata(HREF);

/**
 * Getting started: requirements, scaffolding, the two starting points, and the
 * first run.
 *
 * @returns The getting started page.
 */
const GettingStarted = () => (
  <DocsArticle href={HREF}>
    <DocsSection id="requirements" title="Requirements">
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong className="text-stone-900 dark:text-stone-200">
            Node.js 24.
          </strong>{" "}
          The version is pinned in <Code>.node-version</Code>, which{" "}
          <Code>nvm</Code>, <Code>fnm</Code>, <Code>asdf</Code>, and most other
          version managers read automatically.
        </li>
        <li>
          <strong className="text-stone-900 dark:text-stone-200">npm</strong>,
          since the project ships a <Code>package-lock.json</Code>. pnpm, bun,
          and yarn also work.
        </li>
        <li>
          <strong className="text-stone-900 dark:text-stone-200">Git.</strong>
        </li>
      </ul>
    </DocsSection>

    <DocsSection id="scaffold" title="1. Create a project">
      <CodeBlock
        code={`npx @bill742/create-nextstarter my-project
cd my-project`}
      />
      <p>The CLI asks three questions:</p>
      <ol className="list-decimal space-y-2 pl-6">
        <li>
          <strong className="text-stone-900 dark:text-stone-200">
            Starting point
          </strong>
          : <Code>blank</Code> or <Code>full</Code>. See{" "}
          <DocsLink href="#starting-points">Choosing a starting point</DocsLink>{" "}
          below.
        </li>
        <li>
          <strong className="text-stone-900 dark:text-stone-200">
            Site name
          </strong>
          , which is written to <Code>NEXT_PUBLIC_SITE_NAME</Code> in{" "}
          <Code>.env</Code>.
        </li>
        <li>
          <strong className="text-stone-900 dark:text-stone-200">
            Package manager
          </strong>
          : npm (the default), pnpm, bun, or yarn. Enter <Code>n</Code> to skip
          installing dependencies.
        </li>
      </ol>
      <p>
        Pass <Code>--blank</Code> or <Code>--full</Code> to skip the first
        question. The CLI clones the template, removes its git history, applies
        your starting point, copies <Code>.env.example</Code> to{" "}
        <Code>.env</Code>, and installs dependencies. The project has no git
        history yet, so run <Code>git init</Code> when you are ready to commit.
      </p>
    </DocsSection>

    <DocsSection id="starting-points" title="Choosing a starting point">
      <ReferenceList
        items={[
          {
            description: (
              <>
                An empty home page inside the app shell: header, footer, light
                and dark theme, privacy notice, 404 page, tests, and CI. Start
                here if you already know what your site looks like. The home
                page is <Code>src/app/page.tsx</Code>.
              </>
            ),
            name: "blank",
            tag: "Default",
          },
          {
            description: (
              <>
                The NextStarter landing page, the <Code>/ui-components</Code>{" "}
                catalogue, and these docs, all kept as example content to adapt.
                Start here if you would rather edit a working page than begin
                from nothing.
              </>
            ),
            name: "full",
          },
        ]}
      />
      <p>
        Both modes remove the content that belongs to NextStarter&rsquo;s own
        site: the Pro sales pages, the changelog behind <Code>/whats-new</Code>,
        and this site&rsquo;s metadata. The rules for that live in{" "}
        <Code>.nextstarter/</Code>. If you clone the repository by hand instead,
        you get the unmodified site. Run{" "}
        <Code>node .nextstarter/apply.mjs blank</Code> (or <Code>full</Code>) to
        do the same cleanup yourself. It deletes itself afterwards, so it only
        runs once.
      </p>
    </DocsSection>

    <DocsSection id="run" title="2. Run it locally">
      <CodeBlock code="npm run dev" />
      <p>
        Open <Code>http://localhost:3000</Code>. The dev server uses Turbopack
        and reloads as you edit. With no keys in <Code>.env</Code> everything
        renders. Analytics stays off until you{" "}
        <DocsLink href="/docs/analytics">add a PostHog token</DocsLink>.
      </p>
    </DocsSection>

    <DocsSection id="verify" title="3. Run the checks">
      <p>
        These are the same checks CI runs. Run them before you open a pull
        request:
      </p>
      <CodeBlock
        code={`npm run lint        # ESLint
npm run typecheck   # next typegen, then tsc --noEmit
npm run build       # production build
npm run test        # Playwright + Axe in Chromium, Firefox, and WebKit`}
      />
      <p>
        The first test run may ask you to install the browsers with{" "}
        <Code>npx playwright install</Code>. See{" "}
        <DocsLink href="/docs/testing">Testing &amp; CI</DocsLink> for the
        details.
      </p>
    </DocsSection>

    <DocsSection id="scripts" title="Scripts">
      <ReferenceList
        items={[
          {
            description: "Start the development server with Turbopack.",
            name: "npm run dev",
          },
          { description: "Build for production.", name: "npm run build" },
          {
            description: "Serve the production build on port 3000.",
            name: "npm run start",
          },
          { description: "Run ESLint.", name: "npm run lint" },
          {
            description:
              "Generate Next.js route types, then type-check the project.",
            name: "npm run typecheck",
          },
          {
            description:
              "Run the Playwright end-to-end and accessibility tests.",
            name: "npm run test",
          },
          {
            description:
              "Run Lighthouse against a production build, using the mobile or desktop preset. It starts and stops the server itself.",
            name: "npm run lighthouse / lighthouse:desktop",
          },
          {
            description:
              "Run React Doctor for lint, accessibility, and bundle-size findings.",
            name: "npm run doctor",
          },
        ]}
      />
    </DocsSection>

    <DocsSection id="next-steps" title="Next steps">
      <ul className="list-disc space-y-2 pl-6">
        <li>
          Fill in the rest of <Code>.env</Code>:{" "}
          <DocsLink href="/docs/environment-variables">
            Environment Variables
          </DocsLink>
          .
        </li>
        <li>
          Make it look like your site:{" "}
          <DocsLink href="/docs/customization">Customization</DocsLink>.
        </li>
        <li>
          Put it online: <DocsLink href="/docs/deployment">Deployment</DocsLink>
          .
        </li>
      </ul>
    </DocsSection>
  </DocsArticle>
);

GettingStarted.displayName = "GettingStarted";

export default GettingStarted;
