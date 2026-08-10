"use client";

import { signOutAction } from "@/actions/adminAuth";

export function AdminSignOutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="rounded-[var(--brand-radius-md)] px-3 py-1.5 text-sm text-brand-muted transition hover:bg-brand-bg hover:text-brand-text"
      >
        Sign out
      </button>
    </form>
  );
}
