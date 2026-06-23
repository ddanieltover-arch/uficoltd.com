"use server";

import { contactSchema, enquirySchema } from "@/lib/validations/contact";

type ActionResult = { success: true } | { error: string; fields?: Record<string, string[]> };

export async function submitContactForm(data: unknown): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid form data", fields: parsed.error.flatten().fieldErrors };
  }

  // Wire to Resend/SendGrid when RESEND_API_KEY is configured
  if (process.env.RESEND_API_KEY) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "noreply@uficoltd.com",
        to: process.env.CONTACT_TO_EMAIL ?? "sales@uficoltd.com",
        subject: `[Contact] ${parsed.data.subject}`,
        html: `<p><strong>From:</strong> ${parsed.data.name} (${parsed.data.email})</p><p>${parsed.data.message}</p>`,
      }),
    });
  }

  console.info("[contact]", parsed.data);
  return { success: true };
}

export async function submitEnquiryForm(data: unknown): Promise<ActionResult> {
  const parsed = enquirySchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid form data", fields: parsed.error.flatten().fieldErrors };
  }

  if (process.env.RESEND_API_KEY) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? "noreply@uficoltd.com",
        to: process.env.CONTACT_TO_EMAIL ?? "sales@uficoltd.com",
        subject: `[Product Enquiry] ${parsed.data.subject ?? parsed.data.productSlug ?? "General"}`,
        html: `<p><strong>From:</strong> ${parsed.data.name}<br/><strong>Email:</strong> ${parsed.data.email}<br/><strong>Phone:</strong> ${parsed.data.phone}</p><p>${parsed.data.enquiry}</p>`,
      }),
    });
  }

  console.info("[enquiry]", parsed.data);
  return { success: true };
}
