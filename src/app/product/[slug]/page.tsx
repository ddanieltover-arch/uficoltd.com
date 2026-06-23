import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EnquiryForm } from "@/components/sections/Forms";
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

  const paragraphs = product.description.split(/\n\n+/).filter(Boolean);

  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4">
        <nav className="mb-8 text-sm text-slate-500">
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

        <div className="grid gap-10 lg:grid-cols-2">
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

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <span className="mb-2 inline-block rounded-full bg-brand-green/10 px-3 py-1 text-sm font-semibold text-brand-green">
              {product.categoryName}
            </span>
            <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">{product.title}</h1>
            <p className="mb-8 text-lg leading-relaxed text-slate-600">{product.excerpt}</p>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="mb-4 text-lg font-bold text-slate-900">Request a quote</h2>
              <EnquiryForm productSlug={product.slug} productTitle={product.title} />
            </div>
          </div>
        </div>

        <div className="prose prose-slate mt-14 max-w-none rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Description</h2>
          {paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="leading-relaxed text-slate-700">
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
