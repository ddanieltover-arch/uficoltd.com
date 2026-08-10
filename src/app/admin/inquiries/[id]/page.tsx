import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { deleteInquiryAction } from "@/actions/adminInquiries";
import { auth } from "@/auth";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminInquiryEditForm } from "@/components/admin/AdminInquiryEditForm";
import { AdminShell } from "@/components/admin/AdminShell";
import { getInquiryById } from "@/services/inquiryService";

export const metadata = {
  title: "Inquiry detail",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminInquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const { id } = await params;
  const inquiry = await getInquiryById(id);
  if (!inquiry) notFound();

  return (
    <AdminShell title={inquiry.contactName} current="/admin/inquiries">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin/inquiries"
          className="text-sm text-brand-muted hover:text-brand-primary"
        >
          ← Back to inquiries
        </Link>
        <AdminDeleteButton
          id={inquiry.id}
          confirmText="Delete this inquiry permanently?"
          action={deleteInquiryAction}
          hrefAfter="/admin/inquiries"
        />
      </div>
      <div className="border border-brand-border bg-brand-surface p-6">
        <AdminInquiryEditForm inquiry={inquiry} />
      </div>
    </AdminShell>
  );
}
