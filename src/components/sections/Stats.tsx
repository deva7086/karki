"use client";

import { stats } from "@/content/site";
import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";

export default function Stats() {
  return (
    <section className="border-y border-white/10 bg-ink-950">
      <div className="container-luxe grid grid-cols-2 gap-y-12 py-16 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className="text-center">
            <div className="font-display text-5xl text-gradient-gold md:text-6xl">
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div className="mt-3 text-xs uppercase tracking-[0.2em] text-white/50">
              {s.label}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
