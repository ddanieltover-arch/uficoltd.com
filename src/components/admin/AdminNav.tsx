import Link from "next/link";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/quotes", label: "Quotes" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/dealers", label: "Dealers" },
  { href: "/admin/distributors", label: "Distributors" },
  { href: "/admin/pages", label: "Pages" },
] as const;

export function AdminNav({ current }: { current: string }) {
  return (
    <nav className="flex flex-wrap items-center gap-2" aria-label="Admin">
      {NAV_ITEMS.map((item) => {
        const active =
          item.href === "/admin"
            ? current === "/admin"
            : current === item.href || current.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={
              active
                ? "rounded-[var(--brand-radius-md)] bg-brand-primary px-3 py-1.5 text-sm font-medium text-white"
                : "rounded-[var(--brand-radius-md)] px-3 py-1.5 text-sm text-brand-muted transition hover:bg-brand-surface hover:text-brand-text"
            }
          >
            {item.label}
          </Link>
        );
      })}
      <AdminSignOutButton />
    </nav>
  );
}
