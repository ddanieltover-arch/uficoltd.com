import type { QuoteStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

function referenceCode() {
  const stamp = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `UFI-Q-${stamp}-${rand}`;
}

export async function createQuoteRequest(input: {
  contactName: string;
  email: string;
  phone?: string | null;
  companyName?: string | null;
  country?: string | null;
  productId?: string | null;
  productLabel?: string | null;
  quantityText?: string | null;
  destination?: string | null;
  message?: string | null;
}) {
  return prisma.quoteRequest.create({
    data: {
      referenceCode: referenceCode(),
      contactName: input.contactName,
      email: input.email,
      phone: input.phone ?? null,
      companyName: input.companyName ?? null,
      country: input.country ?? null,
      productId: input.productId ?? null,
      productLabel: input.productLabel ?? null,
      quantityText: input.quantityText ?? null,
      destination: input.destination ?? null,
      message: input.message ?? null,
      status: "NEW",
    },
  });
}

export async function listQuotes() {
  return prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
    include: { product: { select: { id: true, name: true, slug: true } } },
  });
}

export async function getQuoteById(id: string) {
  return prisma.quoteRequest.findUnique({
    where: { id },
    include: { product: { select: { id: true, name: true, slug: true } } },
  });
}

export async function updateQuote(
  id: string,
  data: {
    status?: QuoteStatus;
    companyName?: string | null;
    contactName?: string;
    email?: string;
    phone?: string | null;
    country?: string | null;
    productLabel?: string | null;
    quantityText?: string | null;
    destination?: string | null;
    message?: string | null;
    version?: number;
  },
) {
  const { version, ...rest } = data;
  if (typeof version === "number") {
    const result = await prisma.quoteRequest.updateMany({
      where: { id, version },
      data: { ...rest, version: { increment: 1 } },
    });
    if (result.count === 0) {
      throw new Error("Quote was updated elsewhere. Refresh and try again.");
    }
    return getQuoteById(id);
  }
  return prisma.quoteRequest.update({ where: { id }, data: rest });
}

export async function deleteQuote(id: string) {
  return prisma.quoteRequest.delete({ where: { id } });
}

export async function countQuotesByStatuses(statuses: QuoteStatus[]) {
  return prisma.quoteRequest.count({ where: { status: { in: statuses } } });
}

export async function listRecentQuotes(take = 5) {
  return prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
    take,
    select: {
      id: true,
      referenceCode: true,
      contactName: true,
      status: true,
      createdAt: true,
    },
  });
}
