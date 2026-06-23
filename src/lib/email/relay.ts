import { emailConfig, getFromAddress, isMailRelayConfigured } from "@/lib/email/config";

type RelayMailOptions = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendMailViaRelay({
  to,
  subject,
  html,
  replyTo,
}: RelayMailOptions): Promise<void> {
  if (!isMailRelayConfigured()) {
    throw new Error("Mail relay is not configured.");
  }

  const response = await fetch(process.env.MAIL_RELAY_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Mail-Secret": process.env.MAIL_RELAY_SECRET!,
    },
    body: JSON.stringify({
      to,
      subject,
      html,
      replyTo: replyTo ?? emailConfig.salesEmail,
      from: getFromAddress(),
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Mail relay failed (${response.status}): ${body || response.statusText}`);
  }

  const result = (await response.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
  if (result && result.ok === false) {
    throw new Error(result.error ?? "Mail relay rejected the message.");
  }
}
