"use client";

import { useState } from "react";
import type { SiteContent } from "@/lib/content";

/* ─────────────────────────── upload helper ─────────────────────────── */

async function uploadToCloudinary(
  file: File,
  kind: "image" | "video",
  folder: string
): Promise<string> {
  const signRes = await fetch("/api/admin/sign-upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ folder }),
  });
  const sign = await signRes.json();
  if (!signRes.ok) throw new Error(sign.error || "Could not sign upload.");

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", sign.apiKey);
  form.append("timestamp", String(sign.timestamp));
  form.append("signature", sign.signature);
  form.append("folder", sign.folder);

  const resourceType = kind === "video" ? "video" : "image";
  const upRes = await fetch(
    `https://api.cloudinary.com/v1_1/${sign.cloudName}/${resourceType}/upload`,
    { method: "POST", body: form }
  );
  const up = await upRes.json();
  if (!upRes.ok) throw new Error(up.error?.message || "Upload failed.");
  return up.secure_url as string;
}

/* ─────────────────────────── small UI bits ─────────────────────────── */

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[0.65rem] uppercase tracking-[0.15em] text-white/40">
        {label}
      </span>
      <input
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm text-white outline-none focus:border-gold"
      />
    </label>
  );
}

function Area({
  label,
  value,
  onChange,
  rows = 3,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[0.65rem] uppercase tracking-[0.15em] text-white/40">
        {label} {hint && <span className="lowercase text-white/25">— {hint}</span>}
      </span>
      <textarea
        value={value}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-white/15 bg-transparent px-3 py-2 text-sm text-white outline-none focus:border-gold"
      />
    </label>
  );
}

function UploadButton({
  kind,
  folder,
  onDone,
  label,
}: {
  kind: "image" | "video";
  folder: string;
  onDone: (url: string) => void;
  label: string;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  return (
    <span className="inline-flex items-center gap-2">
      <label
        className={`cursor-pointer rounded-lg border border-gold/40 px-3 py-2 text-xs uppercase tracking-widest text-gold hover:bg-gold/10 ${
          busy ? "opacity-60" : ""
        }`}
      >
        {busy ? "Uploading…" : label}
        <input
          type="file"
          accept={kind === "video" ? "video/*" : "image/*"}
          className="hidden"
          disabled={busy}
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setErr("");
            setBusy(true);
            try {
              const url = await uploadToCloudinary(file, kind, folder);
              onDone(url);
            } catch (e2) {
              setErr(e2 instanceof Error ? e2.message : "Upload failed.");
            } finally {
              setBusy(false);
              e.target.value = "";
            }
          }}
        />
      </label>
      {err && <span className="text-xs text-red-400">{err}</span>}
    </span>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
      <h3 className="mb-3 font-display text-lg text-white">{title}</h3>
      {children}
    </div>
  );
}

/* ─────────────────────────── main dashboard ─────────────────────────── */

type Tab = "gallery" | "videos" | "packages" | "text";

const TABS: { id: Tab; label: string }[] = [
  { id: "gallery", label: "Gallery" },
  { id: "videos", label: "Videos" },
  { id: "packages", label: "Packages" },
  { id: "text", label: "Text content" },
];

