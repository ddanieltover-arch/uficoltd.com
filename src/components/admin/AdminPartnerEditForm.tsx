"use client";

import {
  updateDealerAction,
  updateDistributorAction,
} from "@/actions/adminPartners";
import { AdminStatusForm } from "@/components/admin/AdminStatusForm";
import {
  APPLICATION_STATUSES,
  StatusSelect,
} from "@/components/admin/statusOptions";

type Partner = {
  id: string;
  status: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string | null;
  country: string;
  marketsServed: string | null;
  message: string | null;
};

const fieldClass =
  "w-full rounded-[var(--brand-radius-md)] border border-brand-border bg-brand-surface px-3 py-2 text-sm";

export function AdminPartnerEditForm({
  partner,
  kind,
}: {
  partner: Partner;
  kind: "dealer" | "distributor";
}) {
  const action = kind === "dealer" ? updateDealerAction : updateDistributorAction;

  return (
    <AdminStatusForm action={action} className="space-y-4">
      <input type="hidden" name="id" value={partner.id} />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Status</span>
          <StatusSelect value={partner.status} options={APPLICATION_STATUSES} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Company</span>
          <input
            name="companyName"
            required
            defaultValue={partner.companyName}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Contact</span>
          <input
            name="contactName"
            required
            defaultValue={partner.contactName}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Email</span>
          <input
            name="email"
            type="email"
            required
            defaultValue={partner.email}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Phone</span>
          <input
            name="phone"
            defaultValue={partner.phone ?? ""}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block text-brand-muted">Country</span>
          <input
            name="country"
            required
            defaultValue={partner.country}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block text-brand-muted">Markets served</span>
          <input
            name="marketsServed"
            defaultValue={partner.marketsServed ?? ""}
            className={fieldClass}
          />
        </label>
        <label className="block text-sm sm:col-span-2">
          <span className="mb-1 block text-brand-muted">Message</span>
          <textarea
            name="message"
            rows={5}
            defaultValue={partner.message ?? ""}
            className={fieldClass}
          />
        </label>
      </div>
      <button
        type="submit"
        className="min-h-11 rounded-[var(--brand-radius-md)] bg-brand-primary px-4 text-sm font-semibold text-white hover:bg-brand-primary-hover"
      >
        Save application
      </button>
    </AdminStatusForm>
  );
}
