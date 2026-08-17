import { ContactPageContent } from "@/components/sections/ContactPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/content";
import { contactPageSchema } from "@/lib/schema";
import { buildPageMetadata, PAGE_REVALIDATE_SECONDS } from "@/lib/seo";

export const revalidate = PAGE_REVALIDATE_SECONDS;

export const metadata = buildPageMetadata({
  title: "Request a Bulk Sugar Quote",
  description: `Contact ${site.shortName} for wholesale sugar quotes and export partnerships. Call ${site.phone} or email ${site.email} — Khonkaen, Thailand.`,
  path: "/contact-us",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd data={contactPageSchema()} />
      <ContactPageContent />
    </>
  );
}
