import "dotenv/config";
import { PrismaClient, PublishStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import { readFileSync } from "fs";
import { join } from "path";

const prisma = new PrismaClient();

type JsonCategory = { slug: string; name: string; count: number };
type JsonProduct = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  category: string;
  categoryName: string;
  image: string;
};
type JsonPage = {
  title: string;
  slug: string;
  paragraphs: string[];
};

type JsonInsight = {
  slug: string;
  title: string;
  excerpt: string;
  paragraphs: string[];
  metaTitle?: string;
  metaDescription?: string;
};

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL ?? "sales@uficoltd.com";
  const adminPassword = process.env.ADMIN_PASSWORD ?? "ChangeMeNow!UFI";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, name: "UFI Admin", role: "ADMIN" },
    create: {
      email: adminEmail,
      passwordHash,
      name: "UFI Admin",
      role: "ADMIN",
    },
  });

  const root = join(__dirname, "..");
  const categories = JSON.parse(
    readFileSync(join(root, "content/categories.json"), "utf8"),
  ) as JsonCategory[];
  const products = JSON.parse(
    readFileSync(join(root, "content/products.json"), "utf8"),
  ) as JsonProduct[];
  const pages = JSON.parse(
    readFileSync(join(root, "content/pages.json"), "utf8"),
  ) as Record<string, JsonPage>;
  const insights = JSON.parse(
    readFileSync(join(root, "content/insights.json"), "utf8"),
  ) as JsonInsight[];

  const categoryIds = new Map<string, string>();

  for (const [index, cat] of categories.entries()) {
    const row = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: { name: cat.name, sortOrder: index },
      create: { slug: cat.slug, name: cat.name, sortOrder: index },
    });
    categoryIds.set(cat.slug, row.id);
  }

  for (const product of products) {
    const categoryId = categoryIds.get(product.category);
    if (!categoryId) {
      console.warn(`Skipping product ${product.slug}: unknown category`);
      continue;
    }

    const existing = await prisma.product.findUnique({
      where: { slug: product.slug },
      include: { images: true },
    });

    if (existing) {
      await prisma.product.update({
        where: { id: existing.id },
        data: {
          name: product.title,
          shortDescription: product.excerpt,
          description: product.description,
          categoryId,
          status: PublishStatus.PUBLISHED,
          publishedAt: existing.publishedAt ?? new Date(),
          originCountry: "Thailand",
        },
      });

      if (existing.images.length === 0) {
        await prisma.productImage.create({
          data: {
            productId: existing.id,
            url: product.image,
            alt: product.title,
            isPrimary: true,
            sortOrder: 0,
          },
        });
      }
    } else {
      await prisma.product.create({
        data: {
          slug: product.slug,
          name: product.title,
          shortDescription: product.excerpt,
          description: product.description,
          categoryId,
          status: PublishStatus.PUBLISHED,
          publishedAt: new Date(),
          originCountry: "Thailand",
          images: {
            create: {
              url: product.image,
              alt: product.title,
              isPrimary: true,
              sortOrder: 0,
            },
          },
        },
      });
    }
  }

  await prisma.product.updateMany({
    where: { slug: "icumsa-100-150-sugar-2" },
    data: { status: PublishStatus.ARCHIVED },
  });

  for (const page of Object.values(pages)) {
    await prisma.sitePage.upsert({
      where: { slug: page.slug },
      update: {
        title: page.title,
        body: page.paragraphs.join("\n\n"),
        status: PublishStatus.PUBLISHED,
      },
      create: {
        slug: page.slug,
        title: page.title,
        body: page.paragraphs.join("\n\n"),
        status: PublishStatus.PUBLISHED,
      },
    });
  }

  for (const insight of insights) {
    const body = insight.paragraphs.join("\n\n");
    await prisma.article.upsert({
      where: { slug: insight.slug },
      update: {
        title: insight.title,
        excerpt: insight.excerpt,
        body,
        status: PublishStatus.PUBLISHED,
        publishedAt: new Date(),
        metaTitle: insight.metaTitle ?? null,
        metaDescription: insight.metaDescription ?? null,
      },
      create: {
        slug: insight.slug,
        title: insight.title,
        excerpt: insight.excerpt,
        body,
        status: PublishStatus.PUBLISHED,
        publishedAt: new Date(),
        metaTitle: insight.metaTitle ?? null,
        metaDescription: insight.metaDescription ?? null,
      },
    });
  }

  console.log(
    `Seeded admin ${adminEmail}, ${categories.length} categories, ${products.length} products, ${Object.keys(pages).length} pages, ${insights.length} insights.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
