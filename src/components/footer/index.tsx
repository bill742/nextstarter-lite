import { SiGithub } from "react-icons/si";

import QuickLinks from "./quick-links";

/**
 * Footer component for site-wide footer content
 * Features grounded design with links and copyright information
 * @returns Footer component with navigation and metadata
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-stone-50/50 dark:border-stone-800 dark:bg-stone-900/30">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="dark:to-coral-600 flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-orange-700 to-orange-600 shadow-sm dark:from-orange-600">
                <div className="h-4 w-4 rounded-sm border-2 border-white/40" />
              </div>
              <span className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50">
                {process.env.NEXT_PUBLIC_SITE_NAME}
              </span>
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              {process.env.NEXT_PUBLIC_SITE_META_DESCRIPTION}
            </p>
          </div>

          {/* Quick links column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-stone-900 dark:text-stone-50">
              Quick Links
            </h3>
            <QuickLinks />
          </div>

          {/* Resources column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-stone-900 dark:text-stone-50">
              Resources
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/bill742/nextstarter-lite"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-stone-600 transition-colors hover:text-orange-600 dark:text-stone-400 dark:hover:text-orange-400"
                >
                  <SiGithub
                    className="h-4 w-4"
                    aria-label="GitHub Repository"
                  />
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-600 transition-colors hover:text-orange-600 dark:text-stone-400 dark:hover:text-orange-400"
                >
                  Next.js Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-600 transition-colors hover:text-orange-600 dark:text-stone-400 dark:hover:text-orange-400"
                >
                  Tailwind CSS Docs
                </a>
              </li>
              <li>
                <a
                  href="https://ui.shadcn.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-600 transition-colors hover:text-orange-600 dark:text-stone-400 dark:hover:text-orange-400"
                >
                  ShadCN/UI
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-stone-200 pt-8 dark:border-stone-800">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-stone-600 md:flex-row dark:text-stone-400">
            <p>
              © {currentYear} {process.env.NEXT_PUBLIC_SITE_NAME}. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="https://github.com/bill742/nextstarter-lite"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-orange-600 dark:hover:text-orange-400"
                aria-label="GitHub"
              >
                <SiGithub
                  className="h-5 w-5"
                  aria-label="View project on GitHub"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";

export default Footer;
