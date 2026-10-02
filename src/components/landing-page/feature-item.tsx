import Link from "next/link";

/**
 * Whether a feature's link points at a page of this site rather than out to
 * another one. Internal links get `next/link` and stay in the same tab;
 * external ones open in a new tab and carry the usual `rel`.
 *
 * @param link - The href from a feature item.
 * @returns `true` for a path on this site.
 */
const isInternal = (link: string) => link.startsWith("/");

/** Shared by both link elements, so the two read identically. */
const linkClassName =
  "font-medium text-orange-800 underline decoration-orange-300 underline-offset-2 transition-colors hover:text-orange-700 dark:text-orange-400 dark:decoration-orange-600 dark:hover:text-orange-300";

const FeatureItem = ({
  content,
  link,
  linkText,
}: {
  content: string;
  link?: string;
  linkText?: string;
}) => {
  return (
    <li className="flex items-start gap-3 rounded-lg border border-stone-200 bg-white p-4 transition-[border-color,box-shadow] hover:border-orange-200 hover:shadow-sm dark:border-stone-800 dark:bg-stone-900/50 dark:hover:border-orange-900/50">
      <span className="mt-0.5 text-orange-600 dark:text-orange-400">✓</span>
      <span>
        {content}
        {link && linkText ? (
          isInternal(link) ? (
            <Link href={link} className={linkClassName}>
              {linkText}
            </Link>
          ) : (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={linkClassName}
            >
              {linkText}
            </a>
          )
        ) : null}
      </span>
    </li>
  );
};

FeatureItem.displayName = "FeatureItem";

export default FeatureItem;
