import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { deleteQuoteAction } from "@/actions/adminQuotes";
import { auth } from "@/auth";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminQuoteEditForm } from "@/components/admin/AdminQuoteEditForm";
import { AdminShell } from "@/components/admin/AdminShell";
import { getQuoteById } from "@/services/quoteService";

export const metadata = {
  title: "Quote detail",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminQuoteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const { id } = await params;
  const quote = await getQuoteById(id);
  if (!quote) notFound();

  return (
    <AdminShell title={quote.referenceCode} current="/admin/quotes">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/quotes" className="text-sm text-brand-muted hover:text-brand-primary">
          ← Back to quotes
        </Link>
        <AdminDeleteButton
          id={quote.id}
          confirmText="Delete this quote permanently?"
          action={deleteQuoteAction}
          hrefAfter="/admin/quotes"
        />
      </div>
      <div className="border border-brand-border bg-brand-surface p-6">
        <AdminQuoteEditForm quote={quote} />
      </div>
    </AdminShell>
  );
}
