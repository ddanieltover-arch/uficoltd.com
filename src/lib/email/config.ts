function resolveFromEmail(): string {
  if (process.env.SMTP_FROM_EMAIL) return process.env.SMTP_FROM_EMAIL;
  if (process.env.SMTP_USER?.includes("@")) return process.env.SMTP_USER;
  return "sales@uficoltd.com";
}

export const emailConfig = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? "United Farmer and Industry Co LTD",
  siteUrl: process.env.NEXT_PUBLIC_URL ?? "https://uficoltd.com",
  salesEmail: process.env.SMTP_TO_EMAIL ?? "sales@uficoltd.com",
  fromEmail: resolveFromEmail(),
  fromName: process.env.SMTP_FROM_NAME ?? "UFI Co., LTD",
  phone: "+(66) 2656 8481",
  address: "365 Moo 1, Maliwan Road, Nongrua, Khonkaen 40210, Thailand",
} as const;

export function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS,
  );
}

export function isMailRelayConfigured(): boolean {
  return Boolean(process.env.MAIL_RELAY_URL && process.env.MAIL_RELAY_SECRET);
}

export function isVercelDeployment(): boolean {
  return Boolean(process.env.VERCEL);
}

/** Direct SMTP from the app, or SMTP via Ifastnet mail relay on Vercel. */
export function isMailConfigured(): boolean {
  if (isMailRelayConfigured()) return true;
  if (isVercelDeployment()) return false;
  return isSmtpConfigured();
}

export function usesMailRelay(): boolean {
  if (!isMailRelayConfigured()) return false;
  if (isVercelDeployment()) return true;
  return process.env.MAIL_RELAY_PREFER === "true";
}

export function getMailSetupError(): string {
  if (isVercelDeployment() && !isMailRelayConfigured()) {
    return "Email is not configured for this host. Add MAIL_RELAY_URL and MAIL_RELAY_SECRET (Vercel blocks direct SMTP). See scripts/ifastnet-mail-relay.php.";
  }

  if (!isMailConfigured()) {
    return "Email service is not configured. Please contact us directly at sales@uficoltd.com.";
  }

  return "Failed to send your message. Please try again or email sales@uficoltd.com directly.";
}

export function getFromAddress(): string {
  return `"${emailConfig.fromName}" <${emailConfig.fromEmail}>`;
}
