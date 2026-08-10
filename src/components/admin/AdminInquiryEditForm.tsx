"use client";

import { updateInquiryAction } from "@/actions/adminInquiries";
import { AdminStatusForm } from "@/components/admin/AdminStatusForm";
import { INQUIRY_STATUSES, StatusSelect } from "@/components/admin/statusOptions";

type Inquiry = {
  id: string;
  status: string;
  companyName: string | null;
  contactName: string;
  email: string;
  phone: string | null;
  country: string | null;
  message: string;
};

const fieldClass =
  "w-full rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface px-3 py-2 text-sm";

export function AdminInquiryEditForm({ inquiry }: { inquiry: Inquiry }) {
  return (
    <AdminStatusForm action={updateInquiryAction} className="space-y-4">
      <input type="hidden" name="id" value={inquiry.id} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Status</span>
          <StatusSelect value={inquiry.status} options={INQUIRY_STATUSES} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Company</span>
          <input
            name="companyName"
            defaultValue={inquiry.companyName ?? ""}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Contact</span>
          <input
            name="contactName"
            required
            defaultValue={inquiry.contactName}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Email</span>
          <input
            name="email"
            type="email"
            required
            defaultValue={inquiry.email}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Phone</span>
          <input
            name="phone"
            defaultValue={inquiry.phone ?? ""}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Country</span>
          <input
            name="country"
            defaultValue={inquiry.country ?? ""}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block text-brand-muted">Message</span>
          <textarea
            name="message"
            rows={6}
            required
            defaultValue={inquiry.message}
            className={fieldClass}
          />
        </label>
      </div>
      <button
        type="submit"
        className="min-h-11 rounded-[var(--brand-radius-md)] bg-brand-primary px-4 text-sm font-semibold text-white hover:bg-brand-primary-hover"
      >
        Save inquiry
      </button>
    </AdminStatusForm>
  );
}
