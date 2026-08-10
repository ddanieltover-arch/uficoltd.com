import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageBanner } from "@/components/layout/SiteChrome";
import { ProductGrid } from "@/components/sections/ProductCard";
import { getCategories, getProductsByCategory } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: category.name,
    description: `${category.count} sugar products in ${category.name}`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const categoryProducts = await getProductsByCategory(slug);

  return (
    <>
      <PageBanner title={category.name} />
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-8 inline-block rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600">
            {category.count} products in this category
          </p>
          <ProductGrid products={categoryProducts} />
        </div>
      </section>
    </>
  );
}
