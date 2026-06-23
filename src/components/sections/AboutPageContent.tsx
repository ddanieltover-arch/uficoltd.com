"use client";

import Image from "next/image";
import { Award, Globe2, Leaf, Users } from "lucide-react";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/motion";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/content";
import type { PageContent } from "@/types";

const GALLERY = [
  {
    src: "/images/products/Fine-Grain-White-Sugar.webp",
    alt: "Fine grain white sugar",
  },
  {
    src: "/images/products/Refined-Icumsa-45-RBU-Standard.webp",
    alt: "ICUMSA 45 refined sugar",
  },
  {
    src: "/images/products/Thai-Brown-Sugar.webp",
    alt: "Thai brown sugar",
  },
] as const;

const VALUES = [
  {
    icon: Leaf,
    title: "Rooted in Thailand",
    text: "Sugar cultivated and refined with the care and tradition of Thai agriculture.",
  },
  {
    icon: Globe2,
    title: "Global export partner",
    text: "Supplying wholesale refined sugar to buyers across international markets.",
  },
  {
    icon: Award,
    title: "Quality assured",
    text: "Rigorous standards from field to shipment, meeting ICUMSA specifications.",
  },
  {
    icon: Users,
    title: "Relationship driven",
    text: "Long-term partnerships built on transparency, reliability, and responsive service.",
  },
] as const;

const HERO_IMAGE = "/images/products/Wholesale-Refined-White-Sugar.webp";

export function AboutPageContent({ page }: { page: PageContent }) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pb-4 pt-8">
        <div
          className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-brand-navy/5 blur-3xl"
          aria-hidden
        />
        <div className="mx-auto max-w-7xl px-4">
          <FadeIn>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
                  {site.shortName}
                </p>
                <h1 className="heading-accent mb-5 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
                  {page.title}
                </h1>
                <p className="mb-8 max-w-lg text-lg leading-relaxed text-slate-600">
                  {site.tagline}. From Khonkaen, Thailand, we connect growers, mills, and
                  international buyers with premium refined sugar products.
                </p>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/shop">Our products</ButtonLink>
                  <ButtonLink href="/contact-us" variant="outline">
                    Get in touch
                  </ButtonLink>
                </div>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] ring-1 ring-slate-200/80">
                <Image
                  src={HERO_IMAGE}
                  alt="Sugar cane harvesting"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <p className="text-sm text-white/85">Established wholesale supplier</p>
                  <p className="text-xl font-bold">Premium Thai refined sugar</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4">
          <Stagger className="grid gap-4 md:grid-cols-3">
            {GALLERY.map((item, i) => (
              <StaggerItem key={item.src}>
                <div
                  className={`relative overflow-hidden rounded-2xl ring-1 ring-slate-200/80 ${i === 1 ? "h-72 md:h-80" : "h-56 md:h-64"}`}
                >
                  <Image src={item.src} alt={item.alt} fill className="object-cover" sizes="33vw" />
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4">
          <FadeIn>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_70px_-45px_rgba(15,23,42,0.45)]">
              <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-brand-green/5 px-6 py-8 md:px-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
                  Our story
                </p>
                <h2 className="heading-accent mt-2 text-2xl font-bold text-slate-900 md:text-3xl">
                  What we do
                </h2>
              </div>
              <div className="space-y-6 px-6 py-10 md:px-10">
                {page.paragraphs.map((paragraph, index) => (
                  <p
                    key={`${index}-${paragraph.slice(0, 32)}`}
                    className="text-base leading-[1.85] text-slate-600 md:text-[1.05rem]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4">
          <FadeIn className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
              Why choose us
            </p>
            <h2 className="text-3xl font-bold text-slate-900">Built on trust &amp; quality</h2>
          </FadeIn>
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, text }) => (
              <StaggerItem key={title}>
                <div className="card-elevated h-full rounded-2xl border border-slate-200/80 bg-white p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 font-bold text-slate-900">{title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Banner */}
      <section className="relative overflow-hidden py-24 text-center text-white">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-navy/70" />
        <FadeIn className="relative px-4">
          <h2 className="text-3xl font-bold md:text-4xl">Reliable supply chain</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/85">
            From inquiry to delivery — consistent quality, clear documentation, and dedicated
            export support.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="/purchasing-procedures" className="!bg-white !text-brand-navy hover:!bg-slate-100">
              Purchasing procedures
            </ButtonLink>
            <ButtonLink href="/manufacturing-process" variant="secondary">
              How we manufacture
            </ButtonLink>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
