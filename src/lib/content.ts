import categoriesJson from "../../content/categories.json";
import faqJson from "../../content/faq.json";
import glossaryJson from "../../content/glossary.json";
import insightsJson from "../../content/insights.json";
import pagesJson from "../../content/pages.json";
import productsJson from "../../content/products.json";
import siteData from "../../content/site.json";
import type {
  Article,
  Category,
  FaqItem,
  GlossaryTerm,
  PageContent,
  Product,
  SiteConfig,
} from "@/types";
import {
  getPublishedProductBySlug,
  getPublishedProductsByCategory,
  listPublishedCategories,
  listPublishedProducts,
  searchPublishedProducts,
} from "@/services/productService";
import { getPublishedPageContent } from "@/services/sitePageService";
import {
  getPublishedArticleBySlug,
  listPublishedArticles,
} from "@/services/articleService";

export const site = siteData as SiteConfig;

const fallbackProducts = productsJson as Product[];
const fallbackCategories = categoriesJson as Category[];
const fallbackPages = pagesJson as Record<string, PageContent>;
const fallbackFaqs = faqJson as FaqItem[];
const fallbackGlossary = glossaryJson as GlossaryTerm[];

type InsightJson = {
  slug: string;
  title: string;
  excerpt: string;
  paragraphs: string[];
  metaTitle?: string;
  metaDescription?: string;
};

function articleFromJson(item: InsightJson): Article {
  return {
    id: item.slug,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    body: item.paragraphs.join("\n\n"),
    paragraphs: item.paragraphs,
    publishedAt: "2026-08-17T00:00:00.000Z",
    metaTitle: item.metaTitle,
    metaDescription: item.metaDescription,
  };
}

const fallbackArticles = (insightsJson as InsightJson[]).map(articleFromJson);

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

export function getFaqs(): FaqItem[] {
  return fallbackFaqs;
}

export function getGlossary(): GlossaryTerm[] {
  return fallbackGlossary;
}

export async function getArticles(): Promise<Article[]> {
  return fromDbOrFallback(() => listPublishedArticles(), fallbackArticles);
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  return fromDbOrFallback(
    () => getPublishedArticleBySlug(slug),
    fallbackArticles.find((a) => a.slug === slug),
  );
}
