import { Resend } from "resend";
import { emailConfig, getFromAddress, isResendConfigured } from "@/lib/email/config";

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }
  return resendClient;
}

type SendMailOptions = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendMail({ to, subject, html, replyTo }: SendMailOptions): Promise<void> {
  if (!isResendConfigured()) {
    throw new Error("Resend is not configured. Set RESEND_API_KEY.");
  }

  const { error } = await getResendClient().emails.send({
    from: getFromAddress(),
    to: [to],
    subject,
    html,
    replyTo: replyTo ?? emailConfig.salesEmail,
  });

  if (error) {
    throw new Error(error.message);
  }
}
