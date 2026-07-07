"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/content/site";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";

export default function ServicesPreview() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-28 md:py-36">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="What We Offer"
          title="Full-service storytelling, end to end"
          description="From the first look to the final album, every craft under one roof — so your story stays consistent, cinematic and unmistakably yours."
          align="center"
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
            >
              <Link
                href="/services"
                className="group flex h-full flex-col bg-ink-950 p-8 transition-colors duration-500 hover:bg-ink-900 md:p-10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-ink-950">
                    <Icon name={s.icon} size={22} strokeWidth={1.5} />
                  </div>
                  <ArrowUpRight
                    size={20}
                    className="text-white/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold"
                  />
                </div>
                <h3 className="mt-8 font-display text-2xl text-white">{s.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/50">{s.blurb}</p>
                {s.priceFrom && (
                  <p className="mt-6 text-xs uppercase tracking-[0.2em] text-gold">
                    From {s.priceFrom}
                  </p>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
