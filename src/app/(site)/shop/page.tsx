import { ShopPageContent } from "@/components/sections/ShopPageContent";
import { getCategories, getProducts } from "@/lib/content";
import { buildPageMetadata, PAGE_REVALIDATE_SECONDS } from "@/lib/seo";

export const revalidate = PAGE_REVALIDATE_SECONDS;

export const metadata = buildPageMetadata({
  title: "Bulk Refined White Sugar",
  description:
    "Browse wholesale refined sugar from Thailand: ICUMSA grades, white refined sugars, Thai sugars, and common sugars. Request a bulk quote — no public price list.",
  path: "/shop",
});

export default async function ShopPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  return <ShopPageContent products={products} categories={categories} />;
}
