import { ImageResponse } from "next/og";

export const alt =
  "NextStarter Pro — the full SaaS stack for Next.js, one-time $199";
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
        NextStarter Pro
      </div>
      <div
        style={{
          fontSize: 68,
          fontWeight: 700,
          lineHeight: 1.1,
          marginBottom: 28,
        }}
      >
        The full SaaS stack, one-time $199
      </div>
      <div style={{ color: "#a1a1aa", fontSize: 30 }}>
        Clerk · Stripe · Prisma · Resend · i18n with RTL · WCAG 2.1 AA
      </div>
    </div>,
    { ...size }
  );
}
