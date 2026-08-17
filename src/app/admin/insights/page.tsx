import Link from "next/link";
import { redirect } from "next/navigation";
import { createArticleAction, deleteArticleAction } from "@/actions/adminArticles";
import { auth } from "@/auth";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatusForm } from "@/components/admin/AdminStatusForm";
import { listArticles } from "@/services/articleService";

export const metadata = {
  title: "Insights",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const fieldClass =
  "w-full rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface px-3 py-2 text-sm";

export default async function AdminInsightsPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const articles = await listArticles();

  return (
    <AdminShell title="Insights" current="/admin/insights">
      <section className="mb-8 border border-brand-border bg-brand-surface p-6">
        <h2 className="font-display text-lg text-brand-primary">New article</h2>
        <AdminStatusForm action={createArticleAction} className="mt-4 grid gap-3">
          <label className="block text-sm">
            <span className="mb-1 block text-brand-muted">Title</span>
            <input name="title" required className={fieldClass} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-brand-muted">Slug (optional)</span>
            <input name="slug" className={fieldClass} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-brand-muted">Excerpt</span>
            <textarea name="excerpt" required rows={2} className={fieldClass} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-brand-muted">Body (paragraphs separated by blank lines)</span>
            <textarea name="body" required rows={8} className={fieldClass} />
          </label>
          <button
            type="submit"
            className="min-h-11 w-fit rounded-[var(--brand-radius-md)] bg-brand-primary px-4 text-sm font-semibold text-white hover:bg-brand-primary-hover"
          >
            Create draft
          </button>
        </AdminStatusForm>
      </section>

      {articles.length === 0 ? (
        <p className="border border-dashed border-brand-border p-8 text-center text-sm text-brand-muted">
          No articles yet. Create one above or run the database seed.
        </p>
      ) : (
        <ul className="divide-y divide-brand-border border border-brand-border bg-brand-surface">
          {articles.map((article) => (
            <li key={article.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
              <div>
                <Link
                  href={`/admin/insights/${article.id}`}
                  className="font-medium text-brand-primary hover:underline"
                >
                  {article.title}
                </Link>
                <p className="text-xs text-brand-muted">
                  {article.slug} · {article.status}
                </p>
              </div>
              <AdminDeleteButton
                id={article.id}
                confirmText="Delete this article?"
                action={deleteArticleAction}
                hrefAfter="/admin/insights"
              />
            </li>
          ))}
        </ul>
      )}
    </AdminShell>
  );
}
