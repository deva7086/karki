"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import { nav, site } from "@/content/site";
import { useContent } from "@/components/ContentProvider";
import Reveal from "@/components/ui/Reveal";

export default function Footer() {
  const { contact } = useContent();
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-ink-950">
      <div className="container-luxe py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <Reveal>
            <div>
              <Link href="/" aria-label={site.fullName} className="inline-block">
                <Image
                  src="/images/logo-white.png"
                  alt={site.fullName}
                  width={1704}
                  height={918}
                  className="h-20 w-auto"
                />
              </Link>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
                {site.description}
              </p>
              <div className="mt-6 flex gap-3">
                {contact.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-[0.6rem] uppercase tracking-widest text-white/60 transition-colors hover:border-gold hover:text-gold"
                    aria-label={s.label}
                  >
                    {s.label.slice(0, 2)}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <h4 className="mb-5 text-xs uppercase tracking-luxe text-gold">Explore</h4>
              <ul className="space-y-3">
                {nav.map((n) => (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      className="text-sm text-white/60 transition-colors hover:text-white"
                    >
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div>
              <h4 className="mb-5 text-xs uppercase tracking-luxe text-gold">Get in touch</h4>
              <ul className="space-y-4 text-sm text-white/60">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                  <span>{contact.address}</span>
                </li>
                <li>
                  <a href={contact.phoneHref} className="flex items-center gap-3 hover:text-white">
                    <Phone size={16} className="text-gold" /> {contact.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-3 hover:text-white">
                    <Mail size={16} className="text-gold" /> {contact.email}
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="hairline my-12" />

        <div className="flex flex-col items-center justify-between gap-4 text-xs text-white/40 md:flex-row">
          <p>
            © {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </p>
          <p className="tracking-widest">Crafted with intention — {site.tagline}</p>
        </div>
      </div>

      <div className="pointer-events-none select-none overflow-hidden">
        <div className="whitespace-nowrap text-center font-display text-[18vw] leading-none text-white/[0.03]">
          {site.name}
        </div>
      </div>
    </footer>
  );
}
