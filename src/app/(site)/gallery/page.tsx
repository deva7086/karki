import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import PageHero from "@/components/ui/PageHero";
import InfiniteGallery from "@/components/gallery/InfiniteGallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "An immersive, ever-scrolling gallery of KARKEY Photography's finest frames.",
};

export default async function GalleryPage() {
  const { portfolio } = await getContent();
  const gallery = portfolio.map((p) => p.src);
  return (
    <>
      <PageHero
        eyebrow="Immersive"
        title="The Gallery"
        subtitle="Keep scrolling — the frames keep coming. Tap any image to view it full-screen with zoom."
        image={gallery[1]}
      />
      <section className="py-20 md:py-28">
        <div className="container-luxe">
          <InfiniteGallery images={gallery} />
        </div>
      </section>
    </>
  );
}
