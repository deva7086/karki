"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { nav, site } from "@/content/site";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[70] transition-all duration-500 ease-luxe",
          scrolled ? "glass py-3" : "bg-transparent py-6"
        )}
      >
        <nav className="container-luxe flex items-center justify-between">
          <Link
            href="/"
            className="relative z-[70] font-display text-2xl tracking-[0.35em] text-white"
          >
            {site.name}
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group relative text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-colors",
                      active ? "text-gold" : "text-white/70 hover:text-white"
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-400 ease-luxe",
                        active ? "w-full" : "w-0 group-hover:w-full"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-4">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-gold hover:text-gold md:flex"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <Link href="/contact" className="btn-gold hidden md:inline-flex !px-6 !py-3">
              Book Now
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-[6px] lg:hidden"
            >
              <motion.span
                animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block h-[2px] w-7 bg-white"
              />
              <motion.span
                animate={open ? { opacity: 0 } : { opacity: 1 }}
                className="block h-[2px] w-7 bg-white"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block h-[2px] w-7 bg-white"
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen mobile nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex flex-col justify-center bg-ink-950/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="container-luxe space-y-2">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.15 }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-white/10 py-4 font-display text-4xl text-white transition-colors hover:text-gold"
                  >
                    <span className="mr-4 text-xs align-middle text-gold/60">
                      0{i + 1}
                    </span>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="container-luxe mt-10 flex items-center gap-4">
              <Link href="/contact" className="btn-gold">
                Book a Session
              </Link>
              <button
                onClick={toggle}
                aria-label="Toggle theme"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 text-white"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
