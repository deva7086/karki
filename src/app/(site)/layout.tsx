import { getContent } from "@/lib/content";
import { ContentProvider } from "@/components/ContentProvider";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import ScrollProgress from "@/components/layout/ScrollProgress";
import BackToTop from "@/components/layout/BackToTop";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();

  return (
    <ContentProvider value={content}>
      <Preloader />
      <ScrollProgress />
      <SmoothScroll>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </SmoothScroll>
      <WhatsAppButton />
      <BackToTop />
    </ContentProvider>
  );
}
