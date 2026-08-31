import Image from "next/image";

interface ScreenshotProps {
  /**
   * What the image shows, for someone who cannot see it. Describe the UI —
   * "a sidebar listing Dashboard, Projects, Billing…" — rather than naming the
   * file or repeating the caption, which is read out too.
   */
  alt: string;
  /** The visible line under the frame: what this proves, for every reader. */
  caption: string;
  /** Intrinsic pixel height of the source file. */
  height: number;
  /** Path under `/public`, e.g. `/screenshots/pro-dashboard.png`. */
  src: string;
  /** Intrinsic pixel width of the source file. */
  width: number;
}

/**
 * A framed product screenshot with a caption.
 *
 * The /pro page sells something the buyer cannot run before paying, so the
 * screenshots are evidence rather than decoration — hence the caption is
 * required, not optional. Each one says what the shot proves; a picture with
 * no claim attached is just a texture.
 *
 * `alt` and `caption` are separate required props on purpose. A screen reader
 * announces both, so a caption repeated as alt text is heard twice, and alt
 * text left to duplicate a marketing line describes nothing.
 *
 * Replacing a shot means giving the new file a new name. `next/image` keys its
 * cache on the URL rather than on the bytes, and serves the optimized result
 * with `max-age=14400`, so overwriting a file in place leaves every browser
 * that already loaded the page showing the old picture for four hours.
 *
 * Both intrinsic dimensions are required so `next/image` can reserve the right
 * aspect ratio before the file arrives. This page's Lighthouse budget is
 * enforced in CI, and an unsized image is the usual way a perfect CLS score
 * stops being perfect.
 *
 * @param alt - Description of the UI for non-visual readers
 * @param caption - The visible claim under the frame
 * @param height - Intrinsic pixel height of the source
 * @param src - Path under `/public`
 * @param width - Intrinsic pixel width of the source
 * @returns A captioned, framed screenshot.
 */
const Screenshot = ({ alt, caption, height, src, width }: ScreenshotProps) => {
  return (
    <figure className="space-y-3 pt-3">
      {/* The dark background matches these captures, so a slow connection
          shows an empty frame in the image's own colour rather than a white
          slab that repaints. */}
      <div className="overflow-hidden rounded-lg border border-stone-200 bg-stone-950 shadow-sm dark:border-stone-700">
        <Image
          alt={alt}
          className="h-auto w-full"
          height={height}
          // The card these sit in is capped at max-w-3xl less its padding, so
          // there is no point serving anything wider than ~704px on desktop.
          sizes="(min-width: 768px) 704px, 100vw"
          src={src}
          width={width}
        />
      </div>
      <figcaption className="text-sm leading-relaxed text-stone-600 dark:text-stone-400">
        {caption}
      </figcaption>
    </figure>
  );
};

Screenshot.displayName = "Screenshot";

export default Screenshot;
