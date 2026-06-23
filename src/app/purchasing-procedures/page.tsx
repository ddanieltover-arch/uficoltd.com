import type { Metadata } from "next";
import { InfoPageContent } from "@/components/sections/InfoPageContent";
import { getPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Purchasing Procedures",
};

export default function PurchasingPage() {
  const page = getPage("purchasing-procedures");

  return (
    <InfoPageContent
      page={page}
      eyebrow="How to order"
      heroImage="/images/products/Wholesale-Refined-White-Sugar.webp"
      heroImageAlt="Wholesale refined white sugar"
    />
  );
}
