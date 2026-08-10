import Link from "next/link";
import { redirect } from "next/navigation";
import {
  createProductAction,
  deleteProductAction,
  updateProductStatusAction,
} from "@/actions/adminProducts";
import { auth } from "@/auth";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatusForm } from "@/components/admin/AdminStatusForm";
import { PUBLISH_STATUSES, StatusSelect } from "@/components/admin/statusOptions";
import { listCategories, listProductsAdmin } from "@/services/adminProductService";

export const metadata = {
  title: "Products",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const fieldClass =
  "w-full rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface px-3 py-2 text-sm";

export default async function AdminProductsPage() {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const [products, categories] = await Promise.all([
    listProductsAdmin(),
    listCategories(),
  ]);

  return (
    <AdminShell title="Products" current="/admin/products">
      <section className="mb-8 border border-brand-border bg-brand-surface p-6">
        <h2 className="font-display text-lg text-brand-primary">Create product</h2>
        <form action={createProductAction} className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="block text-sm sm:col-span-1">
            <span className="mb-1 block text-brand-muted">Name</span>
            <input name="name" required className={fieldClass} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-brand-muted">Slug (optional)</span>
            <input name="slug" className={fieldClass} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-brand-muted">Category</span>
            <select name="categoryId" required className={fieldClass}>
              <option value="">Select…</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-brand-muted">Primary image URL</span>
            <input name="imageUrl" className={fieldClass} placeholder="/images/products/…" />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="mb-1 block text-brand-muted">Short description</span>
            <textarea name="shortDescription" required rows={2} className={fieldClass} />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="mb-1 block text-brand-muted">Description</span>
            <textarea name="description" required rows={4} className={fieldClass} />
          </label>
          <button
            type="submit"
            className="min-h-11 rounded-[var(--brand-radius-md)] bg-brand-primary px-4 text-sm font-semibold text-white hover:bg-brand-primary-hover sm:col-span-2 sm:w-fit"
          >
            Create draft
          </button>
        </form>
      </section>

      {products.length === 0 ? (
        <p className="border border-dashed border-brand-border p-8 text-center text-sm text-brand-muted">
          No products yet. Run the database seed to import catalogue JSON.
        </p>
      ) : (
        <div className="overflow-x-auto border border-brand-border bg-brand-surface">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-brand-bg text-brand-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-brand-border">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="text-brand-primary hover:underline"
                    >
                      {p.name}
                    </Link>
                    <div className="text-brand-muted">{p.slug}</div>
                  </td>
                  <td className="px-4 py-3">{p.category.name}</td>
                  <td className="px-4 py-3">
                    <AdminStatusForm
                      action={updateProductStatusAction}
                      className="flex items-center gap-2"
                    >
                      <input type="hidden" name="id" value={p.id} />
                      <StatusSelect value={p.status} options={PUBLISH_STATUSES} />
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
                        href={`/admin/products/${p.id}`}
                        className="text-brand-primary hover:underline"
                      >
                        Edit
                      </Link>
                      <AdminDeleteButton
                        id={p.id}
                        confirmText="Delete this product and related specs/images?"
                        action={deleteProductAction}
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
