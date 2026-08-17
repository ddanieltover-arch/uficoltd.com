import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@/components/seo/GoogleAnalytics";
import { site } from "@/lib/content";
import { DEFAULT_OG_IMAGE } from "@/lib/seo";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – Wholesale Refined Sugar from Thailand`,
    template: `%s – ${site.name}`,
  },
  description: site.tagline,
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  icons: {
    icon: [
      { url: "/images/site/favicon.ico" },
      { url: "/images/site/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/site/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/images/site/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: site.name,
    url: site.url,
    title: site.name,
    description: site.tagline,
    images: [{ ...DEFAULT_OG_IMAGE }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
    images: [DEFAULT_OG_IMAGE.url],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en">
      <body className={`${inter.variable} min-h-screen antialiased`}>
        {gaId ? <GoogleAnalytics measurementId={gaId} /> : null}
        {children}
      </body>
    </html>
  );
}
