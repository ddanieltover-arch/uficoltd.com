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
    turnstileToken:
      typeof record["cf-turnstile-response"] === "string"
        ? record["cf-turnstile-response"]
          : "",
  };
}

export async function assessFormSpam(input: {
  fields: SpamFields;
  email: string;
  message: string;
  expectedAction: "contact" | "enquiry";
}): Promise<SpamDecision> {
  const { fields, email, message, expectedAction } = input;

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

  const ip = await clientIp();
  const verified = await verifyTurnstile(fields.turnstileToken, expectedAction, ip);
  if (!verified) {
    return {
      action: "reject",
      error: "Please complete the security check and try again.",
    };
  }

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

function expectedHostnames(): Set<string> {
  const configured = (process.env.TURNSTILE_HOSTNAMES ?? "")
    .split(",")
    .map((hostname) => hostname.trim().toLowerCase())
    .filter(Boolean);

  if (configured.length > 0) return new Set(configured);
  if (process.env.NODE_ENV === "production") {
    return new Set(["uficoltd.com", "www.uficoltd.com"]);
  }
  return new Set(["localhost", "127.0.0.1"]);
}

async function verifyTurnstile(
  token: string,
  expectedAction: string,
  clientIp: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET;
  const hostnames = expectedHostnames();
  if (
    !secret ||
    !expectedAction ||
    token.length === 0 ||
    token.length > 2048 ||
    hostnames.size === 0
  ) {
    return false;
  }

  const body = new URLSearchParams({ secret, response: token });
  if (clientIp && clientIp !== "unknown") body.set("remoteip", clientIp);

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      signal: AbortSignal.timeout(10_000),
      body,
    });
    if (!response.ok) return false;

    const result = (await response.json()) as {
      success?: boolean;
      action?: string;
      hostname?: string;
    };

    return Boolean(
      result.success === true &&
        result.action === expectedAction &&
        result.hostname &&
        hostnames.has(result.hostname.toLowerCase()),
    );
  } catch (error) {
    console.error("[spam] Turnstile siteverify failed", error);
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
