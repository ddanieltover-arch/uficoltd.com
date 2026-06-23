"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageSquare } from "lucide-react";
import type { Product } from "@/types";
import { ScaleOnHover, Stagger, StaggerItem } from "@/components/shared/motion";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const quoteHref = `/product/${product.slug}#quote`;

  return (
    <ScaleOnHover>
      <article className="card-elevated group relative overflow-hidden rounded-2xl">
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          <Link href={`/product/${product.slug}`} className="absolute inset-0 z-0">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </Link>
          <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur transition group-hover:bg-brand-green">
            {product.categoryName}
          </span>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 translate-y-full bg-gradient-to-t from-slate-900/80 to-transparent p-4 transition duration-500 group-hover:translate-y-0">
            <span className="text-sm font-semibold text-white">View details →</span>
          </div>
          <Link
            href={quoteHref}
            aria-label={`Get a quote for ${product.title}`}
            className={cn(
              "absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-full",
              "bg-gradient-to-r from-brand-green to-brand-green-dark px-3 py-2 text-xs font-semibold text-white",
              "shadow-lg shadow-brand-green/35 ring-2 ring-white/90",
              "transition-all duration-300 ease-out",
              "translate-x-3 translate-y-3 scale-90 opacity-0",
              "group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100",
              "hover:brightness-110 active:scale-95",
              "max-sm:translate-x-0 max-sm:translate-y-0 max-sm:scale-100 max-sm:opacity-100",
              "md:px-4 md:text-sm",
            )}
          >
            <MessageSquare className="h-3.5 w-3.5 md:h-4 md:w-4" />
            Get a quote
          </Link>
        </div>
        <Link href={`/product/${product.slug}`} className="block p-5">
          <h3 className="mb-2 text-base font-semibold text-slate-900 transition group-hover:text-brand-green">
            {product.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">{product.excerpt}</p>
          <span className="mt-3 inline-block text-sm font-semibold text-brand-green transition group-hover:translate-x-1">
            Read more →
          </span>
        </Link>
      </article>
    </ScaleOnHover>
  );
}

export function ProductGrid({
  products,
  animated = false,
}: {
  products: Product[];
  animated?: boolean;
}) {
  if (products.length === 0) {
    return <p className="py-12 text-center text-slate-600">No products found.</p>;
  }

  if (animated) {
    return (
      <Stagger className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-7">
        {products.map((product) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} />
          </StaggerItem>
        ))}
      </Stagger>
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
      className="group relative block overflow-hidden rounded-2xl border border-slate-200 shadow-[0_20px_55px_-45px_rgba(15,23,42,0.7)]"
    >
      <div className="relative aspect-[4/3] bg-slate-800">
        {image && (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover opacity-80 transition duration-700 group-hover:scale-110"
            sizes="25vw"
          />
        )}
        <div className="absolute inset-0 bg-black/40 transition duration-500 group-hover:bg-black/25" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white">
          <h3 className="text-xl font-bold transition group-hover:scale-105">{name}</h3>
          <p className="mt-1 text-sm text-white/90">{count} Products</p>
        </div>
      </div>
    </Link>
  );
}
