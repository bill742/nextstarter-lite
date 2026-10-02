import { ImageResponse } from "next/og";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "";
const siteDescription = process.env.NEXT_PUBLIC_SITE_META_DESCRIPTION ?? "";

export const alt = siteDescription
  ? `${siteName} — ${siteDescription}`
  : siteName;
export const size = { height: 630, width: 1200 };
export const contentType = "image/png";

/**
 * The default link-preview image for every page, built from the site name and
 * description in `.env`. Replace the layout here, or drop in a static
 * `opengraph-image.png` beside this file, to brand it.
 */
export default async function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#0a0a0a",
        color: "#fafafa",
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
        height: "100%",
        justifyContent: "center",
        padding: "80px",
        width: "100%",
      }}
    >
      <div
        style={{
          fontSize: 68,
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: 28,
        }}
      >
        {siteName}
      </div>
      <div style={{ color: "#a1a1aa", fontSize: 30 }}>{siteDescription}</div>
    </div>,
    { ...size }
  );
}
