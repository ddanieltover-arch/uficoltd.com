import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

const MIN_FILL_MS = 3_000;
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;

type HitStore = Map<string, number[]>;

const ipHits: HitStore = new Map();

export type SpamFields = {
  companyWebsite: string;
  startedAt?: number;
  turnstileToken: string;
};

export type SpamDecision =
  | { action: "allow" }
  | { action: "silent" }
  | { action: "reject"; error: string };

export function readSpamFields(data: unknown): SpamFields {
  const record = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
  const startedAt = Number(record.startedAt);

  return {
    companyWebsite: typeof record.companyWebsite === "string" ? record.companyWebsite.trim() : "",
    startedAt: Number.isFinite(startedAt) ? startedAt : undefined,
    turnstileToken: typeof record.turnstileToken === "string" ? record.turnstileToken : "",
  };
}

export function isTurnstileEnabled(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
}

export async function assessFormSpam(input: {
  fields: SpamFields;
  email: string;
  message: string;
}): Promise<SpamDecision> {
  const { fields, email, message } = input;

  if (fields.companyWebsite) {
    return silent("honeypot");
  }

  if (!fields.startedAt || Date.now() - fields.startedAt < MIN_FILL_MS) {
    return silent("too-fast");
  }

  const linkCount = message.match(/https?:\/\/|www\./gi)?.length ?? 0;
  if (linkCount >= 3) {
    return {
      action: "reject",
      error: "Please remove extra links and describe your enquiry in plain text.",
    };
  }

  if (isTurnstileEnabled()) {
    const passed = await verifyTurnstile(fields.turnstileToken);
    if (!passed) {
      return {
        action: "reject",
        error: "Please complete the security check and try again.",
      };
    }
  } else if (process.env.NODE_ENV === "production") {
    console.error("[spam] Turnstile is not configured. Form checks are only partial.");
  }

  const ip = await clientIp();
  if (tooMany(ipHits, `ip:${ip}`)) {
    return {
      action: "reject",
      error: "Too many messages from this connection. Please try again in an hour or email sales@uficoltd.com.",
    };
  }

  const recent = await recentSubmissionsForEmail(email);
  if (recent >= MAX_PER_WINDOW) {
    return {
      action: "reject",
      error: "Too many messages from this email. Please try again in an hour or email sales@uficoltd.com.",
    };
  }

  return { action: "allow" };
}

function silent(reason: string): SpamDecision {
  console.warn("[spam] dropped submission", { reason });
  return { action: "silent" };
}

function tooMany(store: HitStore, key: string): boolean {
  const now = Date.now();
  const recent = (store.get(key) ?? []).filter((at) => now - at < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) {
    store.set(key, recent);
    return true;
  }
  recent.push(now);
  store.set(key, recent);
  return false;
}

async function clientIp(): Promise<string> {
  const headerList = await headers();
  const forwarded = headerList.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return headerList.get("x-real-ip") ?? "unknown";
}

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token) return false;

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch (error) {
    console.error("[spam] Turnstile verification failed", error);
    return false;
  }
}

async function recentSubmissionsForEmail(email: string): Promise<number> {
  if (!process.env.DATABASE_URL) return 0;

  const since = new Date(Date.now() - WINDOW_MS);
  const normalized = email.trim().toLowerCase();

  try {
    const [inquiries, quotes] = await Promise.all([
      prisma.inquiry.count({
        where: { email: { equals: normalized, mode: "insensitive" }, createdAt: { gte: since } },
      }),
      prisma.quoteRequest.count({
        where: { email: { equals: normalized, mode: "insensitive" }, createdAt: { gte: since } },
      }),
    ]);
    return inquiries + quotes;
  } catch (error) {
    console.error("[spam] Could not check recent submissions", error);
    return 0;
  }
}
