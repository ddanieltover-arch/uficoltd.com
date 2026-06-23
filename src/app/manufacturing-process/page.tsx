import type { Metadata } from "next";
import { InfoPageContent } from "@/components/sections/InfoPageContent";
import { getPage } from "@/lib/content";
import { productImages } from "@/lib/site-images";

export const metadata: Metadata = {
  title: "Manufacturing Process",
};

export default function ManufacturingPage() {
  const page = getPage("manufacturing-process");

  return (
    <InfoPageContent
      page={page}
      eyebrow="How we produce"
      heroImage={productImages.manufacturing}
      heroImageAlt="Industrial sugar processing and bagging facility"
    />
  );
}
