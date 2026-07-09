import { cache } from "react";
import {
  contact,
  hero,
  stats,
  weddingPackages,
  otherPricing,
  portfolio,
  videos,
  about,
  testimonials,
  faqs,
  instagram,
} from "@/content/site";
import { kv } from "./kv";

/**
 * The editable slice of site content. Branding/SEO (`site`) and navigation
 * (`nav`) stay static in src/content/site.ts. Everything here can be managed
 * from the /admin dashboard and is stored as a single JSON document in KV.
 */
export type SiteContent = {
  contact: typeof contact;
  hero: typeof hero;
  stats: typeof stats;
  weddingPackages: typeof weddingPackages;
  otherPricing: typeof otherPricing;
  portfolio: typeof portfolio;
  videos: typeof videos;
  about: typeof about;
  testimonials: typeof testimonials;
  faqs: typeof faqs;
  instagram: typeof instagram;
};

export const defaultContent: SiteContent = {
  contact,
  hero,
  stats,
  weddingPackages,
  otherPricing,
  portfolio,
  videos,
  about,
  testimonials,
  faqs,
  instagram,
};

const CONTENT_KEY = "karkey:content:v1";

/**
 * Load merged content: stored overrides on top of the built-in defaults.
 * Deduplicated per-request via React cache(). Falls back to defaults if the
 * store is missing or errors, so the public site never breaks.
 */
export const getContent = cache(async (): Promise<SiteContent> => {
  if (!kv) return defaultContent;
  try {
    const stored = await kv.get<Partial<SiteContent>>(CONTENT_KEY);
    if (!stored) return defaultContent;
    return { ...defaultContent, ...stored };
  } catch {
    return defaultContent;
  }
});

export async function saveContent(next: SiteContent): Promise<void> {
  if (!kv) {
    throw new Error("Content store not configured — KV env vars are missing.");
  }
  await kv.set(CONTENT_KEY, next);
}
