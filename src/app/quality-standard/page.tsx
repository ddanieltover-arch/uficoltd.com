import type { Metadata } from "next";
import { InfoPageContent } from "@/components/sections/InfoPageContent";
import { getPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Quality Standard",
};

export default function QualityPage() {
  const page = getPage("quality-standard");

  return (
    <InfoPageContent
      page={page}
      eyebrow="Our commitment"
      heroImage="/images/products/Special-Grade-White-Sugar.webp"
      heroImageAlt="Special grade white sugar"
    />
  );
}
