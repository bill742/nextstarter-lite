import Link from "next/link";

/**
 * Site logo component
 * Displays the site branding with an animated geometric icon and site name
 * @returns Clickable logo that links to homepage with hover effects
 */
const Logo = () => {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2 transition-transform hover:scale-[1.02]"
    >
      {/* Logo mark - geometric accent */}
      <div className="dark:to-coral-600 relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-orange-700 to-orange-600 shadow-sm transition-transform group-hover:rotate-12 group-hover:shadow-md dark:from-orange-600">
        <div className="h-4 w-4 rounded-sm border-2 border-white/40" />
      </div>

      {/* Brand name */}
      <div className="font-serif text-xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
        {process.env.NEXT_PUBLIC_SITE_NAME}
      </div>
    </Link>
  );
};

Logo.displayName = "Logo";

export default Logo;
