import nodemailer from "nodemailer";
import {
  emailConfig,
  getFromAddress,
  isMailConfigured,
  isSmtpConfigured,
  usesMailRelay,
} from "@/lib/email/config";
import { sendMailViaRelay } from "@/lib/email/relay";

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

async function sendViaSmtp({ to, subject, html, replyTo }: SendMailOptions): Promise<void> {
  await getSmtpTransporter().sendMail({
    from: getFromAddress(),
    to,
    subject,
    html,
    replyTo: replyTo ?? emailConfig.salesEmail,
  });
}

export async function sendMail(options: SendMailOptions): Promise<void> {
  if (!isMailConfigured()) {
    throw new Error("Mail is not configured.");
  }

  if (usesMailRelay()) {
    await sendMailViaRelay(options);
    return;
  }

  try {
    await sendViaSmtp(options);
  } catch (error) {
    resetSmtpTransporter();
    throw error;
  }
}

export async function verifySmtpConnection(): Promise<boolean> {
  if (!isSmtpConfigured() || usesMailRelay()) return false;
  try {
    await getSmtpTransporter().verify();
    return true;
  } catch {
    resetSmtpTransporter();
    return false;
  }
}
