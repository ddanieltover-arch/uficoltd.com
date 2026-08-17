"use server";

import type { PublishStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireCmsWrite } from "@/lib/adminAuth";
import { createArticle, deleteArticle, updateArticle } from "@/services/articleService";

const STATUSES: PublishStatus[] = ["DRAFT", "PUBLISHED", "ARCHIVED"];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function revalidateArticles(slug?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/insights");
  revalidatePath("/insights");
  revalidatePath("/sitemap.xml");
  if (slug) {
    revalidatePath(`/insights/${slug}`);
    revalidatePath(`/admin/insights/${slug}`);
  }
}

export async function createArticleAction(formData: FormData) {
  await requireCmsWrite();
  const title = String(formData.get("title") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  if (!title || !excerpt || !body) throw new Error("Title, excerpt, and body are required");
  const article = await createArticle({
    title,
    slug: slugInput || slugify(title),
    excerpt,
    body,
    status: "DRAFT",
    metaTitle: String(formData.get("metaTitle") ?? "").trim() || null,
    metaDescription: String(formData.get("metaDescription") ?? "").trim() || null,
  });
  revalidateArticles(article.slug);
}

export async function updateArticleAction(formData: FormData) {
  await requireCmsWrite();
  const id = String(formData.get("id") ?? "");
  const slug = String(formData.get("slug") ?? "").trim();
  if (!id || !slug) throw new Error("Missing article id or slug");
  const status = String(formData.get("status") ?? "") as PublishStatus;
  await updateArticle(id, {
    title: String(formData.get("title") ?? "").trim(),
    slug,
    excerpt: String(formData.get("excerpt") ?? "").trim(),
    body: String(formData.get("body") ?? ""),
    status: STATUSES.includes(status) ? status : "DRAFT",
    metaTitle: String(formData.get("metaTitle") ?? "").trim() || null,
    metaDescription: String(formData.get("metaDescription") ?? "").trim() || null,
  });
  revalidateArticles(slug);
}

export async function deleteArticleAction(formData: FormData) {
  await requireCmsWrite();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing article id");
  await deleteArticle(id);
  revalidateArticles();
}
