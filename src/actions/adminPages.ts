"use server";

import type { PublishStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { requireCmsWrite } from "@/lib/adminAuth";
import { updateSitePage } from "@/services/sitePageService";

const STATUSES: PublishStatus[] = ["DRAFT", "PUBLISHED", "ARCHIVED"];

export async function updateSitePageAction(formData: FormData) {
  await requireCmsWrite();
  const slug = String(formData.get("slug") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "");
  const status = String(formData.get("status") ?? "") as PublishStatus;
  if (!slug || !title) throw new Error("Slug and title are required");
  await updateSitePage(slug, {
    title,
    body,
    status: STATUSES.includes(status) ? status : "DRAFT",
  });
  revalidatePath("/admin");
  revalidatePath("/admin/pages");
  revalidatePath(`/${slug}`);
}
