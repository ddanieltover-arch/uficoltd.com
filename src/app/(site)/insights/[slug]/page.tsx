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
import { buildPageMetadata, PAGE_REVALIDATE_SECONDS, truncateMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = PAGE_REVALIDATE_SECONDS;

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
              <p key={paragraph.slice(0, 48)} className="text-base leading-[1.85] text-slate-600">
                {paragraph}
              </p>
            ))}
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
