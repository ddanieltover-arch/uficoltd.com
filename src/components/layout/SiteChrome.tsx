import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/content";
import { cn } from "@/lib/utils";

const LOGO = "https://uficoltd.com/wp-content/uploads/2024/07/cropped-lg1.png";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Our Products", href: "/shop" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
  { label: "Manufacturing Process", href: "/manufacturing-process" },
  { label: "Purchasing Procedures", href: "/purchasing-procedures" },
  { label: "Quality Standard", href: "/quality-standard" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="hidden border-b border-slate-200/80 xl:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs text-slate-600">
          <p className="truncate">{site.address}</p>
          <div className="flex items-center gap-5">
            <a href={`mailto:${site.email}`} className="hover:text-brand-green">{site.email}</a>
            <span>{site.hours}</span>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="font-semibold text-slate-900 hover:text-brand-green">
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image src={LOGO} alt={site.name} width={170} height={44} className="h-10 w-auto" priority />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">{site.shortName}</p>
            <p className="text-xs text-slate-500">Premium Thai Sugar Supplier</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact-us"
            className="hidden rounded-full bg-brand-green px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-green-dark lg:inline-flex"
          >
            Get a Quote
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <details className="relative xl:hidden">
      <summary className="cursor-pointer list-none rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700">
        Menu
      </summary>
      <nav className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-xl px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}

export function PageBanner({ title, showShopButton = true }: { title: string; showShopButton?: boolean }) {
  return (
    <section className="bg-gradient-to-b from-slate-50 to-white py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-10 shadow-[0_20px_60px_-40px_rgba(2,6,23,0.6)] md:flex md:items-center md:justify-between md:px-10">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">UFI Co., LTD</p>
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{title}</h1>
          </div>
          {showShopButton && (
            <Link
              href="/shop"
              className="mt-5 inline-flex rounded-full bg-brand-green px-7 py-3 text-sm font-semibold text-white transition hover:bg-brand-green-dark md:mt-0"
            >
              Browse Products
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-3">
        <div>
          <h3 className="mb-3 text-lg font-bold text-white">{site.shortName}</h3>
          <p className="text-sm leading-relaxed text-slate-400">{site.tagline}</p>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-white">Contact</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>{site.address}</li>
            <li><a href={`mailto:${site.email}`} className="hover:text-brand-green-light">{site.email}</a></li>
            <li><a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-brand-green-light">{site.phone}</a></li>
            <li>{site.hours}</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><Link href="/shop" className="hover:text-brand-green-light">Our Products</Link></li>
            <li><Link href="/about-us" className="hover:text-brand-green-light">About Us</Link></li>
            <li><Link href="/contact-us" className="hover:text-brand-green-light">Contact Us</Link></li>
            <li><Link href="/purchasing-procedures" className="hover:text-brand-green-light">Purchasing Procedures</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-sm text-slate-500">
        Copyright {new Date().getFullYear()} © <strong className="text-slate-300">{site.name}</strong>
      </div>
    </footer>
  );
}

export function SectionHeading({ eyebrow, title, className }: { eyebrow?: string; title: string; className?: string }) {
  return (
    <div className={cn("mb-10 text-center", className)}>
      {eyebrow && <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-green">{eyebrow}</p>}
      <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">{title}</h2>
    </div>
  );
}
