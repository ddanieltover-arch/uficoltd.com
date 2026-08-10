"use server";

import type { PublishStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireCmsWrite } from "@/lib/adminAuth";
import {
  addProductImage,
  addProductPackaging,
  addProductSpecification,
  createProduct,
  deleteProduct,
  deleteProductImage,
  deleteProductPackaging,
  deleteProductSpecification,
  updateProduct,
} from "@/services/adminProductService";

const STATUSES: PublishStatus[] = ["DRAFT", "PUBLISHED", "ARCHIVED"];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function revalidateProduct(id?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/products");
  if (id) revalidatePath(`/admin/products/${id}`);
  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/product", "layout");
  revalidatePath("/product-category", "layout");
  revalidatePath("/sitemap.xml");
}

export async function createProductAction(formData: FormData) {
  await requireCmsWrite();
  const name = String(formData.get("name") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "");
  const shortDescription = String(formData.get("shortDescription") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim() || null;
  const slugInput = String(formData.get("slug") ?? "").trim();
  if (!name || !categoryId || !shortDescription || !description) {
    throw new Error("Name, category, and descriptions are required");
  }
  const product = await createProduct({
    name,
    slug: slugInput || slugify(name),
    categoryId,
    shortDescription,
    description,
    imageUrl,
    status: "DRAFT",
  });
  revalidateProduct(product.id);
}

export async function updateProductAction(formData: FormData) {
  await requireCmsWrite();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing product id");
  const status = String(formData.get("status") ?? "") as PublishStatus;
  await updateProduct(id, {
    name: String(formData.get("name") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    categoryId: String(formData.get("categoryId") ?? ""),
    shortDescription: String(formData.get("shortDescription") ?? ""),
    description: String(formData.get("description") ?? ""),
    originCountry: String(formData.get("originCountry") ?? "") || null,
    status: STATUSES.includes(status) ? status : undefined,
  });
  revalidateProduct(id);
}

export async function updateProductStatusAction(formData: FormData) {
  await requireCmsWrite();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as PublishStatus;
  if (!id || !STATUSES.includes(status)) throw new Error("Invalid status");
  await updateProduct(id, { status });
  revalidateProduct(id);
}

export async function deleteProductAction(formData: FormData) {
  await requireCmsWrite();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing product id");
  await deleteProduct(id);
  revalidateProduct();
}

export async function addProductSpecAction(formData: FormData) {
  await requireCmsWrite();
  const productId = String(formData.get("productId") ?? "");
  const label = String(formData.get("label") ?? "").trim();
  const value = String(formData.get("value") ?? "").trim();
  const unit = String(formData.get("unit") ?? "").trim() || null;
  if (!productId || !label || !value) throw new Error("Spec fields required");
  await addProductSpecification({ productId, label, value, unit });
  revalidateProduct(productId);
}

export async function deleteProductSpecAction(formData: FormData) {
  await requireCmsWrite();
  const id = String(formData.get("id") ?? "");
  const productId = String(formData.get("productId") ?? "");
  if (!id) throw new Error("Missing id");
  await deleteProductSpecification(id);
  revalidateProduct(productId || undefined);
}

export async function addProductPackagingAction(formData: FormData) {
  await requireCmsWrite();
  const productId = String(formData.get("productId") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  if (!productId || !name) throw new Error("Packaging name required");
  await addProductPackaging({
    productId,
    name,
    sizeLabel: String(formData.get("sizeLabel") ?? "").trim() || null,
    notes: String(formData.get("notes") ?? "").trim() || null,
  });
  revalidateProduct(productId);
}

export async function deleteProductPackagingAction(formData: FormData) {
  await requireCmsWrite();
  const id = String(formData.get("id") ?? "");
  const productId = String(formData.get("productId") ?? "");
  if (!id) throw new Error("Missing id");
  await deleteProductPackaging(id);
  revalidateProduct(productId || undefined);
}

export async function addProductImageAction(formData: FormData) {
  await requireCmsWrite();
  const productId = String(formData.get("productId") ?? "");
  const url = String(formData.get("url") ?? "").trim();
  const alt = String(formData.get("alt") ?? "").trim() || "Product image";
  if (!productId || !url) throw new Error("Image URL required");
  await addProductImage({
    productId,
    url,
    alt,
    isPrimary: formData.get("isPrimary") === "on",
  });
  revalidateProduct(productId);
}

export async function deleteProductImageAction(formData: FormData) {
  await requireCmsWrite();
  const id = String(formData.get("id") ?? "");
  const productId = String(formData.get("productId") ?? "");
  if (!id) throw new Error("Missing id");
  await deleteProductImage(id);
  revalidateProduct(productId || undefined);
}
