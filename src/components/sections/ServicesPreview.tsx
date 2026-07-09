"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useContent } from "@/components/ContentProvider";
import SectionHeading from "@/components/ui/SectionHeading";

export default function ServicesPreview() {
  const { weddingPackages } = useContent();
  return (
    <section className="relative overflow-hidden bg-ink-950 py-28 md:py-36">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Wedding Packages"
          title="Coverage for every kind of celebration"
          description="From intimate ceremonies to grand multi-day weddings — pick the package that fits, and we'll tailor the rest around your story."
          align="center"
        />

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {weddingPackages.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
            >
              <Link
                href="/services"
                className={`group flex h-full flex-col p-8 transition-colors duration-500 md:p-10 ${
                  p.featured ? "bg-gold/[0.06] hover:bg-gold/[0.1]" : "bg-ink-950 hover:bg-ink-900"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-gold">
                    {p.featured ? "Most popular" : "Package"}
                  </span>
                  <ArrowUpRight
                    size={20}
                    className="text-white/20 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold"
                  />
                </div>
                <h3 className="mt-8 font-display text-3xl text-white">{p.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/50">{p.blurb}</p>
                <p className="mt-6 font-display text-2xl text-gradient-gold">{p.price}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
