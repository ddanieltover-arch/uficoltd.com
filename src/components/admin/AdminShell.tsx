import { AdminNav } from "@/components/admin/AdminNav";

export function AdminShell({
  title,
  current,
  children,
}: {
  title: string;
  current: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[var(--brand-container)] px-4 py-10 md:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
            Admin
          </p>
          <h1 className="font-display text-3xl text-brand-primary">{title}</h1>
        </div>
        <AdminNav current={current} />
      </div>
      {children}
    </div>
  );
}
