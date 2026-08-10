"use server";

import type { QuoteStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireSalesWrite } from "@/lib/adminAuth";
import { deleteQuote, updateQuote } from "@/services/quoteService";

const STATUSES: QuoteStatus[] = [
  "NEW",
  "IN_PROGRESS",
  "AWAITING_INFO",
  "QUOTED",
  "CLOSED",
  "SPAM",
  "ARCHIVED",
];

function revalidateQuote(id?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/quotes");
  if (id) revalidatePath(`/admin/quotes/${id}`);
}

export async function updateQuoteStatusAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as QuoteStatus;
  if (!id || !STATUSES.includes(status)) {
    throw new Error("Invalid quote status update");
  }
  await updateQuote(id, { status });
  revalidateQuote(id);
}

export async function updateQuoteAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  const version = Number(formData.get("version") ?? NaN);
  if (!id) throw new Error("Missing quote id");

  const status = String(formData.get("status") ?? "") as QuoteStatus;
  await updateQuote(id, {
    status: STATUSES.includes(status) ? status : undefined,
    companyName: String(formData.get("companyName") ?? "") || null,
    contactName: String(formData.get("contactName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? "") || null,
    country: String(formData.get("country") ?? "") || null,
    productLabel: String(formData.get("productLabel") ?? "") || null,
    quantityText: String(formData.get("quantityText") ?? "") || null,
    destination: String(formData.get("destination") ?? "") || null,
    message: String(formData.get("message") ?? "") || null,
    version: Number.isFinite(version) ? version : undefined,
  });
  revalidateQuote(id);
}

export async function deleteQuoteAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing quote id");
  await deleteQuote(id);
  revalidateQuote();
}
