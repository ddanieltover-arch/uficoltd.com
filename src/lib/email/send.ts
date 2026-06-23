import nodemailer from "nodemailer";
import { emailConfig, getFromAddress, isSmtpConfigured } from "@/lib/email/config";

let transporter: nodemailer.Transporter | null = null;

function getSmtpTransporter(): nodemailer.Transporter {
  if (!isSmtpConfigured()) {
    throw new Error("SMTP is not configured. Set SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASS.");
  }

  if (!transporter) {
    const port = Number(process.env.SMTP_PORT);
    const secure =
      process.env.SMTP_SECURE === "true" || (process.env.SMTP_SECURE !== "false" && port === 465);

    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      requireTLS: !secure && port === 587,
      connectionTimeout: 15_000,
      greetingTimeout: 15_000,
      socketTimeout: 20_000,
      tls: {
        minVersion: "TLSv1.2",
        rejectUnauthorized: process.env.SMTP_TLS_REJECT_UNAUTHORIZED !== "false",
      },
    });
  }

  return transporter;
}

function resetSmtpTransporter(): void {
  transporter = null;
}

type SendMailOptions = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendMail({ to, subject, html, replyTo }: SendMailOptions): Promise<void> {
  if (!isSmtpConfigured()) {
    throw new Error("SMTP is not configured.");
  }

  try {
    await getSmtpTransporter().sendMail({
      from: getFromAddress(),
      to,
      subject,
      html,
      replyTo: replyTo ?? emailConfig.salesEmail,
    });
  } catch (error) {
    resetSmtpTransporter();
    throw error;
  }
}

export async function verifySmtpConnection(): Promise<boolean> {
  if (!isSmtpConfigured()) return false;
  try {
    await getSmtpTransporter().verify();
    return true;
  } catch {
    resetSmtpTransporter();
    return false;
  }
}
