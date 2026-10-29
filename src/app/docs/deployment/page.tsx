import DocsArticle from "@/components/docs/docs-article";
import {
  Code,
  CodeBlock,
  DocsLink,
  DocsSection,
  Note,
} from "@/components/docs/prose";
import { getDocsMetadata } from "@/lib/docs";

const HREF = "/docs/deployment";

export const metadata = getDocsMetadata(HREF);

/**
 * Deployment: Vercel, self-hosting, and a post-deploy checklist.
 *
 * @returns The deployment page.
 */
const Deployment = () => (
  <DocsArticle href={HREF}>
    <DocsSection id="before" title="Before you deploy">
      <ul className="list-disc space-y-2 pl-6">
        <li>
          Set the{" "}
          <DocsLink href="/docs/environment-variables#site">
            site variables
          </DocsLink>{" "}
          on your host. <Code>NEXT_PUBLIC_SITE_URL</Code> must be the production
          URL, because canonical URLs, the sitemap, and social share images are
          built from it.
        </li>
        <li>
          Set a{" "}
          <DocsLink href="/docs/environment-variables#privacy">
            privacy contact
          </DocsLink>
          .
        </li>
        <li>
          Run <Code>npm run build</Code> locally once. It catches anything the
          host would fail on.
        </li>
      </ul>
      <Note title="Variables are read at build time">
        <p>
          Every variable the starter reads is a <Code>NEXT_PUBLIC_</Code>{" "}
          variable, so its value is baked into the build. After changing one on
          your host, redeploy. Restarting the server is not enough.
        </p>
      </Note>
    </DocsSection>

    <DocsSection id="vercel" title="Vercel">
      <p>
        <DocsLink href="https://vercel.com/">Vercel</DocsLink> detects Next.js
        and needs no build settings.
      </p>
      <ol className="list-decimal space-y-2 pl-6">
        <li>Push the project to GitHub, GitLab, or Bitbucket.</li>
        <li>
          In Vercel, choose <em>Add New → Project</em> and import the
          repository.
        </li>
        <li>
          Add your variables under <em>Settings → Environment Variables</em>,
          for Production and, if you want pull-request previews to look right,
          for Preview.
        </li>
        <li>Deploy.</li>
      </ol>
      <p>
        Vercel reads the Node version from <Code>engines</Code> in{" "}
        <Code>package.json</Code>, which is pinned to 24 to match{" "}
        <Code>.node-version</Code>.
      </p>
    </DocsSection>

    <DocsSection id="self-hosted" title="Any Node host">
      <p>
        The starter is a standard Next.js app and runs anywhere Node 24 does: a
        VM, a container, Render, Fly.io, Railway, and so on.
      </p>
      <CodeBlock
        code={`npm ci
npm run build
npm run start   # serves on $PORT, default 3000`}
      />
      <p>
        Put it behind a reverse proxy such as nginx or Caddy to terminate TLS,
        and set the environment variables before the build step. There is no
        Dockerfile in the repository. A standard multi-stage Node 24 build
        works, and for the smallest image you can enable{" "}
        <DocsLink href="https://nextjs.org/docs/app/api-reference/config/next-config-js/output">
          <Code>output: &quot;standalone&quot;</Code>
        </DocsLink>{" "}
        in <Code>next.config.ts</Code> and copy only the standalone output.
      </p>
    </DocsSection>

    <DocsSection id="checklist" title="After the first deploy">
      <ul className="list-disc space-y-2 pl-6">
        <li>
          <Code>/robots.txt</Code> and <Code>/sitemap.xml</Code> load on the
          live domain, and the URLs in them use that domain.
        </li>
        <li>
          Pasting a page link into a chat app or social network shows the right
          title, description, and image.
        </li>
        <li>
          <Code>/privacy</Code> shows your contact address and describes the
          analytics you actually configured.
        </li>
        <li>
          If analytics is on, page views appear in PostHog after a few minutes.
          If they do not, check{" "}
          <DocsLink href="/docs/analytics#enable">
            cookieless server hash mode
          </DocsLink>
          .
        </li>
        <li>
          The CI workflow passes on <Code>main</Code>, with your site URL and{" "}
          <DocsLink href="/docs/environment-variables#ci">
            repository variables
          </DocsLink>{" "}
          set.
        </li>
      </ul>
    </DocsSection>
  </DocsArticle>
);

Deployment.displayName = "Deployment";

export default Deployment;
