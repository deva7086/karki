"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useContent } from "@/components/ContentProvider";
import SectionHeading from "@/components/ui/SectionHeading";

export default function FAQ() {
  const { faqs } = useContent();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-28 md:py-36">
      <div className="container-luxe grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading eyebrow="Good to Know" title="Frequently asked questions" />

        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((f, i) => {
            const active = open === i;
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(active ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="font-display text-xl text-white md:text-2xl">{f.q}</span>
                  <motion.span
                    animate={{ rotate: active ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-gold"
                  >
                    <Plus size={22} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {active && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pr-10 text-base leading-relaxed text-white/55">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
