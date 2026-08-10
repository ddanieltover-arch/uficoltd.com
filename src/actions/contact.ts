"use server";

import { emailConfig, getEmailSetupError, isResendConfigured } from "@/lib/email/config";
import { sendMail } from "@/lib/email/send";
import { contactAdminEmail, contactUserEmail } from "@/lib/email/templates/contact";
import { enquiryAdminEmail, enquiryUserEmail } from "@/lib/email/templates/enquiry";
import { contactSchema, enquirySchema } from "@/lib/validations/contact";
import { getProductBySlug } from "@/lib/content";
import { createInquiry } from "@/services/inquiryService";
import { createQuoteRequest } from "@/services/quoteService";

type ActionResult =
  | { success: true; message: string }
  | { error: string; fields?: Record<string, string[]> };

async function sendDualEmails({
  adminTo,
  adminSubject,
  adminHtml,
  userTo,
  userSubject,
  userHtml,
  replyTo,
}: {
  adminTo: string;
  adminSubject: string;
  adminHtml: string;
  userTo: string;
  userSubject: string;
  userHtml: string;
  replyTo: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!isResendConfigured()) {
    console.error("[email] Resend not configured");
    return {
      ok: false,
      error: getEmailSetupError(),
    };
  }

  try {
    await sendMail({
      to: adminTo,
      subject: adminSubject,
      html: adminHtml,
      replyTo,
    });
  } catch (err) {
    console.error("[email] Failed to send admin notification:", err);
    return {
      ok: false,
      error:
        "Failed to send your message. Please try again or email sales@uficoltd.com directly.",
    };
  }

  try {
    await sendMail({
      to: userTo,
      subject: userSubject,
      html: userHtml,
      replyTo: emailConfig.salesEmail,
    });
  } catch (err) {
    console.error("[email] Admin notified but user copy failed:", err);
  }

  return { ok: true };
}

export async function submitContactForm(data: unknown): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid form data", fields: parsed.error.flatten().fieldErrors };
  }

  try {
    await createInquiry({
      contactName: parsed.data.name,
      email: parsed.data.email,
      message: `Subject: ${parsed.data.subject}\n\n${parsed.data.message}`,
      source: "CONTACT",
      sourcePath: "/contact-us",
    });
  } catch (err) {
    // Still deliver email when DATABASE_URL is missing (e.g. Vercel without DB yet).
    console.error("[inquiry] Failed to persist contact:", err);
  }

  const admin = contactAdminEmail(parsed.data);
  const user = contactUserEmail(parsed.data);

  const result = await sendDualEmails({
    adminTo: emailConfig.salesEmail,
    adminSubject: admin.subject,
    adminHtml: admin.html,
    userTo: parsed.data.email,
    userSubject: user.subject,
    userHtml: user.html,
    replyTo: parsed.data.email,
  });

  if (!result.ok) {
    return { error: result.error };
  }

  return {
    success: true,
    message: "Your message has been sent. A confirmation copy has been emailed to you.",
  };
}

export async function submitEnquiryForm(data: unknown): Promise<ActionResult> {
  const parsed = enquirySchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid form data", fields: parsed.error.flatten().fieldErrors };
  }

  let productId: string | null = null;
  let productLabel = parsed.data.subject ?? null;
  if (parsed.data.productSlug) {
    const product = await getProductBySlug(parsed.data.productSlug);
    if (product) {
      // JSON catalogue ids are numeric strings; Prisma CUIDs are not.
      productId = /^\d+$/.test(product.id) ? null : product.id;
      productLabel = product.title;
    }
  }

  try {
    await createQuoteRequest({
      contactName: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      productId,
      productLabel,
      message: parsed.data.enquiry,
    });
  } catch (err) {
    console.error("[quote] Failed to persist enquiry:", err);
  }

  const admin = enquiryAdminEmail(parsed.data);
  const user = enquiryUserEmail(parsed.data);

  const result = await sendDualEmails({
    adminTo: emailConfig.salesEmail,
    adminSubject: admin.subject,
    adminHtml: admin.html,
    userTo: parsed.data.email,
    userSubject: user.subject,
    userHtml: user.html,
    replyTo: parsed.data.email,
  });

  if (!result.ok) {
    return { error: result.error };
  }

  return {
    success: true,
    message: "Your enquiry has been sent. A confirmation copy has been emailed to you.",
  };
}
