import type { ApplicationStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type PartnerKind = "dealer" | "distributor";

export async function listDealerApplications() {
  return prisma.dealerApplication.findMany({ orderBy: { createdAt: "desc" } });
}

export async function listDistributorApplications() {
  return prisma.distributorApplication.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getDealerApplication(id: string) {
  return prisma.dealerApplication.findUnique({ where: { id } });
}

export async function getDistributorApplication(id: string) {
  return prisma.distributorApplication.findUnique({ where: { id } });
}

export async function updateDealerApplication(
  id: string,
  data: {
    status?: ApplicationStatus;
    companyName?: string;
    contactName?: string;
    email?: string;
    phone?: string | null;
    country?: string;
    marketsServed?: string | null;
    message?: string | null;
  },
) {
  return prisma.dealerApplication.update({ where: { id }, data });
}

export async function updateDistributorApplication(
  id: string,
  data: {
    status?: ApplicationStatus;
    companyName?: string;
    contactName?: string;
    email?: string;
    phone?: string | null;
    country?: string;
    marketsServed?: string | null;
    message?: string | null;
  },
) {
  return prisma.distributorApplication.update({ where: { id }, data });
}

export async function deleteDealerApplication(id: string) {
  return prisma.dealerApplication.delete({ where: { id } });
}

export async function deleteDistributorApplication(id: string) {
  return prisma.distributorApplication.delete({ where: { id } });
}

export async function countNewPartnerApplications(kind: PartnerKind) {
  if (kind === "dealer") {
    return prisma.dealerApplication.count({ where: { status: "NEW" } });
  }
  return prisma.distributorApplication.count({ where: { status: "NEW" } });
}
