import { Redis } from "@upstash/redis";

/**
 * Upstash Redis / Vercel KV client.
 * Returns null when the store isn't configured yet, so the site falls back to
 * the built-in default content in src/content/site.ts.
 */
function makeClient(): Redis | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export const kv = makeClient();
export const kvConfigured = kv !== null;
