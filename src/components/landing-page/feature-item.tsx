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
        {link && linkText && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-orange-800 underline decoration-orange-300 underline-offset-2 transition-colors hover:text-orange-700 dark:text-orange-400 dark:decoration-orange-600 dark:hover:text-orange-300"
          >
            {linkText}
          </a>
        )}
      </span>
    </li>
  );
};

FeatureItem.displayName = "FeatureItem";

export default FeatureItem;
