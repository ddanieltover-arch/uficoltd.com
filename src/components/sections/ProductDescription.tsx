import { FileText, Sparkles } from "lucide-react";
import type { Product } from "@/types";
import { ButtonLink } from "@/components/ui/Button";

type ProductDescriptionProps = {
  product: Product;
  paragraphs: string[];
};

export function ProductDescription({ product, paragraphs }: ProductDescriptionProps) {
  return (
    <section className="mt-14 md:mt-16" aria-labelledby="product-description-heading">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_70px_-45px_rgba(15,23,42,0.45)]">
        {/* Header strip */}
        <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 via-white to-brand-green/5 px-6 py-8 md:px-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green text-white shadow-lg shadow-brand-green/25">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
                  Product details
                </p>
                <h2
                  id="product-description-heading"
                  className="heading-accent mt-1 text-2xl font-bold text-slate-900 md:text-3xl"
                >
                  About {product.title}
                </h2>
              </div>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-green/20 bg-brand-green/5 px-4 py-2 text-sm font-medium text-brand-green-dark">
              <Sparkles className="h-4 w-4" />
              {product.categoryName}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-10 md:px-10 md:py-12">
          {/* Short summary / excerpt */}
          <div className="relative mb-10 rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-white p-6 md:p-8">
            <div className="absolute left-0 top-6 bottom-6 w-1 rounded-full bg-gradient-to-b from-brand-green to-brand-green-light md:top-8 md:bottom-8" />
            <p className="pl-5 text-lg leading-relaxed text-slate-700 md:pl-6 md:text-xl md:leading-relaxed">
              {product.excerpt}
            </p>
          </div>

          {/* Full description */}
          {paragraphs.length > 0 && (
            <div className="mx-auto max-w-4xl">
              <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">
                Full description
              </h3>
              <div className="space-y-6">
                {paragraphs.map((paragraph, index) => (
                  <p
                    key={`${index}-${paragraph.slice(0, 32)}`}
                    className="text-base leading-[1.85] text-slate-600 md:text-[1.05rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* Footer CTA */}
          <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl bg-gradient-to-br from-brand-navy to-slate-800 p-6 text-white md:flex-row md:items-center md:p-8">
            <div>
              <p className="font-semibold">Need pricing or bulk quantities?</p>
              <p className="mt-1 text-sm text-white/80">
                Request a quote and our sales team will respond within 1–2 business days.
              </p>
            </div>
            <ButtonLink href="#quote" className="!bg-white !text-brand-navy hover:!bg-slate-100">
              Get a quote
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
