import type { AdminRole } from "@prisma/client";
import { auth } from "@/auth";

export class AdminAuthError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "AdminAuthError";
  }
}

const WRITE_ROLES: AdminRole[] = ["SUPER_ADMIN", "ADMIN"];
const CMS_WRITE_ROLES: AdminRole[] = ["SUPER_ADMIN", "ADMIN", "EDITOR"];
const SALES_WRITE_ROLES: AdminRole[] = [
  "SUPER_ADMIN",
  "ADMIN",
  "SALES_MANAGER",
];

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new AdminAuthError("Not authenticated");
  }
  return session;
}

function assertRole(role: AdminRole, allowed: AdminRole[], label: string) {
  if (!allowed.includes(role)) {
    throw new AdminAuthError(`Requires ${label} permission`);
  }
}

export async function requireAdminWrite() {
  const session = await requireAdmin();
  assertRole(session.user.role, WRITE_ROLES, "admin write");
  return session;
}

export async function requireCmsWrite() {
  const session = await requireAdmin();
  assertRole(session.user.role, CMS_WRITE_ROLES, "CMS write");
  return session;
}

export async function requireSalesWrite() {
  const session = await requireAdmin();
  assertRole(session.user.role, SALES_WRITE_ROLES, "sales write");
  return session;
}

export function canCmsWrite(role: AdminRole) {
  return CMS_WRITE_ROLES.includes(role);
}

export function canSalesWrite(role: AdminRole) {
  return SALES_WRITE_ROLES.includes(role);
}
