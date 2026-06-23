import Image from "next/image";
import { CompanySubNav } from "@/components/layout/CompanySubNav";
import { ButtonLink } from "@/components/ui/Button";
import { parsePageSections } from "@/lib/format-page-content";
import type { PageContent } from "@/types";

type InfoPageContentProps = {
  page: PageContent;
  eyebrow: string;
  heroImage?: string;
  heroImageAlt?: string;
};

export function InfoPageContent({
  page,
  eyebrow,
  heroImage,
  heroImageAlt = "",
}: InfoPageContentProps) {
  const { intro, sections } = parsePageSections(page.paragraphs);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pb-2 pt-8">
        <div
          className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-brand-green/5 blur-3xl"
          aria-hidden
        />
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
                {eyebrow}
              </p>
              <h1 className="heading-accent mb-5 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
                {page.title}
              </h1>
              {intro && (
                <p className="max-w-xl text-lg leading-relaxed text-slate-600">{intro}</p>
              )}
            </div>
            {heroImage && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] ring-1 ring-slate-200/80">
                <Image
                  src={heroImage}
                  alt={heroImageAlt || page.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 via-transparent to-transparent" />
              </div>
            )}
          </div>
        </div>
      </section>

      <CompanySubNav />

      {/* Sections */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="space-y-6">
            {sections.map((section, index) => (
              <article
                key={`${section.title}-${index}`}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_-45px_rgba(15,23,42,0.5)]"
              >
                <div className="flex items-start gap-4 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-6 py-5 md:px-8">
                  {section.number !== undefined && (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green text-sm font-bold text-white shadow-md shadow-brand-green/25">
                      {section.number}
                    </span>
                  )}
                  <h2 className="pt-1.5 text-lg font-bold text-slate-900 md:text-xl">
                    {section.title}
                  </h2>
                </div>
                <div className="space-y-5 px-6 py-6 md:px-8">
                  {section.blocks.map((block, blockIndex) => (
                    <div key={`${block.label ?? "body"}-${blockIndex}`}>
                      {block.label && (
                        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-green">
                          {block.label}
                        </h3>
                      )}
                      {block.body && (
                        <p className="text-base leading-[1.85] text-slate-600">{block.body}</p>
                      )}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl bg-gradient-to-br from-brand-navy to-slate-800 p-6 text-white md:flex-row md:items-center md:p-8">
            <div>
              <p className="font-semibold">Ready to place an order?</p>
              <p className="mt-1 text-sm text-white/80">
                Browse our catalogue or contact sales for wholesale pricing and export terms.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/shop" className="!bg-white !text-brand-navy hover:!bg-slate-100">
                View products
              </ButtonLink>
              <ButtonLink href="/contact-us" variant="secondary">
                Contact sales
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
