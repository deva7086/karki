"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useContent } from "@/components/ContentProvider";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

export default function FeaturedWork() {
  const { portfolio } = useContent();
  const featured = portfolio.slice(0, 5);
  return (
    <section className="relative py-28 md:py-36">
      <div className="container-luxe">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected Work"
            title="A glimpse into the moments we've kept"
          />
          <Reveal delay={0.2}>
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-luxe text-gold"
            >
              All Projects
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-6 md:grid-rows-2">
          {featured.map((item, i) => {
            const layouts = [
              "md:col-span-4 md:row-span-2",
              "md:col-span-2",
              "md:col-span-2",
              "md:col-span-3",
              "md:col-span-3",
            ];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative min-h-[240px] overflow-hidden rounded-xl bg-ink-900 ${layouts[i]}`}
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <div>
                    <span className="text-[0.65rem] uppercase tracking-luxe text-gold">
                      {item.category}
                    </span>
                    <h3 className="mt-1 font-display text-2xl text-white md:text-3xl">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex h-11 w-11 shrink-0 translate-y-2 items-center justify-center rounded-full border border-white/20 text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
