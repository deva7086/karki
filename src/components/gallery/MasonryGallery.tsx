"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/captions.css";
import { cn } from "@/lib/utils";

export type GalleryImage = {
  src: string;
  title?: string;
  category?: string;
  tall?: boolean;
};

export default function MasonryGallery({
  images,
  categories,
}: {
  images: GalleryImage[];
  categories?: readonly string[];
}) {
  const [active, setActive] = useState<string>(categories?.[0] ?? "All");
  const [index, setIndex] = useState(-1);

  const filtered = useMemo(() => {
    if (!categories || active === "All") return images;
    return images.filter((i) => i.category === active);
  }, [images, categories, active]);

  const slides = filtered.map((i) => ({
    src: i.src,
    title: i.title,
    description: i.category,
  }));

  return (
    <div>
      {categories && (
        <div className="mb-12 flex flex-wrap justify-center gap-2 md:gap-3">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] transition-all duration-400",
                active === c
                  ? "border-gold bg-gold text-ink-950"
                  : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <motion.div
        layout
        className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((img, i) => (
            <motion.button
              layout
              key={img.src + i}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIndex(i)}
              data-cursor="hover"
              className="group relative block w-full overflow-hidden rounded-lg bg-ink-900 text-left"
            >
              <Image
                src={img.src}
                alt={img.title ?? "KARKEY Photography"}
                width={800}
                height={img.tall ? 1100 : 800}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full object-cover transition-transform duration-[900ms] ease-luxe group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink-950/80 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {img.category && (
                  <span className="text-[0.65rem] uppercase tracking-luxe text-gold">
                    {img.category}
                  </span>
                )}
                {img.title && (
                  <span className="mt-1 font-display text-2xl text-white">{img.title}</span>
                )}
              </div>
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/0 transition-all duration-500 group-hover:ring-gold/40" />
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Zoom, Thumbnails, Captions]}
        styles={{ container: { backgroundColor: "rgba(5,5,5,0.96)" } }}
        thumbnails={{ border: 0, gap: 8, width: 100, height: 66 }}
        animation={{ fade: 400 }}
      />
    </div>
  );
}
