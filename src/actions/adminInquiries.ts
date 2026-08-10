"use server";

import type { InquiryStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireSalesWrite } from "@/lib/adminAuth";
import { deleteInquiry, updateInquiry } from "@/services/inquiryService";

const STATUSES: InquiryStatus[] = [
  "NEW",
  "IN_PROGRESS",
  "CLOSED",
  "SPAM",
  "ARCHIVED",
];

function revalidateInquiry(id?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/inquiries");
  if (id) revalidatePath(`/admin/inquiries/${id}`);
}

export async function updateInquiryStatusAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as InquiryStatus;
  if (!id || !STATUSES.includes(status)) {
    throw new Error("Invalid inquiry status update");
  }
  await updateInquiry(id, { status });
  revalidateInquiry(id);
}

export async function updateInquiryAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing inquiry id");
  const status = String(formData.get("status") ?? "") as InquiryStatus;
  await updateInquiry(id, {
    status: STATUSES.includes(status) ? status : undefined,
    companyName: String(formData.get("companyName") ?? "") || null,
    contactName: String(formData.get("contactName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? "") || null,
    country: String(formData.get("country") ?? "") || null,
    message: String(formData.get("message") ?? ""),
  });
  revalidateInquiry(id);
}

export async function deleteInquiryAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing inquiry id");
  await deleteInquiry(id);
  revalidateInquiry();
}
