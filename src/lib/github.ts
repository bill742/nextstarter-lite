/**
 * The project's GitHub repository, read from `NEXT_PUBLIC_GITHUB_URL`.
 *
 * Opt-in, like `isUpsellEnabled` and `isAnalyticsEnabled`: with the variable
 * blank, every GitHub link on the site — the hero's star button, the Getting
 * Started button, the footer links, and the structured data — stops rendering,
 * so a project scaffolded from this starter never points visitors at
 * NextStarter's repository by accident.
 */

/** Repository URL. Empty when no repository is configured. */
export const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || "";

/** Whether this deployment has a repository to link to. */
export const isGithubEnabled = githubUrl.length > 0;
