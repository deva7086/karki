import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { weddingPackages, otherPricing } from "@/content/site";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Wedding packages by KARKEY Photography — Silver, Gold, Platinum and Diamond — plus pre-wedding, drone and outdoor shoots.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Packages"
        title="Wedding Packages"
        subtitle="Four considered packages — Silver to Diamond. Pick a starting point below and we'll tailor it to your day."
        image={weddingPackages[2].image}
      />

      {/* Wedding package tiers */}
      <section className="py-20 md:py-28">
        <div className="container-luxe space-y-6">
          {weddingPackages.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.05}>
              <div
                className={`group grid overflow-hidden rounded-2xl border bg-ink-950 lg:grid-cols-2 ${
                  p.featured ? "border-gold/50" : "border-white/10"
                } ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="relative min-h-[320px] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
                </div>

                <div className="flex flex-col justify-center p-8 md:p-14">
                  <div className="flex items-center gap-4">
                    <span className="text-xs uppercase tracking-luxe text-white/40">
                      0{i + 1}
                    </span>
                    {p.featured && (
                      <span className="rounded-full border border-gold/40 px-3 py-1 text-[0.6rem] uppercase tracking-widest text-gold">
                        Most popular
                      </span>
                    )}
                  </div>
                  <h2 className="mt-6 font-display text-4xl text-white md:text-5xl">{p.name}</h2>
                  <p className="mt-4 text-base leading-relaxed text-white/55">{p.blurb}</p>

                  <ul className="mt-8 grid grid-cols-2 gap-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                        <Check size={15} className="shrink-0 text-gold" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
                    <div>
                      <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                        Package price
                      </span>
                      <div className="font-display text-3xl text-gradient-gold">{p.price}</div>
                    </div>
                    <Link href="/contact" className="btn-outline !px-6 !py-3">
                      Enquire
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Standalone add-ons */}
      <section className="border-t border-white/10 bg-ink-950 py-20 md:py-28">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Also Available"
            title="Standalone shoots"
            align="center"
          />
          <div className="mx-auto mt-14 grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
            {otherPricing.map((p) => (
              <div key={p.name} className="bg-ink-950 p-8 text-center">
                <div className="text-xs uppercase tracking-[0.2em] text-white/40">{p.name}</div>
                <div className="mt-3 font-display text-2xl text-gradient-gold">{p.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
      <CTA />
    </>
  );
}
