import type { Metadata } from "next";
import { ContactPageContent } from "@/components/sections/ContactPageContent";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${site.name} for wholesale sugar quotes, product enquiries, and export partnerships. Call ${site.phone} or email ${site.email}.`,
};

export default function ContactPage() {
  return <ContactPageContent />;
}
