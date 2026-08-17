import type { MetadataRoute } from "next";
import { getArticles, getCategories, getProducts, site } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, categories, articles] = await Promise.all([
    getProducts(),
    getCategories(),
    getArticles(),
  ]);

  const staticPages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/shop", priority: 0.9 },
    { path: "/about-us", priority: 0.8 },
    { path: "/contact-us", priority: 0.8 },
    { path: "/manufacturing-process", priority: 0.7 },
    { path: "/purchasing-procedures", priority: 0.7 },
    { path: "/quality-standard", priority: 0.7 },
    { path: "/faq", priority: 0.8 },
    { path: "/glossary", priority: 0.7 },
    { path: "/insights", priority: 0.8 },
  ];

  return [
    ...staticPages.map(({ path, priority }) => ({
      url: `${site.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...products.map((p) => ({
      url: `${site.url}/product/${p.slug}`,
      lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...categories.map((c) => ({
      url: `${site.url}/product-category/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...articles.map((a) => ({
      url: `${site.url}/insights/${a.slug}`,
      lastModified: a.updatedAt
        ? new Date(a.updatedAt)
        : a.publishedAt
          ? new Date(a.publishedAt)
          : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
