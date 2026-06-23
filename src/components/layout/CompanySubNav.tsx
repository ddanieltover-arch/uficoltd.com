"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardList, Factory, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  {
    href: "/manufacturing-process",
    label: "Manufacturing Process",
    icon: Factory,
  },
  {
    href: "/purchasing-procedures",
    label: "Purchasing Procedures",
    icon: ClipboardList,
  },
  {
    href: "/quality-standard",
    label: "Quality Standard",
    icon: ShieldCheck,
  },
] as const;

export function CompanySubNav() {
  const pathname = usePathname();

  return (
    <div className="border-y border-slate-200/80 bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <nav
          aria-label="Company information"
          className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3"
        >
          {LINKS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all",
                  active
                    ? "bg-brand-green text-white shadow-lg shadow-brand-green/30"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-brand-green/40 hover:text-brand-green",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
