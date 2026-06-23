import type { Metadata } from "next";
import { AboutPageContent } from "@/components/sections/AboutPageContent";
import { getPage, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${site.name} — a premium wholesale refined sugar supplier based in Thailand.`,
};

export default function AboutPage() {
  const page = getPage("about-us");
  return <AboutPageContent page={page} />;
}
