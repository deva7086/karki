"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import { useContent } from "@/components/ContentProvider";
import Reveal from "@/components/ui/Reveal";

export default function InstagramPreview() {
  const { instagram, contact } = useContent();
  const ig = contact.socials.find((s) => s.label === "Instagram");
  return (
    <section className="bg-ink-950 py-28 md:py-36">
      <div className="container-luxe">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="eyebrow">
              <Instagram size={14} /> {ig?.handle ?? "@karkey_photography"}
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-4xl text-white md:text-5xl">
              Follow the everyday magic
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {instagram.map((src, i) => (
            <motion.a
              key={src}
              href={ig?.href ?? "https://instagram.com"}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="group relative aspect-square overflow-hidden rounded-lg bg-ink-900"
            >
              <Image
                src={src}
                alt="Instagram post"
                fill
                sizes="(max-width: 640px) 50vw, 16vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-ink-950/60 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                <Instagram className="text-gold" size={24} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
