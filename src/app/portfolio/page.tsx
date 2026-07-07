import type { Metadata } from "next";
import { portfolio, portfolioCategories } from "@/content/site";
import PageHero from "@/components/ui/PageHero";
import MasonryGallery from "@/components/gallery/MasonryGallery";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore KARKEY Photography's portfolio — weddings, pre-wedding, engagement, maternity, baby, fashion, events and commercial photography.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Curated Galleries"
        title="Portfolio"
        subtitle="Nine chapters of storytelling. Filter by category or open any frame full-screen."
        image={portfolio[0].src}
      />
      <section className="py-20 md:py-28">
        <div className="container-luxe">
          <MasonryGallery images={portfolio} categories={portfolioCategories} />
        </div>
      </section>
      <CTA />
    </>
  );
}
