"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useContent } from "@/components/ContentProvider";
import TextReveal from "@/components/ui/TextReveal";
import Magnetic from "@/components/ui/Magnetic";

export default function CTA() {
  const { hero } = useContent();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-125">
        <Image
          src={hero.slideshow[2]}
          alt="Book KARKEY Photography"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink-950/75" />

      <div className="container-luxe relative z-10 flex flex-col items-center py-32 text-center md:py-44">
        <span className="eyebrow">
          <span className="h-px w-8 bg-gold" /> Let&rsquo;s create together
        </span>
        <TextReveal
          text="Your story deserves to be unforgettable"
          as="h2"
          className="mt-6 max-w-4xl justify-center text-4xl leading-[1.05] text-white sm:text-6xl md:text-7xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 max-w-xl text-white/70"
        >
          We take on a limited number of commissions each season. Reach out to check
          availability for your date.
        </motion.p>
        <Magnetic className="mt-10">
          <Link href="/contact" className="btn-gold">
            Enquire Now
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
