import type { Metadata } from "next";
import Image from "next/image";
import { PageBanner } from "@/components/layout/SiteChrome";
import { getPage } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  const page = getPage("about-us");

  return (
    <>
      <PageBanner title={page.title} />
      <section className="py-6">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 md:grid-cols-3">
          {[
            "https://uficoltd.com/wp-content/uploads/2024/07/sugarvsugars-brown-whitesugar-e1528986901183.webp",
            "https://uficoltd.com/wp-content/uploads/2024/07/3274507.jpg",
            "https://uficoltd.com/wp-content/uploads/2024/07/sugar.jpg",
          ].map((src, i) => (
            <div key={src} className={`relative overflow-hidden rounded-xl ${i === 1 ? "md:row-span-1 h-80" : "h-64"}`}>
              <Image src={src} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-sm md:px-10">
          <h2 className="mb-8 text-center text-3xl font-bold text-slate-900">What We Do</h2>
          <div className="space-y-5 text-slate-700 leading-relaxed">
            {page.paragraphs.map((p) => (
              <p key={p.slice(0, 50)}>{p}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="relative py-24 text-center text-white">
        <Image
          src="https://uficoltd.com/wp-content/uploads/2024/07/Sugar-Cane-Harvesting_Web.webp"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <h2 className="relative text-4xl font-bold">Reliable Supply Chain</h2>
      </section>
    </>
  );
}
