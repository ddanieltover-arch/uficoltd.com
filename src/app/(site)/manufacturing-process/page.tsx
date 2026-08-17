import { InfoPageContent } from "@/components/sections/InfoPageContent";
import { manufacturingFaqs } from "@/config/page-faqs";
import { getPage } from "@/lib/content";
import { productImages } from "@/lib/site-images";
import { buildPageMetadata, PAGE_REVALIDATE_SECONDS, truncateMeta } from "@/lib/seo";

export const revalidate = PAGE_REVALIDATE_SECONDS;

export async function generateMetadata() {
  const page = await getPage("manufacturing-process");
  return buildPageMetadata({
    title: page.metaTitle ?? "Sugar Manufacturing Process in Thailand",
    description: truncateMeta(
      page.metaDescription ??
        "How cane becomes export refined sugar: harvest, milling, crystallisation, refining, drying, and packing — the process behind Thai wholesale grades.",
    ),
    path: "/manufacturing-process",
  });
}

export default async function ManufacturingPage() {
  const page = await getPage("manufacturing-process");

  return (
    <InfoPageContent
      page={page}
      eyebrow="How we produce"
      heroImage={productImages.manufacturing}
      heroImageAlt="Industrial sugar processing and bagging facility in Thailand"
      answer="Refined export sugar is produced by crushing cane, clarifying and evaporating juice, crystallising sucrose, then refining, drying, and packing to a named grade such as ICUMSA 45."
      faqs={manufacturingFaqs}
      relatedPage="manufacturing"
    />
  );
}
