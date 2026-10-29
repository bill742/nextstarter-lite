import { Star } from "lucide-react";
import { SiGithub } from "react-icons/si";

import { githubUrl, isGithubEnabled } from "@/lib/github";

/** How often the star count is refreshed, in seconds. */
const REVALIDATE_SECONDS = 60 * 60 * 24;

/**
 * Pulls `owner/repo` out of a GitHub URL.
 *
 * @param url - A repository URL such as `https://github.com/owner/repo`.
 * @returns `owner/repo`, or `null` for anything that is not a repository URL.
 */
const parseRepo = (url: string): string | null => {
  try {
    const { hostname, pathname } = new URL(url);
    const [owner, repo] = pathname.split("/").filter(Boolean);

    if (hostname !== "github.com" || !owner || !repo) return null;

    return `${owner}/${repo.replace(/\.git$/, "")}`;
  } catch {
    return null;
  }
};

/**
 * Fetches the repository's star count from the GitHub API.
 *
 * This runs on the server, at build time and then once a day, rather than in
 * the browser. The official GitHub button is a third-party iframe, which would
 * send every visitor's IP address to GitHub and break the privacy notice's
 * promise that the site makes no third-party requests.
 *
 * Every failure — rate limiting (the unauthenticated limit is 60 requests an
 * hour, easy to hit from a shared CI runner), a timeout, an unexpected shape —
 * returns `null`, and the button renders without a count instead of failing
 * the build.
 *
 * @param repo - `owner/repo`.
 * @returns The star count, or `null` if it could not be fetched.
 */
const fetchStarCount = async (repo: string): Promise<number | null> => {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) return null;

    const data: { stargazers_count?: unknown } = await response.json();

    return typeof data.stargazers_count === "number"
      ? data.stargazers_count
      : null;
  } catch {
    return null;
  }
};

/**
 * Compact count, e.g. "1.2K". Fixed locale so the static HTML is stable.
 * Built once at module scope: constructing an `Intl.NumberFormat` is far more
 * expensive than calling `format` on one.
 */
const countFormatter = new Intl.NumberFormat("en-GB", {
  maximumFractionDigits: 1,
  notation: "compact",
});

/**
 * A "Star on GitHub" button with the repository's star count, styled after
 * GitHub's own: a label segment and a count segment in one pill.
 *
 * Renders nothing when `NEXT_PUBLIC_GITHUB_URL` is blank — see `lib/github.ts`.
 *
 * @returns A link to the repository, with the count when it is available, or
 * `null` when no repository is configured.
 */
const GithubStars = async () => {
  if (!isGithubEnabled) return null;

  const repo = parseRepo(githubUrl);
  const count = repo ? await fetchStarCount(repo) : null;

  return (
    <a
      className="group inline-flex items-stretch overflow-hidden rounded-lg border border-stone-300 bg-white text-sm font-semibold text-stone-900 shadow-sm transition-colors hover:border-orange-300 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100 dark:hover:border-orange-800"
      href={githubUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="inline-flex items-center gap-2 px-3 py-1.5 group-hover:text-orange-800 dark:group-hover:text-orange-400">
        <SiGithub aria-hidden="true" className="h-4 w-4" />
        <Star aria-hidden="true" className="h-4 w-4" />
        Star on GitHub
      </span>
      {count !== null ? (
        <span className="inline-flex items-center border-l border-stone-300 bg-stone-50 px-3 py-1.5 tabular-nums dark:border-stone-700 dark:bg-stone-800">
          {countFormatter.format(count)}
          <span className="sr-only"> {count === 1 ? "star" : "stars"}</span>
        </span>
      ) : null}
    </a>
  );
};

GithubStars.displayName = "GithubStars";

export default GithubStars;
