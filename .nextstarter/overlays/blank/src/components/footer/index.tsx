import Link from "next/link";

/**
 * Footer component for site-wide footer content
 * @returns Footer with the site name, description, copyright, and privacy link
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-stone-50/50 dark:border-stone-800 dark:bg-stone-900/30">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="dark:to-coral-600 flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-orange-700 to-orange-600 shadow-sm dark:from-orange-600">
              <div className="h-4 w-4 rounded-sm border-2 border-white/40" />
            </div>
            <span className="font-serif text-lg font-bold text-stone-900 dark:text-stone-50">
              {process.env.NEXT_PUBLIC_SITE_NAME}
            </span>
          </div>
          <p className="max-w-md text-sm text-stone-600 dark:text-stone-400">
            {process.env.NEXT_PUBLIC_SITE_META_DESCRIPTION}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-stone-200 pt-8 dark:border-stone-800">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-stone-600 md:flex-row dark:text-stone-400">
            <p>
              © {currentYear} {process.env.NEXT_PUBLIC_SITE_NAME}. All rights
              reserved.
            </p>
            {/*
              Article 13 of the UK GDPR wants the privacy notice reachable
              from wherever data is collected, which on this site is every
              page — so it lives in the footer rather than the header nav.
            */}
            <Link
              href="/privacy"
              className="transition-colors hover:text-orange-700 dark:hover:text-orange-400"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.displayName = "Footer";

export default Footer;
