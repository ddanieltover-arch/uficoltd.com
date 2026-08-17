import { InfoPageContent } from "@/components/sections/InfoPageContent";
import { qualityFaqs } from "@/config/page-faqs";
import { getPage } from "@/lib/content";
import { productImages } from "@/lib/site-images";
import { buildPageMetadata, truncateMeta } from "@/lib/seo";

export async function generateMetadata() {
  const page = await getPage("quality-standard");
  return buildPageMetadata({
    title: page.metaTitle ?? "Refined Sugar Quality Standards",
    description: truncateMeta(
      page.metaDescription ??
        "How UFI specifies export sugar quality: ICUMSA colour grades, mill refining, packing, and shipment documents for wholesale buyers.",
    ),
    path: "/quality-standard",
  });
}

export default async function QualityPage() {
  const page = await getPage("quality-standard");

  return (
    <InfoPageContent
      page={page}
      eyebrow="Our commitment"
      heroImage={productImages.quality}
      heroImageAlt="Range of sugar varieties and quality grades for export"
      answer="Export quality is a written specification — typically an ICUMSA colour grade plus packing and certificates — checked through refining and documents, not a marketing adjective."
      faqs={qualityFaqs}
      relatedPage="quality"
    />
  );
}
