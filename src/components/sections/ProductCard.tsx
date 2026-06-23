import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_-45px_rgba(15,23,42,0.6)] transition duration-300 hover:-translate-y-1 hover:border-brand-green/40 hover:shadow-[0_25px_70px_-45px_rgba(11,162,46,0.55)]">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          <span className="absolute left-3 top-3 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {product.categoryName}
          </span>
        </div>
        <div className="p-5">
          <h3 className="mb-2 text-base font-semibold text-slate-900 group-hover:text-brand-green">
            {product.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">{product.excerpt}</p>
          <span className="mt-3 inline-block text-sm font-semibold text-brand-green">
            Read more →
          </span>
        </div>
      </Link>
    </article>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="py-12 text-center text-slate-600">No products found.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-7">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export function CategoryCard({
  slug,
  name,
  count,
  image,
}: {
  slug: string;
  name: string;
  count: number;
  image?: string;
}) {
  return (
    <Link
      href={`/product-category/${slug}`}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 shadow-[0_20px_55px_-45px_rgba(15,23,42,0.7)]"
    >
      <div className="relative aspect-[4/3] bg-slate-800">
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover opacity-80 transition group-hover:scale-105"
            sizes="25vw"
          />
        )}
        <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/30" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="mt-1 text-sm text-white/90">{count} Products</p>
        </div>
      </div>
    </Link>
  );
}
