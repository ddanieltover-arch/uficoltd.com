import Link from "next/link";
import { redirect } from "next/navigation";
import { deleteQuoteAction, updateQuoteStatusAction } from "@/actions/adminQuotes";
import { auth } from "@/auth";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatusForm } from "@/components/admin/AdminStatusForm";
import { QUOTE_STATUSES, StatusSelect } from "@/components/admin/statusOptions";
import { listQuotes } from "@/services/quoteService";

export const metadata = {
  title: "Quotes",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminQuotesPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const quotes = await listQuotes();

  return (
    <AdminShell title="Quotes" current="/admin/quotes">
      {quotes.length === 0 ? (
        <p className="border border-dashed border-brand-border p-8 text-center text-sm text-brand-muted">
          No quote requests yet. Product enquiries from the storefront appear here.
        </p>
      ) : (
        <div className="overflow-x-auto border border-brand-border bg-brand-surface">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-brand-bg text-brand-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Reference</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q.id} className="border-t border-brand-border">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/quotes/${q.id}`}
                      className="text-brand-primary hover:underline"
                    >
                      {q.referenceCode}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div>{q.contactName}</div>
                    <div className="text-brand-muted">{q.email}</div>
                  </td>
                  <td className="px-4 py-3">
                    {q.productLabel ?? q.product?.name ?? "—"}
                  </td>
                  <td className="px-4 py-3">
                    <AdminStatusForm
                      action={updateQuoteStatusAction}
                      className="flex items-center gap-2"
                    >
                      <input type="hidden" name="id" value={q.id} />
                      <StatusSelect value={q.status} options={QUOTE_STATUSES} />
                      <button
                        type="submit"
                        className="text-xs font-medium text-brand-primary hover:underline"
                      >
                        Save
                      </button>
                    </AdminStatusForm>
                  </td>
                  <td className="px-4 py-3 text-brand-muted">
                    {q.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/quotes/${q.id}`}
                        className="text-brand-primary hover:underline"
                      >
                        Open
                      </Link>
                      <AdminDeleteButton
                        id={q.id}
                        confirmText="Delete this quote?"
                        action={deleteQuoteAction}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
