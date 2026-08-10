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

/** @deprecated Prefer getProducts() — sync export kept only for static fallbacks during migration. */
export const products: Product[] = [];
/** @deprecated Prefer getCategories() */
export const categories: Category[] = [];

export async function getProducts(): Promise<Product[]> {
  return listPublishedProducts();
}

export async function getCategories(): Promise<Category[]> {
  return listPublishedCategories();
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return getPublishedProductBySlug(slug);
}

export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
  return getPublishedProductsByCategory(categorySlug);
}

export async function searchProducts(query: string): Promise<Product[]> {
  return searchPublishedProducts(query);
}

export async function getPage(slug: string): Promise<PageContent> {
  const page = await getPublishedPageContent(slug);
  if (!page) {
    return { title: slug, slug, paragraphs: [] };
  }
  return page;
}
