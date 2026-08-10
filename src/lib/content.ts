import categoriesJson from "../../content/categories.json";
import pagesJson from "../../content/pages.json";
import productsJson from "../../content/products.json";
import siteData from "../../content/site.json";
import type { Category, PageContent, Product, SiteConfig } from "@/types";
import {
  getPublishedProductBySlug,
  getPublishedProductsByCategory,
  listPublishedCategories,
  listPublishedProducts,
  searchPublishedProducts,
} from "@/services/productService";
import { getPublishedPageContent } from "@/services/sitePageService";

export const site = siteData as SiteConfig;

const fallbackProducts = productsJson as Product[];
const fallbackCategories = categoriesJson as Category[];
const fallbackPages = pagesJson as Record<string, PageContent>;

/** @deprecated Prefer getProducts() — sync export kept only for static fallbacks during migration. */
export const products: Product[] = fallbackProducts;
/** @deprecated Prefer getCategories() */
export const categories: Category[] = fallbackCategories;

async function fromDbOrFallback<T>(
  query: () => Promise<T>,
  fallback: T,
): Promise<T> {
  if (!process.env.DATABASE_URL) {
    return fallback;
  }

  try {
    return await query();
  } catch (error) {
    console.error(
      "[content] Database unavailable, using static content fallback.",
      error,
    );
    return fallback;
  }
}

export async function getProducts(): Promise<Product[]> {
  return fromDbOrFallback(() => listPublishedProducts(), fallbackProducts);
}

export async function getCategories(): Promise<Category[]> {
  return fromDbOrFallback(() => listPublishedCategories(), fallbackCategories);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return fromDbOrFallback(
    () => getPublishedProductBySlug(slug),
    fallbackProducts.find((p) => p.slug === slug),
  );
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return fromDbOrFallback(
    () => getPublishedProductsByCategory(categorySlug),
    fallbackProducts.filter((p) => p.category === categorySlug),
  );
}

export async function searchProducts(query: string): Promise<Product[]> {
  return fromDbOrFallback(() => searchPublishedProducts(query), (() => {
    const q = query.toLowerCase().trim();
    if (!q) return fallbackProducts;
    return fallbackProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q),
    );
  })());
}

export async function getPage(slug: string): Promise<PageContent> {
  const empty: PageContent = { title: slug, slug, paragraphs: [] };
  const fallback = fallbackPages[slug] ?? empty;

  return fromDbOrFallback(async () => {
    const page = await getPublishedPageContent(slug);
    return page ?? fallback;
  }, fallback);
}
