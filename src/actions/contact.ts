"use server";

import { emailConfig, isSmtpConfigured } from "@/lib/email/config";
import { sendMail } from "@/lib/email/send";
import { contactAdminEmail, contactUserEmail } from "@/lib/email/templates/contact";
import { enquiryAdminEmail, enquiryUserEmail } from "@/lib/email/templates/enquiry";
import { contactSchema, enquirySchema } from "@/lib/validations/contact";

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
  if (!isSmtpConfigured()) {
    console.error("[email] SMTP not configured");
    return {
      ok: false,
      error:
        "Email service is not configured. Please contact us directly at sales@uficoltd.com.",
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
      error: "Failed to send your message. Please try again or email sales@uficoltd.com directly.",
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
    // Admin received the message — still report success to the user
  }

  return { ok: true };
}

export async function submitContactForm(data: unknown): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid form data", fields: parsed.error.flatten().fieldErrors };
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
