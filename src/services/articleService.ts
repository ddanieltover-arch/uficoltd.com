import type { PublishStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { Article } from "@/types";

function paragraphsFromBody(body: string): string[] {
  return body
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function toArticle(row: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  publishedAt: Date | null;
  updatedAt: Date;
  metaTitle: string | null;
  metaDescription: string | null;
}): Article {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    paragraphs: paragraphsFromBody(row.body),
    publishedAt: row.publishedAt,
    updatedAt: row.updatedAt,
    metaTitle: row.metaTitle,
    metaDescription: row.metaDescription,
  };
}

export async function listArticles() {
  return prisma.article.findMany({ orderBy: { updatedAt: "desc" } });
}

export async function getArticleById(id: string) {
  return prisma.article.findUnique({ where: { id } });
}

export async function listPublishedArticles(): Promise<Article[]> {
  const rows = await prisma.article.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
  });
  return rows.map(toArticle);
}

export async function getPublishedArticleBySlug(
  slug: string,
): Promise<Article | undefined> {
  const row = await prisma.article.findFirst({
    where: { slug, status: "PUBLISHED" },
  });
  return row ? toArticle(row) : undefined;
}

export async function createArticle(data: {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  status?: PublishStatus;
  metaTitle?: string | null;
  metaDescription?: string | null;
}) {
  const published = (data.status ?? "DRAFT") === "PUBLISHED";
  return prisma.article.create({
    data: {
      ...data,
      status: data.status ?? "DRAFT",
      publishedAt: published ? new Date() : null,
    },
  });
}

export async function updateArticle(
  id: string,
  data: {
    title?: string;
    slug?: string;
    excerpt?: string;
    body?: string;
    status?: PublishStatus;
    metaTitle?: string | null;
    metaDescription?: string | null;
  },
) {
  const publishedAt =
    data.status === "PUBLISHED"
      ? new Date()
      : data.status === "DRAFT" || data.status === "ARCHIVED"
        ? null
        : undefined;

  return prisma.article.update({
    where: { id },
    data: {
      ...data,
      ...(publishedAt !== undefined ? { publishedAt } : {}),
    },
  });
}

export async function deleteArticle(id: string) {
  return prisma.article.delete({ where: { id } });
}

export async function countArticles() {
  return prisma.article.count();
}
