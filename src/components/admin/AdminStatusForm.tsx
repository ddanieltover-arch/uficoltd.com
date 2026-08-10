"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type ReactNode } from "react";

type Props = {
  action: (formData: FormData) => Promise<void>;
  children: ReactNode;
  className?: string;
  successMessage?: string;
};

export function AdminStatusForm({
  action,
  children,
  className,
  successMessage = "Saved",
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [toast, setToast] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      className={className}
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        setError(null);
        startTransition(async () => {
          try {
            await action(formData);
            setToast(successMessage);
            router.refresh();
            window.setTimeout(() => setToast(null), 2000);
          } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
          }
        });
      }}
    >
      {children}
      {pending ? (
        <p className="mt-2 text-xs text-brand-muted">Saving…</p>
      ) : null}
      {toast ? <p className="mt-2 text-xs text-brand-success">{toast}</p> : null}
      {error ? (
        <p className="mt-2 text-xs text-brand-error" role="alert">
          {error}
        </p>
      ) : null}
    </form>
  );
}
