"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useContent } from "@/components/ContentProvider";
import Magnetic from "@/components/ui/Magnetic";

export default function Hero() {
  const { hero } = useContent();
  const ref = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    if (hero.video) return;
    const id = setInterval(() => setSlide((s) => (s + 1) % hero.slideshow.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      {/* Background */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        {hero.video ? (
          <video
            className="h-full w-full object-cover"
            src={hero.video}
            poster={hero.poster}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : (
          hero.slideshow.map((src, i) => (
            <motion.div
              key={src}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === slide ? 1 : 0 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            >
              <Image
                src={src}
                alt="KARKEY Photography"
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-ink-950/50" />
      <div className="absolute inset-0 bg-ink-950/20" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="container-luxe relative z-10 flex h-full flex-col justify-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="eyebrow"
        >
          <span className="h-px w-10 bg-gold" />
          {hero.eyebrow}
        </motion.span>

        <h1 className="mt-6 max-w-5xl font-display text-[3.2rem] leading-[0.95] text-white sm:text-7xl md:text-8xl lg:text-[8.5rem]">
          {hero.headline.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ delay: 0.8 + i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                {i === hero.headline.length - 1 ? (
                  <span className="italic text-gradient-gold">{line}</span>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-white/70 md:text-lg"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Magnetic>
            <Link href="/portfolio" className="btn-gold">
              View Portfolio
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/contact" className="btn-outline">
              Book a Session
            </Link>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/50">
          <span className="text-[0.6rem] uppercase tracking-luxe">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
          >
            <ArrowDown size={16} className="text-gold" />
          </motion.div>
        </div>
      </motion.div>

      {/* Slideshow indicators */}
      {!hero.video && (
        <div className="absolute bottom-8 right-8 z-10 hidden gap-2 md:flex">
          {hero.slideshow.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === slide ? "w-8 bg-gold" : "w-4 bg-white/30"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
