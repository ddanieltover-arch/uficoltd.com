import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/sections/Forms";
import { ProductDescription } from "@/components/sections/ProductDescription";
import { getProductBySlug, products } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.title,
    description: product.excerpt,
    openGraph: { images: [{ url: product.image }] },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const paragraphs = product.description
    .split(/\r?\n\r?\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="mb-8 animate-fade-up text-sm text-slate-500">
          <Link href="/shop" className="hover:text-brand-green">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <Link href={`/product-category/${product.category}`} className="hover:text-brand-green">
            {product.categoryName}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900">{product.title}</span>
        </nav>

        {/* Image + quote — no description here */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.7)]">
            <Image
              src={product.image}
              alt={product.title}
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

            <div id="quote" className="scroll-mt-28 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="mb-1 text-lg font-bold text-slate-900">Request a quote</h2>
              <p className="mb-4 text-sm text-slate-600">
                Tell us your quantity, destination, and timeline — we&apos;ll send pricing details.
              </p>
              <EnquiryForm productSlug={product.slug} productTitle={product.title} />
            </div>
          </div>
        </div>

        {/* All description content below */}
        <ProductDescription product={product} paragraphs={paragraphs} />
      </div>
    </section>
  );
}
