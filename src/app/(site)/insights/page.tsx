import Link from "next/link";
import { PageBanner } from "@/components/layout/SiteChrome";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { getArticles } from "@/lib/content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Sugar Export Insights",
  description:
    "Guides for importers and manufacturers: ICUMSA grades, importing refined sugar from Thailand, packaging, MOQ, and quality specifications.",
  path: "/insights",
});

export default async function InsightsPage() {
  const articles = await getArticles();

  return (
    <>
      <PageBanner title="Insights" />
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Insights", path: "/insights" },
            ]}
          />
          <AnswerCapsule>
            These articles explain how wholesale refined sugar from Thailand is specified,
            packed, and imported — ICUMSA grades, documents, and RFQ fields — for procurement
            and QA teams.
          </AnswerCapsule>
          <p className="mb-10 text-slate-600">
            Also see the{" "}
            <Link href="/faq" className="font-medium text-brand-green hover:underline">
              FAQ
            </Link>{" "}
            and{" "}
            <Link href="/glossary" className="font-medium text-brand-green hover:underline">
              glossary
            </Link>
            .
          </p>
          <ul className="space-y-6">
            {articles.map((article) => (
              <li key={article.slug}>
                <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-slate-900">
                    <Link
                      href={`/insights/${article.slug}`}
                      className="hover:text-brand-green"
                    >
                      {article.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-slate-600">{article.excerpt}</p>
                  <Link
                    href={`/insights/${article.slug}`}
                    className="mt-4 inline-block text-sm font-semibold text-brand-green hover:underline"
                  >
                    Read article
                  </Link>
                </article>
              </li>
            ))}
          </ul>
          <RelatedLinks page="insights" currentPath="/insights" />
        </div>
      </section>
    </>
  );
}
