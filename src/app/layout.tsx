import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Footer from "@/components/footer";
import Header from "@/components/header";
import SkipNav from "@/components/skip-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { jsonLd, organizationSchema, softwareSchema } from "@/lib/schema";
import { metadataBaseUrl } from "@/lib/utils";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  authors: [{ name: "Bill Dean", url: "https://billdean.me" }],
  category: "technology",
  creator: "Bill Dean",
  keywords: [
    "next.js boilerplate",
    "next.js starter kit",
    "typescript tailwind boilerplate",
    "shadcn ui starter",
    "accessible next.js template",
    "wcag next.js boilerplate",
  ],
  metadataBase: metadataBaseUrl,
  openGraph: {
    description:
      "Free, WCAG 2.1 AA verified Next.js boilerplate. TypeScript, Tailwind, shadcn/ui, Playwright, and CI configured out of the box.",
    images: "",
    locale: "en_US",
    siteName: process.env.NEXT_PUBLIC_SITE_NAME,
    title: `${process.env.NEXT_PUBLIC_SITE_NAME} — Ship accessible Next.js apps in minutes`,
    type: "website",
    url: process.env.NEXT_PUBLIC_SITE_URL,
  },
  publisher: process.env.NEXT_PUBLIC_SITE_NAME,
  robots: {
    follow: true,
    googleBot: {
      follow: true,
      index: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
    index: true,
  },
  title: {
    default: `Free Next.js Boilerplate with TypeScript & Tailwind | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
  },
  twitter: {
    card: "summary_large_image",
    description:
      "Free, WCAG 2.1 AA verified Next.js boilerplate. TypeScript, Tailwind, shadcn/ui, Playwright, and CI out of the box.",
    title: `${process.env.NEXT_PUBLIC_SITE_NAME} — Ship accessible Next.js apps in minutes`,
  },
};

/**
 * Root layout component for the entire application
 * @param children - Child components to render
 * @returns Root layout with theme provider and global components
 */
const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SkipNav />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
        {/* JSON-LD — see lib/schema.ts */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd(softwareSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd(organizationSchema),
          }}
        />
      </body>
    </html>
  );
};

RootLayout.displayName = "RootLayout";

export default RootLayout;
