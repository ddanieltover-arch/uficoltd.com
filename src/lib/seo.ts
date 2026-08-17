import type { Metadata } from "next";
import { site } from "@/lib/content";

export const DEFAULT_OG_IMAGE = {
  url: "/images/site/og-image.png",
  width: 1200,
  height: 630,
  alt: site.name,
} as const;

export function absoluteUrl(path = ""): string {
  const normalized = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `${site.url}${normalized}`;
}

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  noIndex = false,
}: BuildPageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image
    ? [{ url: image, alt: title }]
    : [{ ...DEFAULT_OG_IMAGE }];

  return {
    title,
    description,
    alternates: { canonical: path || "/" },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type,
      siteName: site.name,
      url,
      title,
      description,
      images: ogImage,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [DEFAULT_OG_IMAGE.url],
    },
  };
}

export function truncateMeta(value: string, max = 160): string {
  const trimmed = value.replace(/\s+/g, " ").trim();
  if (trimmed.length <= max) return trimmed;
  return `${trimmed.slice(0, max - 1).trimEnd()}…`;
}
