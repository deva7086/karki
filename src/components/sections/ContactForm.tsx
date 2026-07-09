"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";
import { weddingPackages, otherPricing } from "@/content/site";

type State = "idle" | "sending" | "sent";

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("sending");
    // TODO: wire to your email service / API route (e.g. Resend, Formspree).
    await new Promise((r) => setTimeout(r, 1200));
    setState("sent");
    (e.target as HTMLFormElement).reset();
    setTimeout(() => setState("idle"), 4000);
  };

  const field =
    "peer w-full border-b border-white/15 bg-transparent py-3 text-white placeholder-transparent outline-none transition-colors focus:border-gold";
  const label =
    "pointer-events-none absolute left-0 top-3 text-sm text-white/40 transition-all peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-3.5 peer-[:not(:placeholder-shown)]:text-xs";

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="relative">
          <input id="name" name="name" required placeholder="Name" className={field} />
          <label htmlFor="name" className={label}>Full name</label>
        </div>
        <div className="relative">
          <input id="email" name="email" type="email" required placeholder="Email" className={field} />
          <label htmlFor="email" className={label}>Email address</label>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div className="relative">
          <input id="phone" name="phone" placeholder="Phone" className={field} />
          <label htmlFor="phone" className={label}>Phone (optional)</label>
        </div>
        <div className="relative">
          <select id="service" name="service" required defaultValue="" className={`${field} appearance-none`}>
            <option value="" disabled className="bg-ink-950">Select a service</option>
            {weddingPackages.map((p) => (
              <option key={p.slug} value={`${p.name} Package`} className="bg-ink-950">
                {p.name} Package — {p.price}
              </option>
            ))}
            {otherPricing.map((p) => (
              <option key={p.name} value={p.name} className="bg-ink-950">
                {p.name}
              </option>
            ))}
            <option value="Other" className="bg-ink-950">Something else</option>
          </select>
          <label htmlFor="service" className="pointer-events-none absolute -top-3.5 left-0 text-xs text-gold">
            Interested in
          </label>
        </div>
      </div>

      <div className="relative">
        <input id="date" name="date" placeholder="Event date" className={field}
          onFocus={(e) => (e.target.type = "date")} onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }} />
        <label htmlFor="date" className={label}>Event date (optional)</label>
      </div>

      <div className="relative">
        <textarea id="message" name="message" required rows={4} placeholder="Message" className={`${field} resize-none`} />
        <label htmlFor="message" className={label}>Tell us about your day</label>
      </div>

      <motion.button
        type="submit"
        disabled={state !== "idle"}
        whileTap={{ scale: 0.98 }}
        className="btn-gold w-full sm:w-auto"
      >
        {state === "idle" && (<>Send Enquiry <Send size={15} /></>)}
        {state === "sending" && "Sending…"}
        {state === "sent" && (<>Message sent <Check size={16} /></>)}
      </motion.button>

      {state === "sent" && (
        <p className="text-sm text-gold">
          Thank you — we&rsquo;ll be in touch within 24 hours.
        </p>
      )}
    </form>
  );
}
