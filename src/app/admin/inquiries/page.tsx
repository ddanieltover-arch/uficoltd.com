import Link from "next/link";
import { redirect } from "next/navigation";
import {
  deleteInquiryAction,
  updateInquiryStatusAction,
} from "@/actions/adminInquiries";
import { auth } from "@/auth";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatusForm } from "@/components/admin/AdminStatusForm";
import { INQUIRY_STATUSES, StatusSelect } from "@/components/admin/statusOptions";
import { listInquiries } from "@/services/inquiryService";

export const metadata = {
  title: "Inquiries",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const inquiries = await listInquiries();

  return (
    <AdminShell title="Inquiries" current="/admin/inquiries">
      {inquiries.length === 0 ? (
        <p className="border border-dashed border-brand-border p-8 text-center text-sm text-brand-muted">
          No inquiries yet. Contact form submissions appear here.
        </p>
      ) : (
        <div className="overflow-x-auto border border-brand-border bg-brand-surface">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-brand-bg text-brand-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((row) => (
                <tr key={row.id} className="border-t border-brand-border">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/inquiries/${row.id}`}
                      className="text-brand-primary hover:underline"
                    >
                      {row.contactName}
                    </Link>
                    <div className="text-brand-muted">{row.email}</div>
                  </td>
                  <td className="px-4 py-3">{row.source.replaceAll("_", " ")}</td>
                  <td className="px-4 py-3">
                    <AdminStatusForm
                      action={updateInquiryStatusAction}
                      className="flex items-center gap-2"
                    >
                      <input type="hidden" name="id" value={row.id} />
                      <StatusSelect value={row.status} options={INQUIRY_STATUSES} />
                      <button
                        type="submit"
                        className="text-xs font-medium text-brand-primary hover:underline"
                      >
                        Save
                      </button>
                    </AdminStatusForm>
                  </td>
                  <td className="px-4 py-3 text-brand-muted">
                    {row.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/inquiries/${row.id}`}
                        className="text-brand-primary hover:underline"
                      >
                        Open
                      </Link>
                      <AdminDeleteButton
                        id={row.id}
                        confirmText="Delete this inquiry?"
                        action={deleteInquiryAction}
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
