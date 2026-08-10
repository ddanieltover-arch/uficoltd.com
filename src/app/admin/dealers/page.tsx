import Link from "next/link";
import { redirect } from "next/navigation";
import {
  deleteDealerAction,
  updateDealerStatusAction,
} from "@/actions/adminPartners";
import { auth } from "@/auth";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatusForm } from "@/components/admin/AdminStatusForm";
import {
  APPLICATION_STATUSES,
  StatusSelect,
} from "@/components/admin/statusOptions";
import { listDealerApplications } from "@/services/partnerService";

export const metadata = {
  title: "Dealers",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDealersPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const rows = await listDealerApplications();

  return (
    <AdminShell title="Dealers" current="/admin/dealers">
      {rows.length === 0 ? (
        <p className="border border-dashed border-brand-border p-8 text-center text-sm text-brand-muted">
          No dealer applications yet.
        </p>
      ) : (
        <div className="overflow-x-auto border border-brand-border bg-brand-surface">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-brand-bg text-brand-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Country</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-brand-border">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/dealers/${row.id}`}
                      className="text-brand-primary hover:underline"
                    >
                      {row.companyName}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <div>{row.contactName}</div>
                    <div className="text-brand-muted">{row.email}</div>
                  </td>
                  <td className="px-4 py-3">{row.country}</td>
                  <td className="px-4 py-3">
                    <AdminStatusForm
                      action={updateDealerStatusAction}
                      className="flex items-center gap-2"
                    >
                      <input type="hidden" name="id" value={row.id} />
                      <StatusSelect
                        value={row.status}
                        options={APPLICATION_STATUSES}
                      />
                      <button
                        type="submit"
                        className="text-xs font-medium text-brand-primary hover:underline"
                      >
                        Save
                      </button>
                    </AdminStatusForm>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/admin/dealers/${row.id}`}
                        className="text-brand-primary hover:underline"
                      >
                        Open
                      </Link>
                      <AdminDeleteButton
                        id={row.id}
                        confirmText="Delete this dealer application?"
                        action={deleteDealerAction}
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
