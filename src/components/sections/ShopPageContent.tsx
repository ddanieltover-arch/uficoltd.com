"use client";

import { useMemo, useState } from "react";
import { PageBanner } from "@/components/layout/SiteChrome";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { CategoryCard, ProductGrid } from "@/components/sections/ProductCard";
import { categoryImages } from "@/lib/site-images";
import type { Category, Product } from "@/types";

export function ShopPageContent({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    let list = products;
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q),
      );
    }
    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }
    return list;
  }, [products, query, category]);

  return (
    <>
      <PageBanner title="Wholesale refined sugar" />
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4">
          <p className="mb-4 max-w-3xl text-lg text-slate-700">
            <strong className="text-slate-900">Quick answer: </strong>
            This catalogue is bulk refined sugar from Thailand — ICUMSA, white refined, Thai,
            and common grades — quoted by volume and destination, not sold at a public retail
            price.
          </p>
          <p className="mb-10 max-w-3xl text-slate-600">
            New to the grades? Read{" "}
            <a href="/insights/icumsa-45-vs-100-150" className="font-medium text-brand-green hover:underline">
              ICUMSA 45 vs 100-150
            </a>
            , the{" "}
            <a href="/glossary" className="font-medium text-brand-green hover:underline">
              glossary
            </a>
            , or{" "}
            <a href="/contact-us" className="font-medium text-brand-green hover:underline">
              request a quote
            </a>
            .
          </p>
          <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex md:items-center md:justify-between">
            <p className="text-sm font-medium text-slate-600">
              Showing <span className="font-bold text-brand-green">{filtered.length}</span> of{" "}
              {products.length} products
            </p>
            <div className="mt-4 flex flex-wrap gap-3 md:mt-0">
              <input
                type="search"
                placeholder="Search products..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="input-field !w-auto min-w-[200px] rounded-full"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field !w-auto rounded-full"
              >
                <option value="all">All categories</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.slug}
                slug={cat.slug}
                name={cat.name}
                count={cat.count}
                image={categoryImages[cat.slug]}
              />
            ))}
          </div>

          <ProductGrid products={filtered} animated />
          <RelatedLinks page="shop" currentPath="/shop" />
        </div>
      </section>
    </>
  );
}