export default function AdminDashboard({
  initial,
  flags,
}: {
  initial: SiteContent;
  flags: { cloudinary: boolean; kv: boolean };
}) {
  const [c, setC] = useState<SiteContent>(initial);
  const [tab, setTab] = useState<Tab>("gallery");
  const [status, setStatus] = useState<string>("");
  const [saving, setSaving] = useState(false);

  // Generic setter for a top-level content key.
  function set<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setC((prev) => ({ ...prev, [key]: value }));
  }

  async function save() {
    setSaving(true);
    setStatus("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(c),
      });
      const data = await res.json().catch(() => ({}));
      setStatus(res.ok ? "Saved ✓ — changes are live." : data.error || "Save failed.");
    } catch {
      setStatus("Network error while saving.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-ink-950 text-white">
      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b border-white/10 bg-ink-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div>
            <h1 className="font-display text-2xl">KARKEY Admin</h1>
            <p className="text-xs text-white/40">{status || "Manage your site content"}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="btn-gold !px-5 !py-2.5 text-xs disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
            <form action="/api/auth/logout" method="post">
              <button className="rounded-lg border border-white/15 px-4 py-2.5 text-xs uppercase tracking-widest text-white/60 hover:border-white/40 hover:text-white">
                Log out
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-8">
        {/* Config warnings */}
        {!flags.kv && (
          <Warning>
            Content store (KV) is not connected — <b>your changes cannot be saved yet</b>. Add the
            KV environment variables in Vercel to enable saving.
          </Warning>
        )}
        {!flags.cloudinary && (
          <Warning>
            Cloudinary is not configured — <b>uploads are disabled</b>. Add the Cloudinary
            environment variables to upload images and videos.
          </Warning>
        )}

        {/* Tabs */}
        <div className="mb-8 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-full border px-4 py-2 text-xs uppercase tracking-widest ${
                tab === t.id
                  ? "border-gold bg-gold text-ink-950"
                  : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "gallery" && <GalleryEditor c={c} set={set} />}
        {tab === "videos" && <VideosEditor c={c} set={set} />}
        {tab === "packages" && <PackagesEditor c={c} set={set} />}
        {tab === "text" && <TextEditor c={c} set={set} />}
      </div>
    </main>
  );
}

function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-6 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
      {children}
    </div>
  );
}

type EditorProps = {
  c: SiteContent;
  set: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void;
};

/* ─────────────────────────── Gallery ─────────────────────────── */

