import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import {
  addProductImageAction,
  addProductPackagingAction,
  addProductSpecAction,
  deleteProductAction,
  deleteProductImageAction,
  deleteProductPackagingAction,
  deleteProductSpecAction,
  updateProductAction,
} from "@/actions/adminProducts";
import { auth } from "@/auth";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminStatusForm } from "@/components/admin/AdminStatusForm";
import { PUBLISH_STATUSES, StatusSelect } from "@/components/admin/statusOptions";
import {
  getProductById,
  listCategories,
} from "@/services/adminProductService";

export const metadata = {
  title: "Product detail",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const fieldClass =
  "w-full rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface px-3 py-2 text-sm";

export default async function AdminProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductById(id),
    listCategories(),
  ]);
  if (!product) notFound();

  return (
    <AdminShell title={product.name} current="/admin/products">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin/products"
          className="text-sm text-brand-muted hover:text-brand-primary"
        >
          ← Back to products
        </Link>
        <AdminDeleteButton
          id={product.id}
          confirmText="Delete this product permanently?"
          action={deleteProductAction}
          hrefAfter="/admin/products"
        />
      </div>

      <section className="mb-6 border border-brand-border bg-brand-surface p-6">
        <h2 className="font-display mb-4 text-lg text-brand-primary">Core fields</h2>
        <AdminStatusForm action={updateProductAction} className="grid gap-3 sm:grid-cols-2">
          <input type="hidden" name="id" value={product.id} />
          <label className="block text-sm">
            <span className="mb-1 block text-brand-muted">Name</span>
            <input name="name" required defaultValue={product.name} className={fieldClass} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-brand-muted">Slug</span>
            <input name="slug" required defaultValue={product.slug} className={fieldClass} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-brand-muted">Category</span>
            <select name="categoryId" defaultValue={product.categoryId} className={fieldClass}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-brand-muted">Status</span>
            <StatusSelect value={product.status} options={PUBLISH_STATUSES} />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-brand-muted">Origin country</span>
            <input
              name="originCountry"
              defaultValue={product.originCountry ?? ""}
              className={fieldClass}
            />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="mb-1 block text-brand-muted">Short description</span>
            <textarea
              name="shortDescription"
              required
              rows={2}
              defaultValue={product.shortDescription}
              className={fieldClass}
            />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="mb-1 block text-brand-muted">Description</span>
            <textarea
              name="description"
              required
              rows={6}
              defaultValue={product.description}
              className={fieldClass}
            />
          </label>
          <button
            type="submit"
            className="min-h-11 rounded-[var(--brand-radius-md)] bg-brand-primary px-4 text-sm font-semibold text-white hover:bg-brand-primary-hover sm:col-span-2 sm:w-fit"
          >
            Save product
          </button>
        </AdminStatusForm>
      </section>

      <section className="mb-6 border border-brand-border bg-brand-surface p-6">
        <h2 className="font-display mb-4 text-lg text-brand-primary">Specifications</h2>
        <ul className="mb-4 space-y-2 text-sm">
          {product.specifications.length === 0 ? (
            <li className="text-brand-muted">No specifications yet.</li>
          ) : (
            product.specifications.map((spec) => (
              <li
                key={spec.id}
                className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-border py-2"
              >
                <span>
                  {spec.label}: {spec.value}
                  {spec.unit ? ` ${spec.unit}` : ""}
                </span>
                <AdminStatusForm action={deleteProductSpecAction}>
                  <input type="hidden" name="id" value={spec.id} />
                  <input type="hidden" name="productId" value={product.id} />
                  <button type="submit" className="text-brand-error hover:underline">
                    Remove
                  </button>
                </AdminStatusForm>
              </li>
            ))
          )}
        </ul>
        <AdminStatusForm action={addProductSpecAction} className="grid gap-3 sm:grid-cols-4">
          <input type="hidden" name="productId" value={product.id} />
          <input name="label" placeholder="Label" required className={fieldClass} />
          <input name="value" placeholder="Value" required className={fieldClass} />
          <input name="unit" placeholder="Unit" className={fieldClass} />
          <button
            type="submit"
            className="rounded-[var(--brand-radius-md)] bg-brand-primary px-3 py-2 text-sm font-semibold text-white hover:bg-brand-primary-hover"
          >
            Add spec
          </button>
        </AdminStatusForm>
      </section>

      <section className="mb-6 border border-brand-border bg-brand-surface p-6">
        <h2 className="font-display mb-4 text-lg text-brand-primary">Packaging</h2>
        <ul className="mb-4 space-y-2 text-sm">
          {product.packaging.length === 0 ? (
            <li className="text-brand-muted">No packaging rows yet.</li>
          ) : (
            product.packaging.map((pkg) => (
              <li
                key={pkg.id}
                className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-border py-2"
              >
                <span>
                  {pkg.name}
                  {pkg.sizeLabel ? ` — ${pkg.sizeLabel}` : ""}
                </span>
                <AdminStatusForm action={deleteProductPackagingAction}>
                  <input type="hidden" name="id" value={pkg.id} />
                  <input type="hidden" name="productId" value={product.id} />
                  <button type="submit" className="text-brand-error hover:underline">
                    Remove
                  </button>
                </AdminStatusForm>
              </li>
            ))
          )}
        </ul>
        <AdminStatusForm
          action={addProductPackagingAction}
          className="grid gap-3 sm:grid-cols-4"
        >
          <input type="hidden" name="productId" value={product.id} />
          <input name="name" placeholder="Name" required className={fieldClass} />
          <input name="sizeLabel" placeholder="Size" className={fieldClass} />
          <input name="notes" placeholder="Notes" className={fieldClass} />
          <button
            type="submit"
            className="rounded-[var(--brand-radius-md)] bg-brand-primary px-3 py-2 text-sm font-semibold text-white hover:bg-brand-primary-hover"
          >
            Add packaging
          </button>
        </AdminStatusForm>
      </section>

      <section className="border border-brand-border bg-brand-surface p-6">
        <h2 className="font-display mb-4 text-lg text-brand-primary">Images</h2>
        <ul className="mb-4 space-y-2 text-sm">
          {product.images.length === 0 ? (
            <li className="text-brand-muted">No images yet.</li>
          ) : (
            product.images.map((img) => (
              <li
                key={img.id}
                className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-border py-2"
              >
                <span>
                  {img.isPrimary ? "[Primary] " : ""}
                  {img.alt} — {img.url}
                </span>
                <AdminStatusForm action={deleteProductImageAction}>
                  <input type="hidden" name="id" value={img.id} />
                  <input type="hidden" name="productId" value={product.id} />
                  <button type="submit" className="text-brand-error hover:underline">
                    Remove
                  </button>
                </AdminStatusForm>
              </li>
            ))
          )}
        </ul>
        <AdminStatusForm action={addProductImageAction} className="grid gap-3 sm:grid-cols-4">
          <input type="hidden" name="productId" value={product.id} />
          <input name="url" placeholder="Image URL" required className={fieldClass} />
          <input name="alt" placeholder="Alt text" className={fieldClass} />
          <label className="flex items-center gap-2 text-sm text-brand-muted">
            <input type="checkbox" name="isPrimary" /> Primary
          </label>
          <button
            type="submit"
            className="rounded-[var(--brand-radius-md)] bg-brand-primary px-3 py-2 text-sm font-semibold text-white hover:bg-brand-primary-hover"
          >
            Attach URL
          </button>
        </AdminStatusForm>
      </section>
    </AdminShell>
  );
}
