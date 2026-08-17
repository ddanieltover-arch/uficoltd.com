import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageBanner } from "@/components/layout/SiteChrome";
import { ProductGrid } from "@/components/sections/ProductCard";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { getCategories, getProductsByCategory } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  return buildPageMetadata({
    title: `${category.name} Wholesale Sugar`,
    description: `Wholesale ${category.name.toLowerCase()} from Thailand — ${category.count} products. Request a bulk quote from UFI Co., LTD.`,
    path: `/product-category/${category.slug}`,
  });
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
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Shop", path: "/shop" },
              { name: category.name, path: `/product-category/${category.slug}` },
            ]}
          />
          <AnswerCapsule>
            {category.name} from UFI are Thailand-origin wholesale sugars for importers and
            manufacturers. Compare grades on each product page, then request volume and
            destination for a commercial quote.
          </AnswerCapsule>
          <p className="mb-6 text-slate-600">
            See also{" "}
            <Link href="/shop" className="font-medium text-brand-green hover:underline">
              the full catalogue
            </Link>
            ,{" "}
            <Link href="/glossary" className="font-medium text-brand-green hover:underline">
              ICUMSA glossary
            </Link>
            , and{" "}
            <Link href="/insights" className="font-medium text-brand-green hover:underline">
              export insights
            </Link>
            .
          </p>
          <p className="mb-8 inline-block rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-600">
            {category.count} products in this category
          </p>
          <ProductGrid products={categoryProducts} />
          <RelatedLinks page="category" currentPath={`/product-category/${category.slug}`} />
        </div>
      </section>
    </>
  );
}
