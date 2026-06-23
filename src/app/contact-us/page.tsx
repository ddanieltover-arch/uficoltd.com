import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/sections/Forms";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden rounded-b-[2.5rem] bg-slate-800 py-24 text-center text-white">
        <Image
          src="https://uficoltd.com/wp-content/uploads/2024/07/Sugar-Cane-Harvesting_Web.webp"
          alt=""
          fill
          className="object-cover opacity-40"
        />
        <div className="relative px-4">
          <h1 className="mb-3 text-4xl font-bold">Get in touch</h1>
          <p className="mx-auto max-w-xl text-white/90">
            Want to get in touch? We&apos;d love to hear from you. Here&apos;s how you can reach us...
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="-mt-28 rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.6)] md:p-12">
            <div className="mb-12 grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <h3 className="mb-2 font-bold text-slate-900">Talk to sales</h3>
                <Link
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="text-brand-green hover:underline"
                >
                  {site.phone}
                </Link>
              </div>
              <div className="text-center">
                <h3 className="mb-2 font-bold text-slate-900">Contact support</h3>
                <Link href={`mailto:${site.email}`} className="text-brand-green hover:underline">
                  {site.email}
                </Link>
              </div>
              <div className="text-center">
                <h3 className="mb-2 font-bold text-slate-900">Location</h3>
                <p className="text-sm text-slate-600">{site.address}</p>
              </div>
            </div>
            <div className="mx-auto max-w-xl">
              <h2 className="mb-6 text-center text-2xl font-bold text-slate-900">Contact</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
