"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { testimonials } from "@/content/site";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const t = testimonials[i];

  const go = (d: number) => {
    setDir(d);
    setI((prev) => (prev + d + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Kind Words"
          title="Loved by the families we serve"
          align="center"
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          <Quote className="mx-auto mb-8 text-gold/30" size={56} />
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={i}
              custom={dir}
              initial={{ opacity: 0, x: dir * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="mb-6 flex justify-center gap-1">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={18} className="fill-gold text-gold" />
                ))}
              </div>
              <p className="font-display text-2xl font-light leading-relaxed text-white/90 md:text-3xl">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-gold/40">
                  <Image src={t.avatar} alt={t.name} fill sizes="56px" className="object-cover" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-white">{t.name}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-gold">{t.event}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              onClick={() => go(-1)}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => { setDir(idx > i ? 1 : -1); setI(idx); }}
                  aria-label={`Testimonial ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-400 ${
                    idx === i ? "w-8 bg-gold" : "w-1.5 bg-white/25"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-gold hover:text-gold"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
