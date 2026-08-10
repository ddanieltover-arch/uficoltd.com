import type { InquirySource, InquiryStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function createInquiry(input: {
  contactName: string;
  email: string;
  message: string;
  companyName?: string | null;
  phone?: string | null;
  country?: string | null;
  source?: InquirySource;
  sourcePath?: string | null;
}) {
  return prisma.inquiry.create({
    data: {
      contactName: input.contactName,
      email: input.email,
      message: input.message,
      companyName: input.companyName ?? null,
      phone: input.phone ?? null,
      country: input.country ?? null,
      source: input.source ?? "CONTACT",
      sourcePath: input.sourcePath ?? null,
      status: "NEW",
    },
  });
}

export async function listInquiries() {
  return prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getInquiryById(id: string) {
  return prisma.inquiry.findUnique({ where: { id } });
}

export async function updateInquiry(
  id: string,
  data: {
    status?: InquiryStatus;
    companyName?: string | null;
    contactName?: string;
    email?: string;
    phone?: string | null;
    country?: string | null;
    message?: string;
  },
) {
  return prisma.inquiry.update({ where: { id }, data });
}

export async function deleteInquiry(id: string) {
  return prisma.inquiry.delete({ where: { id } });
}

export async function countNewInquiries() {
  return prisma.inquiry.count({ where: { status: "NEW" } });
}

export async function listRecentInquiries(take = 5) {
  return prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take,
    select: {
      id: true,
      contactName: true,
      email: true,
      status: true,
      createdAt: true,
    },
  });
}
