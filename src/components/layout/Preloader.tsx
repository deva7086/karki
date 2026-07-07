"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/content/site";

export default function Preloader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Only show once per session for a premium-but-not-annoying feel.
    if (sessionStorage.getItem("preloaded")) {
      setDone(true);
      return;
    }
    document.body.style.overflow = "hidden";
    const start = performance.now();
    const duration = 1600;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setCount(Math.floor(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        sessionStorage.setItem("preloaded", "1");
        setTimeout(() => {
          setDone(true);
          document.body.style.overflow = "";
        }, 400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink-950"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.83, 0, 0.17, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Image
              src="/images/logo-white.png"
              alt={site.fullName}
              width={1704}
              height={918}
              priority
              className="mx-auto mb-6 h-24 w-auto md:h-32"
            />
            <div className="mx-auto h-px w-40 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gold"
                style={{ width: `${count}%` }}
              />
            </div>
            <div className="mt-4 text-xs tracking-[0.4em] text-white/40">
              {String(count).padStart(3, "0")}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
