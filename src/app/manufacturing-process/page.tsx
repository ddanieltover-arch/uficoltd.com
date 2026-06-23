import type { Metadata } from "next";
import Image from "next/image";
import { PageBanner } from "@/components/layout/SiteChrome";
import { getPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "Manufacturing Process",
};

export default function ManufacturingPage() {
  const page = getPage("manufacturing-process");

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
        <div className="mx-auto mt-10 max-w-5xl px-4">
          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="https://uficoltd.com/wp-content/uploads/2024/07/overview.webp"
              alt="Sugar manufacturing"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
