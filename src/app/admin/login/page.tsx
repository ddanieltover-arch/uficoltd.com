import { LoginForm } from "@/features/admin/LoginForm";
import { site } from "@/lib/content";

export const metadata = {
  title: "Admin login",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function safeCallback(raw: string | string[] | undefined): string {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value || !value.startsWith("/admin") || value.startsWith("//") || value.includes("://")) {
    return "/admin";
  }
  return value;
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;
  const callbackUrl = safeCallback(params.callbackUrl);

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-[var(--brand-container)] items-center justify-center px-4 py-10 md:px-6">
      <div className="w-full max-w-md border border-brand-border bg-brand-surface p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
          Admin
        </p>
        <h1 className="font-display mt-1 text-2xl text-brand-primary">{site.shortName}</h1>
        <p className="mt-2 text-sm text-brand-muted">Sign in to manage quotes, inquiries, and catalogue.</p>
        <div className="mt-6">
          <LoginForm callbackUrl={callbackUrl} />
        </div>
      </div>
    </div>
  );
}
