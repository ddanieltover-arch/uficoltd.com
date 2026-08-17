import { InfoPageContent } from "@/components/sections/InfoPageContent";
import { purchasingFaqs } from "@/config/page-faqs";
import { getPage } from "@/lib/content";
import { productImages } from "@/lib/site-images";
import { buildPageMetadata, truncateMeta } from "@/lib/seo";

export async function generateMetadata() {
  const page = await getPage("purchasing-procedures");
  return buildPageMetadata({
    title: page.metaTitle ?? "How to Buy Wholesale Sugar from Thailand",
    description: truncateMeta(
      page.metaDescription ??
        "Purchasing procedures for Thai wholesale refined sugar: enquiry, specification, Incoterms, export documents, and shipment — no website checkout.",
    ),
    path: "/purchasing-procedures",
  });
}

export default async function PurchasingPage() {
  const page = await getPage("purchasing-procedures");

  return (
    <InfoPageContent
      page={page}
      eyebrow="How to order"
      heroImage={productImages.purchasing}
      heroImageAlt="Loading sugar bags into an export shipping container"
      answer="Buy wholesale sugar by sending grade, volume, destination, packing, and Incoterm. UFI quotes commercially and issues export documents — there is no cart or public price list."
      faqs={purchasingFaqs}
      relatedPage="purchasing"
    />
  );
}
