import { Footer, Header } from "@/components/layout/SiteChrome";
import { PageTransition } from "@/components/shared/PageTransition";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
