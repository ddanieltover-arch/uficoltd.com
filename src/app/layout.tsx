import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer, Header } from "@/components/layout/SiteChrome";
import { PageTransition } from "@/components/shared/PageTransition";
import { site } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} – Premium Wholesale Refined Sugar`,
    template: `%s – ${site.name}`,
  },
  description: site.tagline,
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
    images: [
      {
        url: "/images/site/og-image.png",
        width: 1200,
        height: 630,
        alt: site.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
    images: ["/images/site/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} min-h-screen antialiased`}>
        <Header />
        <main>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
