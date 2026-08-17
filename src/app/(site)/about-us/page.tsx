import { AboutPageContent } from "@/components/sections/AboutPageContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPage } from "@/lib/content";
import { aboutPageSchema } from "@/lib/schema";
import { buildPageMetadata, truncateMeta } from "@/lib/seo";

export async function generateMetadata() {
  const page = await getPage("about-us");
  return buildPageMetadata({
    title: page.metaTitle ?? "Thai Sugar Exporter in Khonkaen",
    description: truncateMeta(
      page.metaDescription ??
        "United Farmer and Industry Co LTD exports wholesale refined sugar from Khonkaen, Thailand. Trusted export partner since 2008 — ICUMSA grades and bulk RFQ supply.",
    ),
    path: "/about-us",
  });
}

export default async function AboutPage() {
  const page = await getPage("about-us");
  return (
    <>
      <JsonLd data={aboutPageSchema()} />
      <AboutPageContent page={page} />
    </>
  );
}
