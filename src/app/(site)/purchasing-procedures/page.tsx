import type { Metadata } from "next";
import { InfoPageContent } from "@/components/sections/InfoPageContent";
import { getPage } from "@/lib/content";
import { productImages } from "@/lib/site-images";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Purchasing Procedures",
};

export default async function PurchasingPage() {
  const page = await getPage("purchasing-procedures");

  return (
    <InfoPageContent
      page={page}
      eyebrow="How to order"
      heroImage={productImages.purchasing}
      heroImageAlt="Loading sugar bags into export shipping container"
    />
  );
}
