import { prisma } from "@/lib/prisma";
import type { Category, Product } from "@/types";

function toPublicProduct(row: {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  metaTitle: string | null;
  metaDescription: string | null;
  updatedAt: Date;
  category: { slug: string; name: string };
  images: { url: string; isPrimary: boolean }[];
}): Product {
  const primary =
    row.images.find((i) => i.isPrimary)?.url ?? row.images[0]?.url ?? "";
  return {
    id: row.id,
    slug: row.slug,
    title: row.name,
    excerpt: row.shortDescription,
    description: row.description,
    category: row.category.slug,
    categoryName: row.category.name,
    image: primary,
    metaTitle: row.metaTitle,
    metaDescription: row.metaDescription,
    updatedAt: row.updatedAt,
  };
}

export async function listPublishedProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { name: "asc" },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
    },
  });
  return rows.map(toPublicProduct);
}

export async function listPublishedCategories(): Promise<Category[]> {
  const rows = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      _count: {
        select: { products: { where: { status: "PUBLISHED" } } },
      },
    },
  });
  return rows.map((c) => ({
    slug: c.slug,
    name: c.name,
    count: c._count.products,
  }));
}

export async function getPublishedProductBySlug(
  slug: string,
): Promise<Product | undefined> {
  const row = await prisma.product.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
    },
  });
  return row ? toPublicProduct(row) : undefined;
}

export async function getPublishedProductsByCategory(
  categorySlug: string,
): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: {
      status: "PUBLISHED",
      category: { slug: categorySlug },
    },
    orderBy: { name: "asc" },
    include: {
      category: true,
      images: { orderBy: { sortOrder: "asc" } },
    },
  });
  return rows.map(toPublicProduct);
}

export async function searchPublishedProducts(query: string): Promise<Product[]> {
  const all = await listPublishedProducts();
  const q = query.toLowerCase().trim();
  if (!q) return all;
  return all.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q),
  );
}
