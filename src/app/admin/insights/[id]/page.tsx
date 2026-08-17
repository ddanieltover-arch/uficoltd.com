import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { deleteArticleAction, updateArticleAction } from "@/actions/adminArticles";
import { auth } from "@/auth";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatusForm } from "@/components/admin/AdminStatusForm";
import { PUBLISH_STATUSES, StatusSelect } from "@/components/admin/statusOptions";
import { getArticleById } from "@/services/articleService";

export const metadata = {
  title: "Edit insight",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const fieldClass =
  "w-full rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface px-3 py-2 text-sm";

export default async function AdminInsightDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const { id } = await params;
  const article = await getArticleById(id);
  if (!article) notFound();

  return (
    <AdminShell title={article.title} current="/admin/insights">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/insights" className="text-sm text-brand-muted hover:text-brand-primary">
          ← Back to insights
        </Link>
        <AdminDeleteButton
          id={article.id}
          confirmText="Delete this article permanently?"
          action={deleteArticleAction}
          hrefAfter="/admin/insights"
        />
      </div>

      <section className="border border-brand-border bg-brand-surface p-6">
        <AdminStatusForm action={updateArticleAction} className="grid gap-3">
          <input type="hidden" name="id" value={article.id} />
          <label className="block text-sm">
            <span className="mb-1 block text-brand-muted">Title</span>
            <input name="title" required defaultValue={article.title} className={fieldClass} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-brand-muted">Slug</span>
            <input name="slug" required defaultValue={article.slug} className={fieldClass} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-brand-muted">Status</span>
            <StatusSelect value={article.status} options={PUBLISH_STATUSES} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-brand-muted">Excerpt</span>
            <textarea
              name="excerpt"
              required
              rows={2}
              defaultValue={article.excerpt}
              className={fieldClass}
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-brand-muted">Meta title (optional)</span>
            <input
              name="metaTitle"
              defaultValue={article.metaTitle ?? ""}
              className={fieldClass}
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-brand-muted">Meta description (optional)</span>
            <textarea
              name="metaDescription"
              rows={2}
              defaultValue={article.metaDescription ?? ""}
              className={fieldClass}
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-brand-muted">Body</span>
            <textarea name="body" rows={16} defaultValue={article.body} className={fieldClass} />
          </label>
          <button
            type="submit"
            className="min-h-11 w-fit rounded-[var(--brand-radius-md)] bg-brand-primary px-4 text-sm font-semibold text-white hover:bg-brand-primary-hover"
          >
            Save article
          </button>
        </AdminStatusForm>
      </section>
    </AdminShell>
  );
}
