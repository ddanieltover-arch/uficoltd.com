import type { MetadataRoute } from "next";
import { categories, products, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/shop",
    "/about-us",
    "/contact-us",
    "/manufacturing-process",
    "/purchasing-procedures",
    "/quality-standard",
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...products.map((p) => ({
      url: `${site.url}/product/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...categories.map((c) => ({
      url: `${site.url}/product-category/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
