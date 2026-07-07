import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { services } from "@/content/site";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Photography, videography, drone shoots, cinematic wedding films, fine-art albums and outdoor sessions — premium services by KARKEY Photography.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Services"
        subtitle="Considered craft at every stage. Choose a starting point below — every package is tailored to your day."
        image={services[3].image}
      />

      <section className="py-20 md:py-28">
        <div className="container-luxe space-y-6">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.05}>
              <div
                className={`group grid overflow-hidden rounded-2xl border border-white/10 bg-ink-950 lg:grid-cols-2 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative min-h-[320px] overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
                </div>

                <div className="flex flex-col justify-center p-8 md:p-14">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 text-gold">
                      <Icon name={s.icon} size={20} strokeWidth={1.5} />
                    </span>
                    <span className="text-xs uppercase tracking-luxe text-white/40">
                      0{i + 1}
                    </span>
                  </div>
                  <h2 className="mt-6 font-display text-4xl text-white md:text-5xl">{s.title}</h2>
                  <p className="mt-4 text-base leading-relaxed text-white/55">{s.blurb}</p>

                  <ul className="mt-8 grid grid-cols-2 gap-3">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                        <Check size={15} className="shrink-0 text-gold" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-6">
                    {s.priceFrom && (
                      <div>
                        <span className="text-xs uppercase tracking-[0.2em] text-white/40">
                          Starting from
                        </span>
                        <div className="font-display text-3xl text-gradient-gold">
                          {s.priceFrom}
                        </div>
                      </div>
                    )}
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

      <FAQ />
      <CTA />
    </>
  );
}
