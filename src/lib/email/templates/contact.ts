import type { ContactFormData } from "@/lib/validations/contact";
import { emailConfig } from "@/lib/email/config";
import { escapeHtml } from "@/lib/email/escape";
import { ctaButton, detailRow, emailLayout, messageBlock } from "@/lib/email/templates/layout";

export function contactAdminEmail(data: ContactFormData) {
  const body = `
    <p style="margin:0 0 20px;font-size:15px;color:#475569;line-height:1.6;">
      A new message was submitted through the website contact form.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:12px;padding:4px 16px;">
      ${detailRow("Name", escapeHtml(data.name))}
      ${detailRow("Email", `<a href="mailto:${escapeHtml(data.email)}" style="color:#0ba22e;text-decoration:none;">${escapeHtml(data.email)}</a>`)}
      ${detailRow("Subject", escapeHtml(data.subject))}
    </table>
    ${messageBlock("Message", data.message)}
    ${ctaButton(`mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject)}`, "Reply to Customer")}
  `;

  return {
    subject: `[Website Contact] ${data.subject}`,
    html: emailLayout({
      preheader: `New contact from ${data.name}: ${data.subject}`,
      title: "New Contact Form Submission",
      body,
      accent: "navy",
    }),
  };
}

export function contactUserEmail(data: ContactFormData) {
  const body = `
    <p style="margin:0 0 8px;font-size:16px;font-weight:600;color:#0f172a;">Hi ${escapeHtml(data.name)},</p>
    <p style="margin:0 0 20px;font-size:15px;color:#475569;line-height:1.6;">
      Thank you for contacting <strong>${escapeHtml(emailConfig.siteName)}</strong>.
      We have received your message and our sales team will respond within 1–2 business days.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border-radius:12px;padding:4px 16px;border:1px solid #e2e8f0;">
      ${detailRow("Subject", escapeHtml(data.subject))}
      ${detailRow("Submitted", new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }))}
    </table>
    ${messageBlock("Your Message", data.message)}
    <p style="margin:24px 0 0;font-size:13px;color:#64748b;line-height:1.6;">
      If you need urgent assistance, call us at
      <a href="tel:${emailConfig.phone.replace(/\s/g, "")}" style="color:#0ba22e;text-decoration:none;font-weight:600;">${escapeHtml(emailConfig.phone)}</a>
      or email <a href="mailto:${emailConfig.salesEmail}" style="color:#0ba22e;text-decoration:none;">${escapeHtml(emailConfig.salesEmail)}</a>.
    </p>
    ${ctaButton(emailConfig.siteUrl + "/shop", "Browse Our Products")}
  `;

  return {
    subject: `We received your message — ${data.subject}`,
    html: emailLayout({
      preheader: "Your message has been received. Our team will be in touch shortly.",
      title: "Message Received",
      body,
    }),
  };
}
