import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/sections/Forms";
import { ProductDescription } from "@/components/sections/ProductDescription";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { getProductBySlug } from "@/lib/content";
import { productSchema } from "@/lib/schema";
import { buildPageMetadata, PAGE_REVALIDATE_SECONDS, truncateMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = PAGE_REVALIDATE_SECONDS;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return buildPageMetadata({
    title: product.metaTitle ?? `${product.title} Wholesale`,
    description: truncateMeta(product.metaDescription ?? product.excerpt),
    path: `/product/${product.slug}`,
    image: product.image,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const paragraphs = product.description
    .split(/\r?\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="py-14">
      <JsonLd
        data={productSchema({
          name: product.title,
          description: product.excerpt,
          slug: product.slug,
          image: product.image,
        })}
      />
      <div className="mx-auto max-w-7xl px-4">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: product.categoryName, path: `/product-category/${product.category}` },
            { name: product.title, path: `/product/${product.slug}` },
          ]}
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.7)]">
            <Image
              src={product.image}
              alt={`Wholesale ${product.title} from Thailand`}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <div
            className="card-elevated animate-fade-up rounded-3xl p-8 lg:sticky lg:top-28"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="mb-3 inline-block rounded-full bg-brand-green/10 px-3 py-1 text-sm font-semibold text-brand-green">
              {product.categoryName}
            </span>
            <h1 className="mb-6 text-3xl font-bold leading-tight text-slate-900 md:text-4xl">
              {product.title}
            </h1>
            <AnswerCapsule>
              {product.title} is a Thailand-origin wholesale grade from UFI. Request packing,
              volume, destination, and Incoterm on the quote form — export parcels are priced
              commercially, not on a public list.
            </AnswerCapsule>

            <div id="quote" className="scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="mb-1 text-lg font-bold text-slate-900">Request a quote</h2>
              <p className="mb-4 text-sm text-slate-600">
                Tell us your quantity, destination, and timeline — we&apos;ll send pricing details.
              </p>
              <EnquiryForm productSlug={product.slug} productTitle={product.title} />
            </div>
          </div>
        </div>

        <ProductDescription product={product} paragraphs={paragraphs} />
        <RelatedLinks
          page="product"
          currentPath={`/product/${product.slug}`}
          extraInternal={[
            {
              href: `/product-category/${product.category}`,
              anchor: `${product.categoryName} wholesale sugar`,
            },
          ]}
        />
      </div>
    </section>
  );
}
