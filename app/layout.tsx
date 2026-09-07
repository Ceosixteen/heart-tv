import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LiveBanner from "@/components/LiveBanner";
import { LiveProvider } from "@/contexts/LiveContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://hearttv.org"),
  title: {
    default: "Heart TV — A mission of hope",
    template: "%s | Heart TV",
  },
  description:
    "Heart TV, under Peter AD Ministries, carries a mission of hope to change souls, nations and the world — through scholarships, basic needs support and daily broadcast.",
  openGraph: {
    title: "Heart TV — A mission of hope",
    description:
      "Scholarships, basic needs and a daily broadcast of hope. Partner with Heart TV.",
    type: "website",
    siteName: "Heart TV",
    images: [
      {
        url: "/brand/og-heart-tv.png",
        width: 1200,
        height: 630,
        alt: "Heart.tv — a mission of hope",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heart TV — A mission of hope",
    description:
      "Scholarships, basic needs and a daily broadcast of hope. Partner with Heart TV.",
    images: ["/brand/og-heart-tv.png"],
  },
};

// The tab icons come from app/icon.png and app/apple-icon.png by convention.
export const viewport: Viewport = {
  themeColor: "#12105e",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // The inline script below strips "no-js" before React hydrates, so the
  // className on <html> is expected to differ from the server render.
  return (
    <html lang="en" className="no-js" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.remove('no-js')`,
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-cloud"
        >
          Skip to content
        </a>
        <LiveProvider>
          <SiteHeader />
          <LiveBanner />
          <main id="main">{children}</main>
          <SiteFooter />
        </LiveProvider>
      </body>
    </html>
  );
}
