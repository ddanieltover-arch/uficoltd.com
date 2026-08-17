import Link from "next/link";
import { PageBanner } from "@/components/layout/SiteChrome";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { getFaqs } from "@/lib/content";
import { faqPageSchema } from "@/lib/schema";
import { buildPageMetadata, PAGE_REVALIDATE_SECONDS } from "@/lib/seo";

export const revalidate = PAGE_REVALIDATE_SECONDS;

export const metadata = buildPageMetadata({
  title: "Sugar Export FAQ",
  description:
    "Answers for importers: ICUMSA grades, how to request a bulk sugar quote, packaging, documents, and where UFI Co., LTD is based in Khonkaen, Thailand.",
  path: "/faq",
});

export default function FaqPage() {
  const faqs = getFaqs();

  return (
    <>
      <JsonLd data={faqPageSchema(faqs)} />
      <PageBanner title="Sugar export FAQ" />
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Insights", path: "/insights" },
              { name: "FAQ", path: "/faq" },
            ]}
          />
          <AnswerCapsule>
            Wholesale refined sugar from Thailand is sold by specification — ICUMSA grade,
            packing, volume, and Incoterm — not by a website shopping cart. The questions
            below cover the enquiries UFI sales receives most often.
          </AnswerCapsule>
          <p className="mb-10 text-slate-600">
            Need a definition instead? Open the{" "}
            <Link href="/glossary" className="font-medium text-brand-green hover:underline">
              glossary
            </Link>{" "}
            or{" "}
            <Link href="/contact-us" className="font-medium text-brand-green hover:underline">
              request a quote
            </Link>
            .
          </p>
          <dl className="space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <dt>
                  <h2 className="text-lg font-bold text-slate-900">{faq.question}</h2>
                </dt>
                <dd className="mt-3 text-base leading-relaxed text-slate-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>
          <RelatedLinks page="faq" currentPath="/faq" />
        </div>
      </section>
    </>
  );
}
