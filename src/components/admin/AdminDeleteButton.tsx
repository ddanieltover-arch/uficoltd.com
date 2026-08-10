"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

type Props = {
  id: string;
  label?: string;
  confirmText: string;
  action: (formData: FormData) => Promise<void>;
  hrefAfter?: string;
};

export function AdminDeleteButton({
  id,
  label = "Delete",
  confirmText,
  action,
  hrefAfter,
}: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      className="text-sm text-brand-error hover:underline disabled:opacity-50"
      onClick={() => {
        if (!window.confirm(confirmText)) return;
        const formData = new FormData();
        formData.set("id", id);
        startTransition(async () => {
          await action(formData);
          if (hrefAfter) {
            router.push(hrefAfter);
          } else {
            router.refresh();
          }
        });
      }}
    >
      {pending ? "Deleting…" : label}
    </button>
  );
}