function GalleryEditor({ c, set }: EditorProps) {
  const items = c.portfolio;
  const update = (i: number, patch: Partial<(typeof items)[number]>) =>
    set("portfolio", items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  const remove = (i: number) => set("portfolio", items.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    set("portfolio", next);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/50">{items.length} images</p>
        <UploadButton
          kind="image"
          folder="gallery"
          label="+ Upload image"
          onDone={(url) =>
            set("portfolio", [...items, { src: url, category: "Wedding", title: "Untitled" }])
          }
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((it, i) => (
          <div key={i} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={it.src} alt={it.title} className="mb-3 h-40 w-full rounded-lg object-cover" />
            <div className="space-y-2">
              <Field label="Title" value={it.title} onChange={(v) => update(i, { title: v })} />
              <Field
                label="Category"
                value={it.category}
                onChange={(v) => update(i, { category: v })}
              />
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 text-xs text-white/50">
                  <input
                    type="checkbox"
                    checked={!!it.tall}
                    onChange={(e) => update(i, { tall: e.target.checked })}
                  />
                  Tall
                </label>
                <div className="flex gap-1">
                  <IconBtn onClick={() => move(i, -1)}>↑</IconBtn>
                  <IconBtn onClick={() => move(i, 1)}>↓</IconBtn>
                  <IconBtn danger onClick={() => remove(i)}>
                    Delete
                  </IconBtn>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── Videos ─────────────────────────── */

function VideosEditor({ c, set }: EditorProps) {
  const items = c.videos;
  const update = (i: number, patch: Partial<(typeof items)[number]>) =>
    set("videos", items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)));
  const remove = (i: number) => set("videos", items.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-white/50">{items.length} videos</p>
        <button
          onClick={() =>
            set("videos", [
              ...items,
              { title: "New video", category: "Cinematic", poster: "/images/video-1.webp" },
            ])
          }
          className="rounded-lg border border-gold/40 px-3 py-2 text-xs uppercase tracking-widest text-gold hover:bg-gold/10"
        >
          + Add video
        </button>
      </div>

      <div className="space-y-4">
        {items.map((v, i) => (
          <div key={i} className="grid gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:grid-cols-[200px_1fr]">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.poster} alt={v.title} className="h-28 w-full rounded-lg object-cover" />
              <div className="mt-2">
                <UploadButton
                  kind="image"
                  folder="video-posters"
                  label="Poster"
                  onDone={(url) => update(i, { poster: url })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Field label="Title" value={v.title} onChange={(val) => update(i, { title: val })} />
              <Field
                label="Category"
                value={v.category}
                onChange={(val) => update(i, { category: val })}
              />
              <Field
                label="YouTube ID (optional)"
                value={v.youtubeId ?? ""}
                placeholder="e.g. dQw4w9WgXcQ"
                onChange={(val) => update(i, { youtubeId: val || undefined })}
              />
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <UploadButton
                  kind="video"
                  folder="videos"
                  label={v.src ? "Replace video file" : "Upload video file"}
                  onDone={(url) => update(i, { src: url, youtubeId: undefined })}
                />
                {v.src && <span className="text-xs text-emerald-400">video attached ✓</span>}
                <IconBtn danger onClick={() => remove(i)}>
                  Delete
                </IconBtn>
              </div>
              <p className="text-[0.65rem] text-white/30">
                Use a YouTube ID <b>or</b> an uploaded file. If both are set, YouTube is used.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── Packages ─────────────────────────── */

function PackagesEditor({ c, set }: EditorProps) {
  const pkgs = c.weddingPackages;
  const addons = c.otherPricing;
  const updP = (i: number, patch: Partial<(typeof pkgs)[number]>) =>
    set("weddingPackages", pkgs.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  const updA = (i: number, patch: Partial<(typeof addons)[number]>) =>
    set("otherPricing", addons.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl">Wedding packages</h2>
          <button
            onClick={() =>
              set("weddingPackages", [
                ...pkgs,
                {
                  slug: `tier-${pkgs.length + 1}`,
                  name: "New tier",
                  price: "₹0",
                  blurb: "",
                  features: [],
                  image: "/images/bride-white.webp",
                },
              ])
            }
            className="rounded-lg border border-gold/40 px-3 py-2 text-xs uppercase tracking-widest text-gold hover:bg-gold/10"
          >
            + Add tier
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {pkgs.map((p, i) => (
            <Card key={i} title={p.name || "Tier"}>
              <div className="space-y-2">
                <Field label="Name" value={p.name} onChange={(v) => updP(i, { name: v })} />
                <Field label="Price" value={p.price} onChange={(v) => updP(i, { price: v })} />
                <Area label="Blurb" value={p.blurb} rows={2} onChange={(v) => updP(i, { blurb: v })} />
                <Area
                  label="Features"
                  hint="one per line"
                  value={p.features.join("\n")}
                  onChange={(v) => updP(i, { features: v.split("\n").filter(Boolean) })}
                />
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 text-xs text-white/50">
                    <input
                      type="checkbox"
                      checked={!!p.featured}
                      onChange={(e) => updP(i, { featured: e.target.checked })}
                    />
                    Most popular
                  </label>
                  <IconBtn
                    danger
                    onClick={() => set("weddingPackages", pkgs.filter((_, idx) => idx !== i))}
                  >
                    Delete
                  </IconBtn>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl">Standalone pricing</h2>
          <button
            onClick={() => set("otherPricing", [...addons, { name: "New item", price: "₹0" }])}
            className="rounded-lg border border-gold/40 px-3 py-2 text-xs uppercase tracking-widest text-gold hover:bg-gold/10"
          >
            + Add item
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {addons.map((a, i) => (
            <Card key={i} title={a.name || "Item"}>
              <div className="space-y-2">
                <Field label="Name" value={a.name} onChange={(v) => updA(i, { name: v })} />
                <Field label="Price" value={a.price} onChange={(v) => updA(i, { price: v })} />
                <IconBtn
                  danger
                  onClick={() => set("otherPricing", addons.filter((_, idx) => idx !== i))}
                >
                  Delete
                </IconBtn>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ─────────────────────────── Text content ─────────────────────────── */

function TextEditor({ c, set }: EditorProps) {
  const { hero, stats, about, contact, testimonials, faqs, instagram } = c;

  return (
    <div className="space-y-6">
      <Card title="Hero">
        <div className="space-y-2">
          <Field label="Eyebrow" value={hero.eyebrow} onChange={(v) => set("hero", { ...hero, eyebrow: v })} />
          <Area
            label="Headline"
            hint="one line per row"
            value={hero.headline.join("\n")}
            onChange={(v) => set("hero", { ...hero, headline: v.split("\n").filter(Boolean) })}
          />
          <Area label="Sub-text" value={hero.sub} rows={2} onChange={(v) => set("hero", { ...hero, sub: v })} />
        </div>
      </Card>

      <Card title="Stats">
        <div className="grid gap-3 sm:grid-cols-2">
          {stats.map((s, i) => (
            <div key={i} className="flex items-end gap-2">
              <div className="w-20">
                <Field
                  label="Value"
                  value={String(s.value)}
                  onChange={(v) =>
                    set(
                      "stats",
                      stats.map((x, idx) => (idx === i ? { ...x, value: Number(v) || 0 } : x))
                    )
                  }
                />
              </div>
              <div className="w-16">
                <Field
                  label="Suffix"
                  value={s.suffix}
                  onChange={(v) =>
                    set("stats", stats.map((x, idx) => (idx === i ? { ...x, suffix: v } : x)))
                  }
                />
              </div>
              <div className="flex-1">
                <Field
                  label="Label"
                  value={s.label}
                  onChange={(v) =>
                    set("stats", stats.map((x, idx) => (idx === i ? { ...x, label: v } : x)))
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="About">
        <div className="grid gap-2 sm:grid-cols-2">
          <Field label="Name" value={about.name} onChange={(v) => set("about", { ...about, name: v })} />
          <Field label="Role" value={about.role} onChange={(v) => set("about", { ...about, role: v })} />
          <Field label="Co-founder" value={about.coFounder} onChange={(v) => set("about", { ...about, coFounder: v })} />
          <Field label="Co-founder role" value={about.coFounderRole} onChange={(v) => set("about", { ...about, coFounderRole: v })} />
        </div>
        <div className="mt-2 space-y-2">
          <Area label="Intro" value={about.intro} rows={2} onChange={(v) => set("about", { ...about, intro: v })} />
          <Area
            label="Story"
            hint="one paragraph per line"
            value={about.story.join("\n")}
            rows={4}
            onChange={(v) => set("about", { ...about, story: v.split("\n").filter(Boolean) })}
          />
          <Area
            label="Awards"
            hint="one per line"
            value={about.awards.join("\n")}
            onChange={(v) => set("about", { ...about, awards: v.split("\n").filter(Boolean) })}
          />
        </div>
        <div className="mt-3">
          <span className="mb-1 block text-[0.65rem] uppercase tracking-[0.15em] text-white/40">
            Timeline
          </span>
          <div className="space-y-2">
            {about.timeline.map((t, i) => (
              <div key={i} className="grid gap-2 sm:grid-cols-[80px_1fr_2fr]">
                <Field label="Year" value={t.year} onChange={(v) => set("about", { ...about, timeline: about.timeline.map((x, idx) => (idx === i ? { ...x, year: v } : x)) })} />
                <Field label="Title" value={t.title} onChange={(v) => set("about", { ...about, timeline: about.timeline.map((x, idx) => (idx === i ? { ...x, title: v } : x)) })} />
                <Field label="Text" value={t.text} onChange={(v) => set("about", { ...about, timeline: about.timeline.map((x, idx) => (idx === i ? { ...x, text: v } : x)) })} />
              </div>
            ))}
          </div>
        </div>
      </Card>

      <Card title="Contact">
        <div className="grid gap-2 sm:grid-cols-2">
          <Field label="Phone (display)" value={contact.phone} onChange={(v) => set("contact", { ...contact, phone: v })} />
          <Field label="Phone link (tel:…)" value={contact.phoneHref} onChange={(v) => set("contact", { ...contact, phoneHref: v })} />
          <Field label="WhatsApp number" value={contact.whatsapp} onChange={(v) => set("contact", { ...contact, whatsapp: v })} />
          <Field label="Email" value={contact.email} onChange={(v) => set("contact", { ...contact, email: v })} />
        </div>
        <div className="mt-2">
          <Field label="Address" value={contact.address} onChange={(v) => set("contact", { ...contact, address: v })} />
        </div>
      </Card>

      <Card title="Testimonials">
        <div className="space-y-3">
          {testimonials.map((t, i) => (
            <div key={i} className="rounded-lg border border-white/10 p-3">
              <div className="grid gap-2 sm:grid-cols-2">
                <Field label="Name" value={t.name} onChange={(v) => set("testimonials", testimonials.map((x, idx) => (idx === i ? { ...x, name: v } : x)))} />
                <Field label="Event" value={t.event} onChange={(v) => set("testimonials", testimonials.map((x, idx) => (idx === i ? { ...x, event: v } : x)))} />
              </div>
              <div className="mt-2">
                <Area label="Quote" value={t.quote} rows={2} onChange={(v) => set("testimonials", testimonials.map((x, idx) => (idx === i ? { ...x, quote: v } : x)))} />
              </div>
              <div className="mt-2 flex justify-end">
                <IconBtn danger onClick={() => set("testimonials", testimonials.filter((_, idx) => idx !== i))}>
                  Delete
                </IconBtn>
              </div>
            </div>
          ))}
          <button
            onClick={() =>
              set("testimonials", [
                ...testimonials,
                { name: "New client", event: "Wedding", rating: 5, quote: "", avatar: "/images/bride-white.webp" },
              ])
            }
            className="rounded-lg border border-gold/40 px-3 py-2 text-xs uppercase tracking-widest text-gold hover:bg-gold/10"
          >
            + Add testimonial
          </button>
        </div>
      </Card>

      <Card title="FAQs">
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="rounded-lg border border-white/10 p-3">
              <Field label="Question" value={f.q} onChange={(v) => set("faqs", faqs.map((x, idx) => (idx === i ? { ...x, q: v } : x)))} />
              <div className="mt-2">
                <Area label="Answer" value={f.a} rows={2} onChange={(v) => set("faqs", faqs.map((x, idx) => (idx === i ? { ...x, a: v } : x)))} />
              </div>
              <div className="mt-2 flex justify-end">
                <IconBtn danger onClick={() => set("faqs", faqs.filter((_, idx) => idx !== i))}>
                  Delete
                </IconBtn>
              </div>
            </div>
          ))}
          <button
            onClick={() => set("faqs", [...faqs, { q: "New question", a: "" }])}
            className="rounded-lg border border-gold/40 px-3 py-2 text-xs uppercase tracking-widest text-gold hover:bg-gold/10"
          >
            + Add FAQ
          </button>
        </div>
      </Card>

      <Card title="Instagram grid">
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/50">{instagram.length} images</p>
          <UploadButton
            kind="image"
            folder="instagram"
            label="+ Upload image"
            onDone={(url) => set("instagram", [...instagram, url])}
          />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {instagram.map((src, i) => (
            <div key={i} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-20 w-full rounded object-cover" />
              <button
                onClick={() => set("instagram", instagram.filter((_, idx) => idx !== i))}
                className="absolute right-1 top-1 rounded bg-ink-950/80 px-1.5 text-xs text-red-300"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function IconBtn({
  children,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded border px-2 py-1 text-xs ${
        danger
          ? "border-red-500/30 text-red-300 hover:bg-red-500/10"
          : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
