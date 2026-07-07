import type { Metadata } from "next";
import Image from "next/image";
import { testimonials, portfolio } from "@/content/site";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import { Star, Quote } from "lucide-react";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Real words from real couples and families who trusted KARKEY Photography.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero
        eyebrow="Kind Words"
        title="Testimonials"
        subtitle="The trust of our clients is the work we're most proud of."
        image={portfolio[1].src}
      />

      <Testimonials />

      <section className="bg-ink-950 pb-28 md:pb-36">
        <div className="container-luxe">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={(i % 3) * 0.1}>
                <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-colors duration-500 hover:border-gold/30">
                  <Quote className="text-gold/40" size={32} />
                  <div className="mt-4 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star key={s} size={15} className="fill-gold text-gold" />
                    ))}
                  </div>
                  <blockquote className="mt-4 flex-1 text-base leading-relaxed text-white/70">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-gold/30">
                      <Image src={t.avatar} alt={t.name} fill sizes="48px" className="object-cover" />
                    </div>
                    <div>
                      <div className="font-medium text-white">{t.name}</div>
                      <div className="text-xs uppercase tracking-[0.2em] text-gold">{t.event}</div>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
