import nodemailer from "nodemailer";
import { emailConfig, isSmtpConfigured } from "@/lib/email/config";

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!isSmtpConfigured()) {
    throw new Error("SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.");
  }

  if (!transporter) {
    const port = Number(process.env.SMTP_PORT);
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  return transporter;
}

type SendMailOptions = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendMail({ to, subject, html, replyTo }: SendMailOptions): Promise<void> {
  const transport = getTransporter();

  await transport.sendMail({
    from: `"${emailConfig.fromName}" <${emailConfig.fromEmail}>`,
    to,
    subject,
    html,
    replyTo: replyTo ?? emailConfig.salesEmail,
  });
}

export async function verifySmtpConnection(): Promise<boolean> {
  if (!isSmtpConfigured()) return false;
  try {
    await getTransporter().verify();
    return true;
  } catch {
    return false;
  }
}
