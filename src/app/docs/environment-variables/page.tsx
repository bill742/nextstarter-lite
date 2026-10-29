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

const HREF = "/docs/environment-variables";

export const metadata = getDocsMetadata(HREF);

/**
 * Environment variables, grouped by what they switch on.
 *
 * @returns The environment variables page.
 */
const EnvironmentVariables = () => (
  <DocsArticle href={HREF}>
    <DocsSection id="setup" title="Setting them">
      <p>
        <Code>.env.example</Code> is the source of truth, with a comment on
        every variable. Copy it to <Code>.env</Code> and fill in what you need
        (the CLI has already done the copy for you):
      </p>
      <CodeBlock code="cp .env.example .env" />
      <p>
        Every variable here starts with <Code>NEXT_PUBLIC_</Code>, which means
        Next.js inlines its value into the JavaScript sent to the browser at{" "}
        <strong className="text-stone-900 dark:text-stone-200">
          build time
        </strong>
        . Restart the dev server after changing <Code>.env</Code>, and rebuild
        after changing them on your host. Never put a secret in one.
      </p>
    </DocsSection>

    <DocsSection id="site" title="Site">
      <p>These three are all you need to run and deploy the site.</p>
      <ReferenceList
        items={[
          {
            description: (
              <>
                The full URL of the site, such as{" "}
                <Code>https://example.com</Code>. It is used for canonical URLs,
                the sitemap, <Code>robots.txt</Code>, and Open Graph images. A
                trailing slash is fine. Set it to your production domain when
                you deploy.
              </>
            ),
            name: "NEXT_PUBLIC_SITE_URL",
            tag: "Required",
          },
          {
            description:
              "The name shown in the header, the footer, and every page title.",
            name: "NEXT_PUBLIC_SITE_NAME",
            tag: "Required",
          },
          {
            description:
              "The default description used in search results, link previews, and the footer.",
            name: "NEXT_PUBLIC_SITE_META_DESCRIPTION",
            tag: "Required",
          },
          {
            description: (
              <>
                Your project&rsquo;s GitHub repository. The footer and the
                structured data link to it, and so do the landing page&rsquo;s
                &ldquo;Star on GitHub&rdquo; and &ldquo;View on GitHub&rdquo;
                buttons in the <Code>full</Code> starting point. The star count
                is read from the same repository. Leave it blank and every
                GitHub link is hidden.
              </>
            ),
            name: "NEXT_PUBLIC_GITHUB_URL",
            tag: "Optional",
          },
        ]}
      />
    </DocsSection>

    <DocsSection id="analytics" title="Analytics">
      <p>
        Leave the token blank and PostHog never initializes. The site then makes
        no third-party requests at all. See{" "}
        <DocsLink href="/docs/analytics">Analytics</DocsLink> before turning it
        on.
      </p>
      <ReferenceList
        items={[
          {
            description: (
              <>
                The PostHog project token, from{" "}
                <em>Settings → Project → Project API key</em>. Setting it
                switches analytics on.
              </>
            ),
            name: "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN",
            tag: "Optional",
          },
          {
            description: (
              <>
                The ingestion host. Change it only if your PostHog project is in
                the US region (<Code>https://us.i.posthog.com</Code>), which
                brings data-transfer obligations that the EU region does not.
              </>
            ),
            name: "NEXT_PUBLIC_POSTHOG_HOST",
            tag: "Default: https://eu.i.posthog.com",
          },
        ]}
      />
    </DocsSection>

    <DocsSection id="privacy" title="Privacy">
      <ReferenceList
        items={[
          {
            description: (
              <>
                Where data-protection requests go, shown on{" "}
                <Code>/privacy</Code>. It falls back to{" "}
                <Code>NEXT_PUBLIC_SUPPORT_EMAIL</Code>. With neither set, the
                notice leaves out its contact section rather than link nowhere.
              </>
            ),
            name: "NEXT_PUBLIC_PRIVACY_EMAIL",
            tag: "Set before launch",
          },
        ]}
      />
      <Note title="Set a privacy contact before you go live">
        <p>
          The UK GDPR requires a way for people to exercise their rights. The
          site builds without it, so nothing will remind you.
        </p>
      </Note>
    </DocsSection>

    <DocsSection id="upsell" title="Selling something">
      <p>
        These exist so NextStarter&rsquo;s own site can sell NextStarter Pro.
        Leave them blank in your project. With <Code>NEXT_PUBLIC_PRO_URL</Code>{" "}
        unset, the whole sales surface switches off: the landing-page teaser,
        its navigation entries, and the <Code>/pro</Code> and{" "}
        <Code>/thanks</Code> routes. Your site never advertises someone
        else&rsquo;s product by accident. Projects created with the CLI have
        these pages removed already.
      </p>
      <ReferenceList
        items={[
          {
            description:
              "A checkout link. Setting it switches the sales surface on.",
            name: "NEXT_PUBLIC_PRO_URL",
            tag: "Optional",
          },
          {
            description:
              "The customer portal linked from the post-purchase page.",
            name: "NEXT_PUBLIC_POLAR_PORTAL_URL",
            tag: "Optional",
          },
          {
            description: (
              <>
                A public support address. It is also the fallback privacy
                contact, so it is worth keeping even if you sell nothing.
              </>
            ),
            name: "NEXT_PUBLIC_SUPPORT_EMAIL",
            tag: "Optional",
          },
        ]}
      />
    </DocsSection>

    <DocsSection id="ci" title="In CI">
      <p>
        The GitHub Actions workflow builds the site, so it needs the site
        variables too. They are set in the <Code>env</Code> block at the top of{" "}
        <Code>.github/workflows/ci.yml</Code>. The site URL is written inline
        there, so change it to your own domain. The name and description come
        from two repository variables, <Code>NEXT_PUBLIC_SITE_NAME</Code> and{" "}
        <Code>NEXT_PUBLIC_SITE_METADESCRIPTION</Code>, which you add under{" "}
        <em>Settings → Secrets and variables → Actions → Variables</em>. Several
        tests check page titles against the site name, so CI fails without them.
      </p>
    </DocsSection>
  </DocsArticle>
);

EnvironmentVariables.displayName = "EnvironmentVariables";

export default EnvironmentVariables;
