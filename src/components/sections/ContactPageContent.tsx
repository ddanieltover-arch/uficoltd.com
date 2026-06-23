"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { ContactForm } from "@/components/sections/Forms";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/motion";
import { ButtonLink } from "@/components/ui/Button";
import { site } from "@/lib/content";
import { siteImages } from "@/lib/site-images";

const MAP_QUERY = encodeURIComponent(
  "365 Moo 1, Maliwan Road, Nongrua, Khonkaen 40210, Thailand",
);

const CONTACT_CHANNELS = [
  {
    icon: Phone,
    label: "Sales & orders",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s/g, "")}`,
    hint: "Mon–Fri business hours",
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    hint: "We reply within 1–2 business days",
  },
  {
    icon: MapPin,
    label: "Head office",
    value: site.address,
    href: `https://maps.google.com/?q=${MAP_QUERY}`,
    hint: "Khonkaen, Thailand",
    external: true,
  },
  {
    icon: Clock,
    label: "Office hours",
    value: site.hours,
    hint: "ICT (UTC+7)",
  },
] as const;

const NEXT_STEPS = [
  "Your message is sent to our sales team at sales@uficoltd.com",
  "You receive an automatic confirmation copy by email",
  "We respond with pricing, availability, or next steps",
];

export function ContactPageContent() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white pb-8 pt-6">
        <div
          className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-brand-green/5 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-brand-navy/5 blur-3xl"
          aria-hidden
        />

        <div className="mx-auto max-w-7xl px-4">
          <FadeIn>
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">
                  Contact UFI
                </p>
                <h1 className="heading-accent mb-5 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
                  Let&apos;s talk sugar supply
                </h1>
                <p className="mb-8 max-w-lg text-lg leading-relaxed text-slate-600">
                  Whether you need ICUMSA 45, Thai refined sugar, or bulk wholesale
                  quantities — our sales team is ready to help with quotes, logistics,
                  and long-term supply partnerships.
                </p>
                <div className="flex flex-wrap gap-3">
                  <ButtonLink href="/shop" className="inline-flex items-center gap-2">
                    Browse products
                    <ArrowRight className="h-4 w-4" />
                  </ButtonLink>
                  <a
                    href={`mailto:${site.email}`}
                    className="btn-outline inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold"
                  >
                    Email sales directly
                  </a>
                </div>
              </div>

              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] ring-1 ring-slate-200/80">
                  <Image
                    src={siteImages.contactHero}
                    alt="Warehouse forklift loading bulk sugar sacks"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-sm font-medium text-white/80">Wholesale refined sugar</p>
                    <p className="text-xl font-bold">Trusted export partner since 2008</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-lg md:block">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                      <ShieldCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Response time
                      </p>
                      <p className="font-semibold text-slate-900">1–2 business days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Main contact grid */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Contact channels */}
            <div className="lg:col-span-5">
              <FadeIn delay={0.05}>
                <h2 className="mb-2 text-2xl font-bold text-slate-900">Reach our team</h2>
                <p className="mb-8 text-slate-600">
                  Pick the channel that works best for you. For product quotes and
                  volume orders, email or the form below is fastest.
                </p>
              </FadeIn>

              <Stagger className="space-y-4">
                {CONTACT_CHANNELS.map((channel) => {
                  const Icon = channel.icon;
                  const card = (
                    <div className="card-elevated group flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 transition-all">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-green/15 to-brand-green/5 text-brand-green transition group-hover:from-brand-green group-hover:to-brand-green-dark group-hover:text-white">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                          {channel.label}
                        </p>
                        <p className="mt-1 font-semibold text-slate-900 leading-snug">
                          {channel.value}
                        </p>
                        {channel.hint && (
                          <p className="mt-1 text-sm text-slate-500">{channel.hint}</p>
                        )}
                      </div>
                      {"href" in channel && channel.href && (
                        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-brand-green" />
                      )}
                    </div>
                  );

                  return (
                    <StaggerItem key={channel.label}>
                      {"href" in channel && channel.href ? (
                        <Link
                          href={channel.href}
                          target={"external" in channel && channel.external ? "_blank" : undefined}
                          rel={
                            "external" in channel && channel.external
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="block"
                        >
                          {card}
                        </Link>
                      ) : (
                        card
                      )}
                    </StaggerItem>
                  );
                })}
              </Stagger>

              <FadeIn delay={0.2} className="mt-8">
                <div className="rounded-2xl bg-gradient-to-br from-brand-navy to-slate-800 p-6 text-white">
                  <p className="mb-2 text-sm font-semibold text-brand-green-light">
                    Looking for a specific grade?
                  </p>
                  <p className="mb-4 text-sm leading-relaxed text-white/85">
                    Explore our full catalogue of ICUMSA, Thai, and white refined sugars
                    with specifications and enquiry forms on each product page.
                  </p>
                  <ButtonLink href="/shop" className="!bg-white !text-brand-navy hover:!bg-slate-100">
                    View product catalogue
                  </ButtonLink>
                </div>
              </FadeIn>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <FadeIn delay={0.1}>
                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_25px_70px_-45px_rgba(15,23,42,0.55)]">
                  <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-6 py-8 md:px-10">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-green text-white shadow-lg shadow-brand-green/25">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900">Send a message</h2>
                        <p className="mt-1 text-slate-600">
                          Fill in the form and we&apos;ll get back to you shortly. A
                          confirmation copy is sent to your inbox.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-8 md:px-10">
                    <ContactForm layout="wide" />
                  </div>

                  <div className="border-t border-slate-100 bg-slate-50/80 px-6 py-6 md:px-10">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                      What happens next
                    </p>
                    <ol className="grid gap-3 sm:grid-cols-3">
                      {NEXT_STEPS.map((step, i) => (
                        <li key={step} className="flex gap-3 text-sm text-slate-600">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-xs font-bold text-brand-green">
                            {i + 1}
                          </span>
                          <span className="leading-snug">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4">
          <FadeIn>
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col gap-1 border-b border-slate-100 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-8">
                <div>
                  <h2 className="font-bold text-slate-900">Visit our office</h2>
                  <p className="text-sm text-slate-600">{site.address}</p>
                </div>
                <a
                  href={`https://maps.google.com/?q=${MAP_QUERY}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-green hover:text-brand-green-dark md:mt-0"
                >
                  Open in Google Maps
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
              <div className="relative aspect-[21/9] min-h-[240px] w-full bg-slate-100">
                <iframe
                  title="UFI office location map"
                  src={`https://maps.google.com/maps?q=${MAP_QUERY}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
