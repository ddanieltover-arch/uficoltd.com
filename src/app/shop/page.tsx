"use client";

import { useMemo, useState } from "react";
import { PageBanner } from "@/components/layout/SiteChrome";
import { CategoryCard, ProductGrid } from "@/components/sections/ProductCard";
import { categoryImages } from "@/lib/site-images";
import { categories, products, searchProducts } from "@/lib/content";

export default function ShopPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    let list = searchProducts(query);
    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }
    return list;
  }, [query, category]);

  return (
    <>
      <PageBanner title="Our Products" />
      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4">
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
        </div>
      </section>
    </>
  );
}
