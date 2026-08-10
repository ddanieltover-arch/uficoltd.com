import { ShopPageContent } from "@/components/sections/ShopPageContent";
import { getCategories, getProducts } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  return <ShopPageContent products={products} categories={categories} />;
}
