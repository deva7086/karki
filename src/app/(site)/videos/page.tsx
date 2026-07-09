import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import PageHero from "@/components/ui/PageHero";
import VideoGallery from "@/components/gallery/VideoGallery";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Video Gallery",
  description:
    "Cinematic wedding films, pre-wedding stories and lifestyle reels by KARKEY Photography.",
};

export default async function VideosPage() {
  const { videos } = await getContent();
  return (
    <>
      <PageHero
        eyebrow="Motion"
        title="Cinematic Films"
        subtitle="Sound on. Press play and step inside the story."
        image={videos[0]?.poster ?? "/images/video-1.webp"}
      />
      <section className="py-20 md:py-28">
        <div className="container-luxe">
          <VideoGallery />
        </div>
      </section>
      <CTA />
    </>
  );
}
