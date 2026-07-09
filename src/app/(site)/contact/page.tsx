import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { whatsappLink } from "@/lib/utils";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/sections/ContactForm";
import { Mail, Phone, MapPin, Clock, MessageCircle, Instagram, Facebook, Youtube, Link2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const socialIcons: Record<string, LucideIcon> = { Instagram, Facebook, YouTube: Youtube };

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with KARKEY Photography to check availability and start planning your session.",
};

export default async function ContactPage() {
  const { contact, portfolio } = await getContent();
  return (
    <>
      <PageHero
        eyebrow="Say Hello"
        title="Let's talk"
        subtitle="Tell us about your day and we'll craft a bespoke experience around it."
        image={portfolio[4].src}
      />

      <section className="py-20 md:py-28">
        <div className="container-luxe grid gap-16 lg:grid-cols-[1fr_1.1fr]">
          {/* Info column */}
          <div className="space-y-10">
            <Reveal>
              <div>
                <h2 className="font-display text-3xl text-white md:text-4xl">
                  We&rsquo;d love to hear your story
                </h2>
                <p className="mt-4 text-white/55">
                  Reach out via the form or any channel below. We reply to every enquiry
                  personally, usually within a day.
                </p>
              </div>
            </Reveal>

            <div className="space-y-6">
              {[
                { icon: Phone, label: "Call us", value: contact.phone, href: contact.phoneHref },
                { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
                { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: whatsappLink(contact) },
                { icon: MapPin, label: "Studio", value: contact.address },
              ].map((item, i) => (
                <Reveal key={item.label} delay={i * 0.08}>
                  <a
                    href={item.href ?? undefined}
                    target={item.href?.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold transition-colors group-hover:bg-gold group-hover:text-ink-950">
                      <item.icon size={18} />
                    </span>
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-white/40">
                        {item.label}
                      </div>
                      <div className="mt-1 text-white transition-colors group-hover:text-gold">
                        {item.value}
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="rounded-2xl border border-white/10 p-6">
                <div className="flex items-center gap-2 text-gold">
                  <Clock size={16} />
                  <span className="text-xs uppercase tracking-luxe">Business hours</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {contact.hours.map((h) => (
                    <li key={h.day} className="flex justify-between text-sm text-white/60">
                      <span>{h.day}</span>
                      <span className="text-white/80">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <div className="flex gap-3">
              {contact.socials.map((s) => {
                const SocialIcon = socialIcons[s.label] ?? Link2;
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors hover:border-gold hover:text-gold"
                  >
                    <SocialIcon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Form column */}
          <Reveal delay={0.15}>
            <div className="glass rounded-2xl p-8 md:p-10">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="pb-24">
        <div className="container-luxe">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <iframe
              src={contact.mapEmbed}
              width="100%"
              height="420"
              style={{ border: 0, filter: "grayscale(1) invert(0.92) contrast(0.9)" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="KARKEY Photography location"
            />
          </div>
        </div>
      </section>
    </>
  );
}
