import { ImageResponse } from "next/og";

export const alt =
  "NextStarter — a free, accessible Next.js boilerplate with TypeScript and Tailwind";
export const size = { height: 630, width: 1200 };
export const contentType = "image/png";

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
          color: "#a1a1aa",
          fontSize: 28,
          letterSpacing: "0.1em",
          marginBottom: 24,
          textTransform: "uppercase",
        }}
      >
        NextStarter
      </div>
      <div
        style={{
          fontSize: 68,
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: 28,
        }}
      >
        Ship accessible Next.js apps in minutes
      </div>
      <div style={{ color: "#a1a1aa", fontSize: 30 }}>
        TypeScript · Tailwind · shadcn/ui · Playwright · WCAG 2.1 AA
      </div>
    </div>,
    { ...size }
  );
}
