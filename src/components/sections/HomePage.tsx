import Image from "next/image";
import { Shield, Layers, Truck } from "lucide-react";
import { features, skills, testimonials } from "@/config/site";
import { categories, products, site } from "@/lib/content";
import { ContactForm } from "@/components/sections/Forms";
import { CategoryCard, ProductGrid } from "@/components/sections/ProductCard";
import { SectionHeading } from "@/components/layout/SiteChrome";
import { ButtonLink } from "@/components/ui/Button";
import {
  FadeIn,
  HeroReveal,
  ScaleOnHover,
  Stagger,
  StaggerItem,
} from "@/components/shared/motion";

import { siteImages, categoryImages, operationsGallery } from "@/lib/site-images";

const featureIcons = { shield: Shield, layers: Layers, truck: Truck };

export function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden rounded-b-[2.5rem] bg-slate-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={siteImages.hero}
            alt="Sugar cane harvesting in Thailand"
            fill
            className="animate-ken-burns object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/92 via-slate-950/75 to-slate-950/40" />
        <div className="pointer-events-none absolute -right-20 top-20 h-72 w-72 rounded-full bg-brand-green/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-10 h-56 w-56 rounded-full bg-brand-green-light/10 blur-3xl animate-float" />

        <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-28 md:pt-32">
          <HeroReveal className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green-light backdrop-blur">
              {site.shortName}
            </p>
            <h1 className="mb-5 text-4xl font-bold uppercase leading-tight md:text-6xl">
              Refined Sugars
              <span className="block bg-gradient-to-r from-brand-green-light to-emerald-300 bg-clip-text text-transparent">
                Pure, Premium
              </span>
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-white/90 md:text-xl">{site.tagline}</p>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="/shop" variant="primary" className="animate-pulse-glow">
                Explore Products
              </ButtonLink>
              <ButtonLink href="/contact-us" variant="secondary">
                Request Quote
              </ButtonLink>
            </div>
          </HeroReveal>

          <Stagger className="mt-14 grid gap-4 sm:grid-cols-3">
            {["24+ Product Types", "Global Export Ready", "Strict Quality Control"].map(
              (item) => (
                <StaggerItem key={item}>
                  <div className="glass-card rounded-2xl px-4 py-4 transition hover:bg-white/20">
                    <p className="text-sm font-semibold">{item}</p>
                  </div>
                </StaggerItem>
              ),
            )}
          </Stagger>
        </div>
      </section>

      <section className="section-mesh py-16">
        <div className="mx-auto max-w-7xl px-4">
          <Stagger className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => {
              const Icon =
                featureIcons[feature.icon as keyof typeof featureIcons] ?? Shield;
              return (
                <StaggerItem key={feature.title}>
                  <ScaleOnHover>
                    <div className="card-elevated h-full rounded-2xl p-7">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-green/15 to-brand-green/5 text-brand-green">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-slate-900">{feature.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {feature.description}
                      </p>
                    </div>
                  </ScaleOnHover>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2">
          <FadeIn direction="left">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={siteImages.intro}
                alt="Premium refined white sugar in burlap sack"
                fill
                className="object-contain bg-slate-50 p-6 transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={0.1}>
            <p className="mb-2 font-semibold text-brand-green">{site.shortName}</p>
            <h2 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
              Thai Sugars Premium ICUMSA
            </h2>
            <p className="mb-6 text-slate-600">
              Unleash the Essence of Taste with our Exclusive Wholesale Refined White Sugar
            </p>
            <ButtonLink href="/shop">Shop Here!</ButtonLink>
          </FadeIn>
        </div>
      </section>

      <section className="section-mesh py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 lg:grid-cols-2">
          <FadeIn direction="up">
            <div className="card-elevated rounded-2xl p-8">
              <p className="mb-2 font-semibold uppercase tracking-wider text-brand-green">
                What We Do
              </p>
              <h2 className="mb-6 text-3xl font-bold text-slate-900">Our Skills</h2>
              <ul className="space-y-4">
                {skills.map((skill, i) => (
                  <li key={skill} className="flex gap-3 text-slate-700" style={{ animationDelay: `${i * 80}ms` }}>
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-green" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={0.15}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={siteImages.skills}
                alt="Conveyor loading sugar bags into export container"
                fill
                className="object-cover transition duration-700 hover:scale-105"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <FadeIn className="mb-10 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
              Operations
            </p>
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              From warehouse to worldwide export
            </h2>
          </FadeIn>
          <Stagger className="grid gap-6 md:grid-cols-3">
            {operationsGallery.map((item) => (
              <StaggerItem key={item.src}>
                <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl ring-1 ring-slate-200/80">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/20 to-transparent" />
                  <p className="absolute bottom-0 left-0 p-5 text-lg font-semibold text-white">
                    {item.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <FadeIn>
            <SectionHeading eyebrow="Catalog" title="Categories" className="heading-accent" />
          </FadeIn>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <StaggerItem key={cat.slug}>
                <ScaleOnHover>
                  <CategoryCard
                    slug={cat.slug}
                    name={cat.name}
                    count={cat.count}
                    image={categoryImages[cat.slug]}
                  />
                </ScaleOnHover>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-slate-50/60 py-20">
        <div className="mx-auto max-w-7xl px-4">
          <FadeIn>
            <SectionHeading eyebrow="Featured" title="Our Products" className="heading-accent" />
          </FadeIn>
          <FadeIn delay={0.1}>
            <ProductGrid products={products.slice(0, 12)} animated />
          </FadeIn>
          <FadeIn delay={0.2} className="mt-8 text-center">
            <ButtonLink href="/shop" variant="outline">
              View all products
            </ButtonLink>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <FadeIn>
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
              <div className="grid lg:grid-cols-2">
                <div className="animate-gradient flex flex-col justify-center bg-gradient-to-br from-brand-navy via-slate-800 to-brand-navy p-10 text-white lg:p-14">
                  <h2 className="mb-2 text-3xl font-bold">Testimonials</h2>
                  <p className="text-white/90">Why Do People Love Us</p>
                </div>
                <div className="space-y-8 p-10 lg:p-14">
                  {testimonials.map((t, i) => (
                    <FadeIn key={t.name} delay={i * 0.1}>
                      <blockquote className="border-l-4 border-brand-green pl-4 transition hover:border-brand-green-dark">
                        <p className="mb-3 italic text-slate-700">&ldquo;{t.quote}&rdquo;</p>
                        <footer>
                          <p className="font-semibold text-slate-900">{t.name}</p>
                          <p className="text-sm text-slate-500">{t.country}</p>
                        </footer>
                      </blockquote>
                    </FadeIn>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <Image
          src={siteImages.contactBg}
          alt="Industrial sugar processing and bagging facility"
          fill
          className="animate-ken-burns object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <FadeIn className="relative mx-auto max-w-xl px-4">
          <div className="rounded-3xl border border-white/50 bg-white/95 p-8 shadow-2xl backdrop-blur">
            <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">
              Send us a message
            </h2>
            <ContactForm />
          </div>
        </FadeIn>
      </section>
    </>
  );
}
