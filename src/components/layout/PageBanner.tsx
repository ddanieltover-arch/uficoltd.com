"use client";

import { FadeIn } from "@/components/shared/motion";
import { ButtonLink } from "@/components/ui/Button";

export function PageBanner({
  title,
  showShopButton = true,
}: {
  title: string;
  showShopButton?: boolean;
}) {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-14">
      <div className="mx-auto max-w-7xl px-4">
        <FadeIn>
          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-[0_20px_60px_-40px_rgba(2,6,23,0.6)] md:flex md:items-center md:justify-between md:px-10">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
                UFI Co., LTD
              </p>
              <h1 className="heading-accent text-3xl font-bold text-slate-900 md:text-4xl">
                {title}
              </h1>
            </div>
            {showShopButton && (
              <div className="mt-5 md:mt-0">
                <ButtonLink href="/shop">Browse Products</ButtonLink>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
