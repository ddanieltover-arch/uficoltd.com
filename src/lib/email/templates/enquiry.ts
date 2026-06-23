import type { EnquiryFormData } from "@/lib/validations/contact";
import { emailConfig } from "@/lib/email/config";
import { escapeHtml } from "@/lib/email/escape";
import { ctaButton, detailRow, emailLayout, messageBlock } from "@/lib/email/templates/layout";

function productLabel(data: EnquiryFormData): string {
  if (data.subject?.startsWith("Enquiry:")) {
    return data.subject.replace("Enquiry:", "").trim();
  }
  if (data.productSlug) {
    return data.productSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return "General Enquiry";
}

export function enquiryAdminEmail(data: EnquiryFormData) {
  const product = productLabel(data);
  const productUrl = data.productSlug
    ? `${emailConfig.siteUrl}/product/${data.productSlug}`
    : emailConfig.siteUrl + "/shop";

  const body = `
    <p style="margin:0 0 20px;font-size:15px;color:#475569;line-height:1.6;">
      A new product enquiry was submitted through the website.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e2e8f0;border-radius:12px;padding:4px 16px;">
      ${detailRow("Name", escapeHtml(data.name))}
      ${detailRow("Email", `<a href="mailto:${escapeHtml(data.email)}" style="color:#0ba22e;text-decoration:none;">${escapeHtml(data.email)}</a>`)}
      ${detailRow("Phone", escapeHtml(data.phone))}
      ${detailRow("Product", `<a href="${productUrl}" style="color:#0ba22e;text-decoration:none;font-weight:600;">${escapeHtml(product)}</a>`)}
      ${data.subject ? detailRow("Subject", escapeHtml(data.subject)) : ""}
    </table>
    ${messageBlock("Enquiry Details", data.enquiry)}
    ${ctaButton(`mailto:${data.email}?subject=Re: ${encodeURIComponent(data.subject ?? product)}`, "Reply to Customer")}
  `;

  return {
    subject: `[Product Enquiry] ${product} — ${data.name}`,
    html: emailLayout({
      preheader: `New enquiry from ${data.name} for ${product}`,
      title: "New Product Enquiry",
      body,
      accent: "navy",
    }),
  };
}

export function enquiryUserEmail(data: EnquiryFormData) {
  const product = productLabel(data);

  const body = `
    <p style="margin:0 0 8px;font-size:16px;font-weight:600;color:#0f172a;">Hi ${escapeHtml(data.name)},</p>
    <p style="margin:0 0 20px;font-size:15px;color:#475569;line-height:1.6;">
      Thank you for your interest in our products. We have received your enquiry and our sales team will prepare a quote for you shortly.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;border-radius:12px;padding:4px 16px;border:1px solid #e2e8f0;">
      ${detailRow("Product", escapeHtml(product))}
      ${detailRow("Phone", escapeHtml(data.phone))}
      ${detailRow("Submitted", new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }))}
    </table>
    ${messageBlock("Your Enquiry", data.enquiry)}
    <p style="margin:24px 0 0;font-size:13px;color:#64748b;line-height:1.6;">
      Typical response time is 1–2 business days. For urgent orders, contact us at
      <a href="tel:${emailConfig.phone.replace(/\s/g, "")}" style="color:#0ba22e;text-decoration:none;font-weight:600;">${escapeHtml(emailConfig.phone)}</a>.
    </p>
    ${ctaButton(emailConfig.siteUrl + "/shop", "View More Products")}
  `;

  return {
    subject: `Your enquiry for ${product} — ${emailConfig.siteName}`,
    html: emailLayout({
      preheader: `We've received your enquiry for ${product}. Our team will respond soon.`,
      title: "Enquiry Received",
      body,
    }),
  };
}
