import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageBanner } from "@/components/layout/SiteChrome";
import { AnswerCapsule } from "@/components/seo/AnswerCapsule";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { RelatedLinks } from "@/components/seo/RelatedLinks";
import { getArticleBySlug } from "@/lib/content";
import { articleSchema } from "@/lib/schema";
import { buildPageMetadata, truncateMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

function BulkSugarOceanFreightLink() {
  return (
    <p className="text-base leading-[1.85] text-slate-600">
      Buyers who book FOB freight can arrange{" "}
      <a
        href="https://nexships.com/services#ocean-freight"
        className="font-semibold text-brand-green hover:underline"
        rel="noopener noreferrer"
      >
        FCL ocean freight for bulk sugar
      </a>{" "}
      to the named destination port.
    </p>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return buildPageMetadata({
    title: article.metaTitle ?? article.title,
    description: truncateMeta(article.metaDescription ?? article.excerpt),
    path: `/insights/${article.slug}`,
    type: "article",
  });
}

export default async function InsightArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const [first, ...rest] = article.paragraphs;
  const sugarImportSlug = slug === "how-to-import-refined-sugar-from-thailand";
  const hasIncotermParagraph = rest.some((paragraph) =>
    paragraph.startsWith("Agree the Incoterm"),
  );

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: article.title,
          description: article.excerpt,
          slug: article.slug,
          datePublished: article.publishedAt,
          dateModified: article.updatedAt,
        })}
      />
      <PageBanner title={article.title} />
      <article className="py-12">
        <div className="mx-auto max-w-3xl px-4">
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Insights", path: "/insights" },
              { name: article.title, path: `/insights/${article.slug}` },
            ]}
          />
          {article.publishedAt ? (
            <p className="mb-6 text-sm text-slate-500">
              Last updated:{" "}
              {new Date(article.updatedAt ?? article.publishedAt).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          ) : null}
          {first ? <AnswerCapsule>{first}</AnswerCapsule> : null}
          <div className="space-y-6">
            {rest.map((paragraph) => (
              <div key={paragraph.slice(0, 48)}>
                <p className="text-base leading-[1.85] text-slate-600">{paragraph}</p>
                {sugarImportSlug && paragraph.startsWith("Agree the Incoterm") ? (
                  <div className="mt-6">
                    <BulkSugarOceanFreightLink />
                  </div>
                ) : null}
              </div>
            ))}
            {sugarImportSlug && !hasIncotermParagraph ? <BulkSugarOceanFreightLink /> : null}
          </div>
          <p className="mt-12 rounded-2xl bg-slate-50 p-6 text-slate-700">
            Ready to specify a grade?{" "}
            <Link href="/shop" className="font-semibold text-brand-green hover:underline">
              Browse products
            </Link>{" "}
            or{" "}
            <Link href="/contact-us" className="font-semibold text-brand-green hover:underline">
              request a quote
            </Link>
            .
          </p>
          <RelatedLinks page="insight" insightSlug={article.slug} />
        </div>
      </article>
    </>
  );
}
