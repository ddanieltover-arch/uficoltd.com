import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { countProducts } from "@/services/adminProductService";
import { countNewInquiries, listRecentInquiries } from "@/services/inquiryService";
import { countNewPartnerApplications } from "@/services/partnerService";
import {
  countQuotesByStatuses,
  listRecentQuotes,
} from "@/services/quoteService";

export const metadata = {
  title: "Admin dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const [
    pendingQuotes,
    newInquiries,
    newDealers,
    newDistributors,
    productCount,
    recentQuotes,
    recentInquiries,
  ] = await Promise.all([
    countQuotesByStatuses(["NEW", "IN_PROGRESS", "AWAITING_INFO"]),
    countNewInquiries(),
    countNewPartnerApplications("dealer"),
    countNewPartnerApplications("distributor"),
    countProducts(),
    listRecentQuotes(6),
    listRecentInquiries(6),
  ]);

  const widgets = [
    { label: "Pending quotations", value: pendingQuotes, href: "/admin/quotes" },
    { label: "New inquiries", value: newInquiries, href: "/admin/inquiries" },
    { label: "New dealer apps", value: newDealers, href: "/admin/dealers" },
    {
      label: "New distributor apps",
      value: newDistributors,
      href: "/admin/distributors",
    },
  ];

  return (
    <AdminShell title="Dashboard" current="/admin">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {widgets.map((w) => (
          <Link
            key={w.href}
            href={w.href}
            className="border border-brand-border bg-brand-surface p-5 transition hover:border-brand-secondary"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
              {w.label}
            </p>
            <p className="font-display mt-2 text-3xl text-brand-primary">{w.value}</p>
          </Link>
        ))}
      </div>

      <p className="mt-6 text-sm text-brand-muted">
        Catalogue:{" "}
        <Link href="/admin/products" className="text-brand-primary hover:underline">
          {productCount} products
        </Link>
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="border border-brand-border bg-brand-surface p-5">
          <h2 className="font-display text-lg text-brand-primary">Recent quotes</h2>
          {recentQuotes.length === 0 ? (
            <p className="mt-4 border border-dashed border-brand-border p-4 text-sm text-brand-muted">
              No quotes yet.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-brand-border">
              {recentQuotes.map((q) => (
                <li key={q.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <Link href={`/admin/quotes/${q.id}`} className="text-brand-primary hover:underline">
                    {q.referenceCode}
                  </Link>
                  <span className="text-brand-muted">{q.status.replaceAll("_", " ")}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="border border-brand-border bg-brand-surface p-5">
          <h2 className="font-display text-lg text-brand-primary">Recent inquiries</h2>
          {recentInquiries.length === 0 ? (
            <p className="mt-4 border border-dashed border-brand-border p-4 text-sm text-brand-muted">
              No inquiries yet.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-brand-border">
              {recentInquiries.map((i) => (
                <li key={i.id} className="flex items-center justify-between gap-3 py-3 text-sm">
                  <Link
                    href={`/admin/inquiries/${i.id}`}
                    className="text-brand-primary hover:underline"
                  >
                    {i.contactName}
                  </Link>
                  <span className="text-brand-muted">{i.status.replaceAll("_", " ")}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AdminShell>
  );
}
