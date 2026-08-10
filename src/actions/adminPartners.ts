"use server";

import type { ApplicationStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireSalesWrite } from "@/lib/adminAuth";
import {
  deleteDealerApplication,
  deleteDistributorApplication,
  updateDealerApplication,
  updateDistributorApplication,
} from "@/services/partnerService";

const STATUSES: ApplicationStatus[] = [
  "NEW",
  "UNDER_REVIEW",
  "APPROVED",
  "REJECTED",
  "SPAM",
];

function revalidateDealers(id?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/dealers");
  if (id) revalidatePath(`/admin/dealers/${id}`);
}

function revalidateDistributors(id?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/distributors");
  if (id) revalidatePath(`/admin/distributors/${id}`);
}

export async function updateDealerStatusAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as ApplicationStatus;
  if (!id || !STATUSES.includes(status)) throw new Error("Invalid status");
  await updateDealerApplication(id, { status });
  revalidateDealers(id);
}

export async function updateDealerAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing id");
  const status = String(formData.get("status") ?? "") as ApplicationStatus;
  await updateDealerApplication(id, {
    status: STATUSES.includes(status) ? status : undefined,
    companyName: String(formData.get("companyName") ?? ""),
    contactName: String(formData.get("contactName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? "") || null,
    country: String(formData.get("country") ?? ""),
    marketsServed: String(formData.get("marketsServed") ?? "") || null,
    message: String(formData.get("message") ?? "") || null,
  });
  revalidateDealers(id);
}

export async function deleteDealerAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing id");
  await deleteDealerApplication(id);
  revalidateDealers();
}

export async function updateDistributorStatusAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as ApplicationStatus;
  if (!id || !STATUSES.includes(status)) throw new Error("Invalid status");
  await updateDistributorApplication(id, { status });
  revalidateDistributors(id);
}

export async function updateDistributorAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing id");
  const status = String(formData.get("status") ?? "") as ApplicationStatus;
  await updateDistributorApplication(id, {
    status: STATUSES.includes(status) ? status : undefined,
    companyName: String(formData.get("companyName") ?? ""),
    contactName: String(formData.get("contactName") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? "") || null,
    country: String(formData.get("country") ?? ""),
    marketsServed: String(formData.get("marketsServed") ?? "") || null,
    message: String(formData.get("message") ?? "") || null,
  });
  revalidateDistributors(id);
}

export async function deleteDistributorAction(formData: FormData) {
  await requireSalesWrite();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("Missing id");
  await deleteDistributorApplication(id);
  revalidateDistributors();
}
