import type { Metadata } from "next";
import { InfoPageContent } from "@/components/sections/InfoPageContent";
import { getPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Manufacturing Process",
};

export default function ManufacturingPage() {
  const page = getPage("manufacturing-process");

  return (
    <InfoPageContent
      page={page}
      eyebrow="How we produce"
      heroImage="/images/products/Untitled-design-6-1.webp"
      heroImageAlt="Sugar manufacturing"
    />
  );
}
