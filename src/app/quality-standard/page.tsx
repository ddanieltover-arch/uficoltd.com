import type { Metadata } from "next";
import { InfoPageContent } from "@/components/sections/InfoPageContent";
import { getPage } from "@/lib/content";
import { productImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Quality Standard",
};

export default function QualityPage() {
  const page = getPage("quality-standard");

  return (
    <InfoPageContent
      page={page}
      eyebrow="Our commitment"
      heroImage={productImages.quality}
      heroImageAlt="Range of sugar varieties and quality grades"
    />
  );
}
