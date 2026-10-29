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

const HREF = "/docs/analytics";

export const metadata = getDocsMetadata(HREF);

/**
 * Analytics: enabling PostHog, the cookieless configuration, and its costs.
 *
 * @returns The analytics page.
 */
const Analytics = () => (
  <DocsArticle href={HREF}>
    <DocsSection id="default" title="Off by default">
      <p>
        Analytics uses <DocsLink href="https://posthog.com/">PostHog</DocsLink>{" "}
        and is switched off until you add a project token. Without one, PostHog
        never initializes and the site makes no third-party requests at all. A
        new project never sends traffic to someone else&rsquo;s analytics
        account by accident.
      </p>
    </DocsSection>

    <DocsSection id="enable" title="Turning it on">
      <ol className="list-decimal space-y-3 pl-6">
        <li>
          Create a PostHog project. The EU Cloud region is the default here and
          the simpler choice for UK and EU visitors.
        </li>
        <li>
          Add the project token to <Code>.env</Code>:
          <div className="mt-3">
            <CodeBlock
              code={`NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN="phc_..."
NEXT_PUBLIC_POSTHOG_HOST="https://eu.i.posthog.com"`}
            />
          </div>
        </li>
        <li>
          In PostHog, open <em>Settings → Project</em> and enable{" "}
          <strong className="text-stone-900 dark:text-stone-200">
            Cookieless server hash mode
          </strong>
          .
        </li>
        <li>Restart the dev server, or rebuild your deployment.</li>
      </ol>
      <Note title="Two settings that fail silently">
        <p>
          The variable must be called{" "}
          <Code>NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN</Code>, matching
          PostHog&rsquo;s own Next.js snippet. Any other name leaves analytics
          switched off with no error.
        </p>
        <p>
          Without cookieless server hash mode, PostHog accepts the events and
          then captures nothing. The dashboard simply stays empty.
        </p>
      </Note>
      <p>
        The PostHog dashboard also lags by a few minutes. Wait before deciding
        that nothing is arriving.
      </p>
    </DocsSection>

    <DocsSection id="what-is-captured" title="What is captured">
      <p>
        The whole setup is <Code>src/instrumentation-client.ts</Code>, which
        Next.js runs before any application code in the browser. There is no
        analytics component to add to the layout. Each option there is a privacy
        decision, and each one is commented:
      </p>
      <ReferenceList
        items={[
          {
            description:
              "Page views and page leaves, including App Router navigations.",
            name: "capture_pageview",
            tag: "On",
          },
          {
            description: "Core Web Vitals, alongside each page view.",
            name: "capture_performance",
            tag: "On",
          },
          {
            description: (
              <>
                Clicks and the text of the elements clicked. Off under data
                minimisation. Turn it on only if your privacy notice says so.
              </>
            ),
            name: "autocapture",
            tag: "Off",
          },
          {
            description:
              "Session recording. A much larger privacy commitment than page counts, so it is not switched on for you.",
            name: "disable_session_recording",
            tag: "Recording off",
          },
        ]}
      />
    </DocsSection>

    <DocsSection id="cookieless" title="Why there is no cookie banner">
      <p>
        PostHog runs with <Code>cookieless_mode: &quot;always&quot;</Code>. It
        stores nothing in cookies, local storage, or session storage, and counts
        visitors with a privacy-preserving hash calculated on PostHog&rsquo;s
        servers. UK cookie consent rules (PECR regulation 6) only apply when
        something is stored on or read from the visitor&rsquo;s device, so no
        consent banner is needed.
      </p>
      <p>
        The trade-off is real, and it looks like a fault if you do not expect
        it:
      </p>
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <strong className="text-stone-900 dark:text-stone-200">
            No geography.
          </strong>{" "}
          PostHog discards the IP address after hashing and before it would look
          up a location. The Web Analytics world map shows zero for every
          country.
        </li>
        <li>
          <strong className="text-stone-900 dark:text-stone-200">
            No bot filtering.
          </strong>{" "}
          Bot detection runs at the same stage, so it never happens either.
        </li>
        <li>
          <strong className="text-stone-900 dark:text-stone-200">
            No identified users.
          </strong>{" "}
          <Code>identify()</Code> cannot be used, so there are no journeys
          across sessions.
        </li>
        <li>
          <strong className="text-stone-900 dark:text-stone-200">
            Ad blockers.
          </strong>{" "}
          Many block PostHog&rsquo;s domain, so a developer audience in
          particular will be undercounted.
        </li>
      </ul>
      <p>
        Getting geography or identity back means cookies, a consent banner, and
        a rewritten privacy notice.
      </p>
      <Note title="Proxying PostHog through your own domain">
        <p>
          PostHog suggests a same-origin proxy to get past ad blockers. A
          Next.js <Code>rewrites</Code> proxy does not work with cookieless
          mode. Rewrites cannot forward the visitor&rsquo;s IP, so every visitor
          hashes to your server&rsquo;s IP and they all collapse into one. A
          correct proxy needs middleware that sets <Code>X-Forwarded-For</Code>{" "}
          itself. Check it against live data before you rely on it.
        </p>
      </Note>
    </DocsSection>

    <DocsSection id="privacy-notice" title="The privacy notice follows along">
      <p>
        <DocsLink href="/privacy">The privacy page</DocsLink> reads the same
        configuration from <Code>src/lib/analytics.ts</Code> that the SDK uses.
        Without a token it says analytics is switched off. With one, it
        describes cookieless PostHog and names the region your host points at.
        If you change what is captured, update the notice in{" "}
        <Code>src/app/privacy/page.tsx</Code> to match.
      </p>
    </DocsSection>
  </DocsArticle>
);

Analytics.displayName = "Analytics";

export default Analytics;
