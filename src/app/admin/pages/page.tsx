import { redirect } from "next/navigation";
import { updateSitePageAction } from "@/actions/adminPages";
import { auth } from "@/auth";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatusForm } from "@/components/admin/AdminStatusForm";
import { PUBLISH_STATUSES, StatusSelect } from "@/components/admin/statusOptions";
import { listSitePages } from "@/services/sitePageService";

export const metadata = {
  title: "Site pages",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const fieldClass =
  "w-full rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface px-3 py-2 text-sm";

export default async function AdminPagesPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const pages = await listSitePages();

  return (
    <AdminShell title="Pages" current="/admin/pages">
      {pages.length === 0 ? (
        <p className="border border-dashed border-brand-border p-8 text-center text-sm text-brand-muted">
          No site pages found. Run the database seed to import content/pages.json.
        </p>
      ) : (
        <div className="space-y-6">
          {pages.map((page) => (
            <section
              key={page.id}
              className="border border-brand-border bg-brand-surface p-6"
            >
              <h2 className="font-display text-lg text-brand-primary">{page.slug}</h2>
              <AdminStatusForm action={updateSitePageAction} className="mt-4 space-y-3">
                <input type="hidden" name="slug" value={page.slug} />
                <label className="block text-sm">
                  <span className="mb-1 block text-brand-muted">Title</span>
                  <input
                    name="title"
                    required
                    defaultValue={page.title}
                    className={fieldClass}
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block text-brand-muted">Status</span>
                  <StatusSelect value={page.status} options={PUBLISH_STATUSES} />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block text-brand-muted">
                    Body (paragraphs separated by blank lines)
                  </span>
                  <textarea
                    name="body"
                    rows={10}
                    defaultValue={page.body}
                    className={fieldClass}
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block text-brand-muted">Meta title (optional)</span>
                  <input
                    name="metaTitle"
                    defaultValue={page.metaTitle ?? ""}
                    className={fieldClass}
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-1 block text-brand-muted">Meta description (optional)</span>
                  <textarea
                    name="metaDescription"
                    rows={2}
                    defaultValue={page.metaDescription ?? ""}
                    className={fieldClass}
                  />
                </label>
                <button
                  type="submit"
                  className="min-h-11 rounded-[var(--brand-radius-md)] bg-brand-primary px-4 text-sm font-semibold text-white hover:bg-brand-primary-hover"
                >
                  Save page
                </button>
              </AdminStatusForm>
            </section>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
