import { HomePage } from "@/components/sections/HomePage";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageSchema } from "@/lib/schema";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Wholesale Refined Sugar from Thailand",
  description:
    "United Farmer and Industry Co LTD exports wholesale refined sugar from Khonkaen, Thailand — ICUMSA 45, white refined grades, and bulk RFQ supply for importers.",
  path: "/",
});

const homeFaqs = [
  {
    question: "Who is UFI Co., LTD?",
    answer:
      "United Farmer and Industry Co LTD is a Thailand-based exporter of wholesale refined sugar, supplying ICUMSA-graded and related sugars to international buyers.",
  },
  {
    question: "How do I buy sugar in bulk?",
    answer:
      "Request a quote with grade, volume, destination, packing, and Incoterm. We do not sell at retail checkout prices on this site.",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd data={faqPageSchema(homeFaqs)} />
      <HomePage />
    </>
  );
}
