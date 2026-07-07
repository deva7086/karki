"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const PAGE = 9;

export default function InfiniteGallery({ images }: { images: string[] }) {
  const [count, setCount] = useState(PAGE);
  const [index, setIndex] = useState(-1);
  const sentinel = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    setCount((c) => Math.min(c + PAGE, images.length * 4));
  }, [images.length]);

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && loadMore(),
      { rootMargin: "600px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [loadMore]);

  // Loop the source images to create an "infinite" feel.
  const shown = Array.from({ length: count }, (_, i) => images[i % images.length]);
  const slides = shown.map((src) => ({ src }));

  return (
    <div>
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [&>*]:mb-4">
        {shown.map((src, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            onClick={() => setIndex(i)}
            data-cursor="hover"
            className="group relative block w-full overflow-hidden rounded-lg bg-ink-900"
          >
            <Image
              src={src}
              alt="KARKEY gallery"
              width={800}
              height={i % 3 === 0 ? 1100 : i % 3 === 1 ? 800 : 950}
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="w-full object-cover transition-transform duration-[900ms] ease-luxe group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-ink-950/0 transition-colors duration-500 group-hover:bg-ink-950/20" />
          </motion.button>
        ))}
      </div>

      <div ref={sentinel} className="h-10" />
      <p className="mt-6 text-center text-xs uppercase tracking-luxe text-white/30">
        Loading more moments…
      </p>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Zoom]}
        styles={{ container: { backgroundColor: "rgba(5,5,5,0.96)" } }}
        animation={{ fade: 400 }}
      />
    </div>
  );
}
