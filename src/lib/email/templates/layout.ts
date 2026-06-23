import { emailConfig } from "@/lib/email/config";
import { escapeHtml, nl2br } from "@/lib/email/escape";

type LayoutOptions = {
  preheader: string;
  title: string;
  body: string;
  accent?: "green" | "navy";
};

export function emailLayout({ preheader, title, body, accent = "green" }: LayoutOptions): string {
  const accentColor = accent === "green" ? "#0ba22e" : "#273647";
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,${accentColor} 0%,#088a26 100%);border-radius:16px 16px 0 0;padding:28px 32px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.8);">${escapeHtml(emailConfig.siteName)}</p>
              <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;line-height:1.3;">${escapeHtml(title)}</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff;padding:32px;border-left:1px solid #e2e8f0;border-right:1px solid #e2e8f0;">
              ${body}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color:#0f172a;border-radius:0 0 16px 16px;padding:24px 32px;">
              <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#ffffff;">${escapeHtml(emailConfig.siteName)}</p>
              <p style="margin:0 0 4px;font-size:12px;color:#94a3b8;line-height:1.6;">${escapeHtml(emailConfig.address)}</p>
              <p style="margin:0 0 4px;font-size:12px;color:#94a3b8;">
                <a href="mailto:${emailConfig.salesEmail}" style="color:#86efac;text-decoration:none;">${escapeHtml(emailConfig.salesEmail)}</a>
                &nbsp;·&nbsp;${escapeHtml(emailConfig.phone)}
              </p>
              <p style="margin:16px 0 0;font-size:11px;color:#64748b;">
                © ${year} ${escapeHtml(emailConfig.siteName)} ·
                <a href="${emailConfig.siteUrl}" style="color:#86efac;text-decoration:none;">${escapeHtml(emailConfig.siteUrl.replace(/^https?:\/\//, ""))}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function detailRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;width:130px;vertical-align:top;">
      <span style="font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${escapeHtml(label)}</span>
    </td>
    <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;vertical-align:top;">
      <span style="font-size:14px;color:#0f172a;line-height:1.5;">${value}</span>
    </td>
  </tr>`;
}

export function messageBlock(label: string, content: string): string {
  return `<div style="margin-top:20px;">
    <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">${escapeHtml(label)}</p>
    <div style="background-color:#f8fafc;border-left:4px solid #0ba22e;border-radius:0 8px 8px 0;padding:16px 20px;">
      <p style="margin:0;font-size:14px;color:#334155;line-height:1.7;">${nl2br(content)}</p>
    </div>
  </div>`;
}

export function ctaButton(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 8px;">
    <tr>
      <td style="border-radius:9999px;background:linear-gradient(135deg,#0ba22e,#088a26);">
        <a href="${href}" style="display:inline-block;padding:14px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:9999px;">${escapeHtml(label)}</a>
      </td>
    </tr>
  </table>`;
}
