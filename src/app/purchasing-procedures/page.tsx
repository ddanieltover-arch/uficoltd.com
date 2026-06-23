import type { Metadata } from "next";
import { InfoPageContent } from "@/components/sections/InfoPageContent";
import { getPage } from "@/lib/content";
import { productImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Purchasing Procedures",
};

export default function PurchasingPage() {
  const page = getPage("purchasing-procedures");

  return (
    <InfoPageContent
      page={page}
      eyebrow="How to order"
      heroImage={productImages.purchasing}
      heroImageAlt="Loading sugar bags into export shipping container"
    />
  );
}
