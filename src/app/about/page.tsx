import type { Metadata } from "next";
import Image from "next/image";
import { about } from "@/content/site";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Stats from "@/components/sections/Stats";
import Timeline from "@/components/sections/Timeline";
import CTA from "@/components/sections/CTA";
import { Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: about.intro,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Behind the lens"
        subtitle={about.intro}
        image={about.portrait}
      />

      {/* Intro split */}
      <section className="py-28 md:py-36">
        <div className="container-luxe grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Image
                  src={about.portrait}
                  alt={about.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="glass absolute -bottom-6 -right-4 rounded-xl px-6 py-5 md:-right-8">
                <div className="font-display text-2xl text-white">{about.name}</div>
                <div className="text-xs uppercase tracking-[0.2em] text-gold">{about.role}</div>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionHeading eyebrow="The Photographer" title="Chasing honest light since 2024" />
            <div className="mt-8 space-y-5">
              {about.story.map((p, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p className="text-base leading-relaxed text-white/60 md:text-lg">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Stats />
      <Timeline />

      {/* Awards */}
      <section className="py-28 md:py-36">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Recognition"
            title="Awards & features"
            align="center"
          />
          <div className="mx-auto mt-14 grid max-w-4xl gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {about.awards.map((a, i) => (
              <Reveal key={a} delay={(i % 2) * 0.1}>
                <div className="flex items-start gap-4 bg-ink-950 p-8">
                  <Award className="mt-1 shrink-0 text-gold" size={22} />
                  <p className="text-white/80">{a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}
