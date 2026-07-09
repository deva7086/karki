"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { type VideoItem } from "@/content/site";
import { useContent } from "@/components/ContentProvider";
import { cn } from "@/lib/utils";

export default function VideoGallery() {
  const { videos } = useContent();
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(videos.map((v) => v.category)))],
    [videos]
  );
  const [active, setActive] = useState("All");
  const [current, setCurrent] = useState<VideoItem | null>(null);

  const filtered = active === "All" ? videos : videos.filter((v) => v.category === active);

  return (
    <div>
      <div className="mb-12 flex flex-wrap justify-center gap-2 md:gap-3">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full border px-5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-all",
              active === c
                ? "border-gold bg-gold text-ink-950"
                : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((v, i) => (
          <motion.button
            key={v.title}
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
            onClick={() => setCurrent(v)}
            data-cursor="hover"
            className="group relative aspect-video overflow-hidden rounded-xl bg-ink-900 text-left"
          >
            <Image
              src={v.poster}
              alt={v.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-ink-950/40 transition-colors group-hover:bg-ink-950/60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/5 text-white backdrop-blur-sm transition-all duration-500 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-ink-950">
                <Play size={22} className="ml-1 fill-current" />
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="text-[0.65rem] uppercase tracking-luxe text-gold">
                {v.category}
              </span>
              <h3 className="mt-1 font-display text-2xl text-white">{v.title}</h3>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur-md"
            onClick={() => setCurrent(null)}
          >
            <button
              aria-label="Close"
              className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-gold hover:text-gold"
            >
              <X size={20} />
            </button>
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="aspect-video w-full max-w-5xl overflow-hidden rounded-xl bg-black shadow-2xl"
            >
              {current.youtubeId ? (
                <iframe
                  className="h-full w-full"
                  src={`https://www.youtube.com/embed/${current.youtubeId}?autoplay=1&rel=0`}
                  title={current.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : current.src ? (
                <video className="h-full w-full" src={current.src} controls autoPlay />
              ) : null}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
