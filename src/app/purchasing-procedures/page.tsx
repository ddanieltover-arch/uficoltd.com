import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/SiteChrome";
import { getPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Purchasing Procedures",
};

export default function PurchasingPage() {
  const page = getPage("purchasing-procedures");

  return (
    <>
      <PageBanner title={page.title} />
      <section className="py-12">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="space-y-4 text-slate-700 leading-relaxed">
            {page.paragraphs.map((p) => (
              <p key={p.slice(0, 50)}>{p}</p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
