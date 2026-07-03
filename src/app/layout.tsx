import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Footer from "@/components/footer";
import Header from "@/components/header";
import SkipNav from "@/components/skip-nav";
import { ThemeProvider } from "@/components/theme-provider";

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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    description: process.env.NEXT_PUBLIC_SITE_META_DESCRIPTION,
    images: "",
    title: "NextStarter",
  },
  title: {
    default: "NextStarter",
    template: "%s | NextStarter",
  },
  twitter: {
    card: "summary_large_image",
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
      </body>
    </html>
  );
};

RootLayout.displayName = "RootLayout";

export default RootLayout;
