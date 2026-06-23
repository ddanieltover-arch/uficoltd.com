import categoriesData from "../../content/categories.json";
import pagesData from "../../content/pages.json";
import productsData from "../../content/products.json";
import siteData from "../../content/site.json";
import type { Category, PageContent, Product, SiteConfig } from "@/types";

export const site = siteData as SiteConfig;
export const products = productsData as Product[];
export const categories = categoriesData as Category[];
export const pages = pagesData as Record<string, PageContent>;

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q),
  );
}

export function getPage(slug: keyof typeof pages): PageContent {
  return pages[slug];
}
