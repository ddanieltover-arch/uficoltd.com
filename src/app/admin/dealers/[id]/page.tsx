import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { deleteDealerAction } from "@/actions/adminPartners";
import { auth } from "@/auth";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminPartnerEditForm } from "@/components/admin/AdminPartnerEditForm";
import { AdminShell } from "@/components/admin/AdminShell";
import { getDealerApplication } from "@/services/partnerService";

export const metadata = {
  title: "Dealer application",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDealerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const { id } = await params;
  const partner = await getDealerApplication(id);
  if (!partner) notFound();

  return (
    <AdminShell title={partner.companyName} current="/admin/dealers">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/admin/dealers"
          className="text-sm text-brand-muted hover:text-brand-primary"
        >
          ← Back to dealers
        </Link>
        <AdminDeleteButton
          id={partner.id}
          confirmText="Delete this dealer application?"
          action={deleteDealerAction}
          hrefAfter="/admin/dealers"
        />
      </div>
      <div className="border border-brand-border bg-brand-surface p-6">
        <AdminPartnerEditForm partner={partner} kind="dealer" />
      </div>
    </AdminShell>
  );
}
