import { Footer, Header } from "@/components/layout/SiteChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageTransition } from "@/components/shared/PageTransition";
import { organizationSchema, websiteSchema } from "@/lib/schema";

/** ISR interval. Next.js requires a numeric literal, not an imported constant. */
export const revalidate = 3600;

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />
      <Header />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
