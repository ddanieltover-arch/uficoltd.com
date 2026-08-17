import Link from "next/link";
import { PageBanner } from "@/components/layout/SiteChrome";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { getGlossary } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Sugar and ICUMSA Glossary",
  description:
    "Definitions for ICUMSA, refined white sugar, polarity, FOB, CIF, MOQ, and other terms used in Thai wholesale sugar export contracts.",
  path: "/glossary",
});

export default function GlossaryPage() {
  const terms = getGlossary();

  return (
    <>
      <PageBanner title="Sugar glossary" />
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Insights", path: "/insights" },
              { name: "Glossary", path: "/glossary" },
            ]}
          />
          <AnswerCapsule>
            ICUMSA is a colour scale for sugar: a lower number means a whiter, more highly
            refined crystal. The terms below are the language used on Thai wholesale export
            contracts.
          </AnswerCapsule>
          <p className="mb-10 text-slate-600">
            For longer explainers, see{" "}
            <Link
              href="/insights/what-is-icumsa-sugar-grade"
              className="font-medium text-brand-green hover:underline"
            >
              what an ICUMSA grade is
            </Link>{" "}
            and the{" "}
            <Link href="/faq" className="font-medium text-brand-green hover:underline">
              export FAQ
            </Link>
            .
          </p>
          <dl className="space-y-8">
            {terms.map((item) => (
              <div key={item.slug} id={item.slug} className="scroll-mt-28">
                <dt>
                  <h2 className="text-xl font-bold text-slate-900">{item.term}</h2>
                </dt>
                <dd className="mt-2 text-base leading-relaxed text-slate-600">
                  {item.definition}
                </dd>
              </div>
            ))}
          </dl>
          <RelatedLinks page="glossary" currentPath="/glossary" />
        </div>
      </section>
    </>
  );
}
