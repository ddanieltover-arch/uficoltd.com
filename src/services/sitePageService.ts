import type { PublishStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { PageContent } from "@/types";

export async function listSitePages() {
  return prisma.sitePage.findMany({ orderBy: { slug: "asc" } });
}

export async function getSitePageBySlug(slug: string) {
  return prisma.sitePage.findUnique({ where: { slug } });
}

export async function updateSitePage(
  slug: string,
  data: {
    title?: string;
    body?: string;
    status?: PublishStatus;
    metaTitle?: string | null;
    metaDescription?: string | null;
  },
) {
  return prisma.sitePage.upsert({
    where: { slug },
    update: data,
    create: {
      slug,
      title: data.title ?? slug,
      body: data.body ?? "",
      status: data.status ?? "DRAFT",
      metaTitle: data.metaTitle,
      metaDescription: data.metaDescription,
    },
  });
}

export async function getPublishedPageContent(
  slug: string,
): Promise<PageContent | null> {
  const page = await prisma.sitePage.findFirst({
    where: { slug, status: "PUBLISHED" },
  });
  if (!page) return null;
  return {
    title: page.title,
    slug: page.slug,
    paragraphs: page.body
      .split(/\n\n+/)
      .map((p) => p.trim())
      .filter(Boolean),
    metaTitle: page.metaTitle,
    metaDescription: page.metaDescription,
  };
}
