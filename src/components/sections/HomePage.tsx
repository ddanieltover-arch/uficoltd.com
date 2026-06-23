import Image from "next/image";
import Link from "next/link";
import { Shield, Layers, Truck } from "lucide-react";
import { features, skills, testimonials } from "@/config/site";
import { categories, products, site } from "@/lib/content";
import { ContactForm } from "@/components/sections/Forms";
import { CategoryCard, ProductGrid } from "@/components/sections/ProductCard";
import { SectionHeading } from "@/components/layout/SiteChrome";

const HERO_IMAGE =
  "https://uficoltd.com/wp-content/uploads/2024/07/Sugar-Cane-Harvesting_Web.webp";
const INTRO_IMAGE =
  "https://uficoltd.com/wp-content/uploads/2024/07/sugarcane-being-harvested.webp";
const SKILLS_IMAGE =
  "https://uficoltd.com/wp-content/uploads/2024/07/Sugar-bum.webp";

const featureIcons = { shield: Shield, layers: Layers, truck: Truck };

const categoryImages: Record<string, string> = {
  "common-sugars": "https://uficoltd.com/wp-content/uploads/2024/07/sugarvsugars-brown-whitesugar-e1528986901183.webp",
  icumsa: "https://uficoltd.com/wp-content/uploads/2024/07/Refined-Icumsa-45-RBU-Standard.webp",
  "thai-sugars": "https://uficoltd.com/wp-content/uploads/2024/07/Thai-Brown-Sugar.webp",
  "white-refined-sugars": "https://uficoltd.com/wp-content/uploads/2024/07/Fine-Grain-White-Sugar.webp",
};

export function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden rounded-b-[2.5rem] bg-slate-900 text-white">
        <Image src={HERO_IMAGE} alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/35" />
        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-28 md:pt-32">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green-light">
              {site.shortName}
            </p>
            <h1 className="mb-5 text-4xl font-bold uppercase leading-tight md:text-6xl">
              Refined Sugars
              <span className="block text-brand-green-light">Pure, Premium</span>
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-white/90 md:text-xl">{site.tagline}</p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="rounded-full bg-brand-green px-8 py-3 font-semibold text-white transition hover:bg-brand-green-dark"
              >
                Explore Products
              </Link>
              <Link
                href="/contact-us"
                className="rounded-full border border-white/50 bg-white/5 px-8 py-3 font-semibold text-white transition hover:bg-white hover:text-slate-900"
              >
                Request Quote
              </Link>
            </div>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {["24+ Product Types", "Global Export Ready", "Strict Quality Control"].map((item) => (
              <div key={item} className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur">
                <p className="text-sm font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = featureIcons[feature.icon as keyof typeof featureIcons] ?? Shield;
            return (
              <div key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.6)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-slate-900">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
            <Image src={INTRO_IMAGE} alt="Sugarcane harvest" fill className="object-cover" />
          </div>
          <div>
            <p className="mb-2 font-semibold text-brand-green">{site.shortName}</p>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Thai Sugars Premium ICUMSA
            </h2>
            <p className="mb-6 text-slate-600">
              Unleash the Essence of Taste with our Exclusive Wholesale Refined White Sugar
            </p>
            <Link
              href="/shop"
              className="inline-flex rounded-full bg-brand-green px-6 py-3 font-semibold text-white transition hover:bg-brand-green-dark"
            >
              Shop Here!
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="mb-2 font-semibold uppercase tracking-wider text-brand-green">What We Do</p>
            <h2 className="mb-6 text-3xl font-bold text-slate-900">Our Skills</h2>
            <ul className="space-y-4">
              {skills.map((skill) => (
                <li key={skill} className="flex gap-3 text-slate-700">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
            <Image src={SKILLS_IMAGE} alt="Sugar production" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Catalog" title="Categories" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.slug}
                slug={cat.slug}
                name={cat.name}
                count={cat.count}
                image={categoryImages[cat.slug]}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50/60 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeading eyebrow="Featured" title="Our Products" />
          <ProductGrid products={products.slice(0, 12)} />
          <div className="mt-8 text-center">
            <Link
              href="/shop"
              className="inline-flex rounded-full bg-brand-green px-8 py-3 font-semibold text-white transition hover:bg-brand-green-dark"
            >
              View all products
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="grid lg:grid-cols-2">
              <div className="flex flex-col justify-center bg-brand-navy p-10 text-white lg:p-14">
                <h2 className="mb-2 text-3xl font-bold">Testimonials</h2>
                <p className="text-white/90">Why Do People Love Us</p>
              </div>
              <div className="space-y-8 p-10 lg:p-14">
                {testimonials.map((t) => (
                  <blockquote key={t.name} className="border-l-4 border-brand-green pl-4">
                    <p className="mb-3 italic text-slate-700">&ldquo;{t.quote}&rdquo;</p>
                    <footer>
                      <p className="font-semibold text-slate-900">{t.name}</p>
                      <p className="text-sm text-slate-500">{t.country}</p>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24">
        <Image
          src="https://uficoltd.com/wp-content/uploads/2024/07/1520142494635.webp"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative mx-auto max-w-xl px-4">
          <div className="rounded-3xl border border-white/50 bg-white/95 p-8 shadow-2xl backdrop-blur">
            <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">Send us a message</h2>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
