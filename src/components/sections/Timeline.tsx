"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useContent } from "@/components/ContentProvider";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Timeline() {
  const { about } = useContent();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start center", "end center"] });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="bg-ink-950 py-28 md:py-36">
      <div className="container-luxe">
        <SectionHeading eyebrow="The Journey" title="Our story so far" align="center" />

        <div ref={ref} className="relative mx-auto mt-20 max-w-3xl">
          {/* Track */}
          <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2" />
          <motion.div
            style={{ height }}
            className="absolute left-4 top-0 w-px bg-gradient-to-b from-gold to-gold-dark md:left-1/2"
          />

          <div className="space-y-16">
            {about.timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.7 }}
                className={`relative flex flex-col pl-14 md:w-1/2 md:pl-0 ${
                  i % 2 === 0 ? "md:pr-16 md:text-right" : "md:ml-auto md:pl-16"
                }`}
              >
                <span
                  className={`absolute top-1.5 h-3 w-3 rounded-full bg-gold ring-4 ring-ink-950 left-[9px] md:left-auto ${
                    i % 2 === 0 ? "md:-right-[6px]" : "md:-left-[6px]"
                  }`}
                />
                <span className="font-display text-4xl text-gradient-gold">{item.year}</span>
                <h3 className="mt-2 font-display text-2xl text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
