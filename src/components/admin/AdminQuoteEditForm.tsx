"use client";

import { updateQuoteAction } from "@/actions/adminQuotes";
import { AdminStatusForm } from "@/components/admin/AdminStatusForm";
import { QUOTE_STATUSES, StatusSelect } from "@/components/admin/statusOptions";

type Quote = {
  id: string;
  version: number;
  status: string;
  companyName: string | null;
  contactName: string;
  email: string;
  phone: string | null;
  country: string | null;
  productLabel: string | null;
  quantityText: string | null;
  destination: string | null;
  message: string | null;
};

const fieldClass =
  "w-full rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface px-3 py-2 text-sm";

export function AdminQuoteEditForm({ quote }: { quote: Quote }) {
  return (
    <AdminStatusForm action={updateQuoteAction} className="space-y-4">
      <input type="hidden" name="id" value={quote.id} />
      <input type="hidden" name="version" value={quote.version} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Status</span>
          <StatusSelect value={quote.status} options={QUOTE_STATUSES} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Company</span>
          <input
            name="companyName"
            defaultValue={quote.companyName ?? ""}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Contact</span>
          <input
            name="contactName"
            required
            defaultValue={quote.contactName}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Email</span>
          <input
            name="email"
            type="email"
            required
            defaultValue={quote.email}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Phone</span>
          <input name="phone" defaultValue={quote.phone ?? ""} className={fieldClass} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Country</span>
          <input
            name="country"
            defaultValue={quote.country ?? ""}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Product</span>
          <input
            name="productLabel"
            defaultValue={quote.productLabel ?? ""}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Quantity</span>
          <input
            name="quantityText"
            defaultValue={quote.quantityText ?? ""}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block text-brand-muted">Destination</span>
          <input
            name="destination"
            defaultValue={quote.destination ?? ""}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block text-brand-muted">Message</span>
          <textarea
            name="message"
            rows={5}
            defaultValue={quote.message ?? ""}
            className={fieldClass}
          />
        </label>
      </div>
      <button
        type="submit"
        className="min-h-11 rounded-[var(--brand-radius-md)] bg-brand-primary px-4 text-sm font-semibold text-white hover:bg-brand-primary-hover"
      >
        Save quote
      </button>
    </AdminStatusForm>
  );
}
