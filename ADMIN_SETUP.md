# KARKEY Admin — Setup Guide

The site now has a password-protected admin at **`/admin`** where you can add/remove
gallery images, videos, packages/pricing and text content. Edits are stored in a
content store (Upstash Redis / Vercel KV) and media is uploaded to Cloudinary.

Until the services below are connected, the public site still works — it falls back
to the built-in default content in `src/content/site.ts`.

---

## 1. Cloudinary (image + video hosting)

1. Create a free account at <https://cloudinary.com>.
2. Dashboard → **Settings → API Keys**. Copy:
   - **Cloud name** → `CLOUDINARY_CLOUD_NAME`
   - **API Key** → `CLOUDINARY_API_KEY`
   - **API Secret** → `CLOUDINARY_API_SECRET`

## 2. Content store (Upstash Redis via Vercel KV)

Easiest path on Vercel:

1. Vercel dashboard → your project → **Storage → Create Database → KV (Upstash Redis)**.
2. Connect it to the project. Vercel injects `KV_REST_API_URL` and `KV_REST_API_TOKEN`
   automatically.

Or create a database directly at <https://upstash.com> and use
`UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` (both are supported).

## 3. Admin login secrets

- `ADMIN_PASSWORD` — the password you'll type at `/admin/login`.
- `SESSION_SECRET` — a long random string. Generate one with:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

## 4. Add the variables

- **Local dev:** copy `.env.example` to `.env.local` and fill in the values.
- **Vercel:** Project → **Settings → Environment Variables** → add all of the above
  (the KV ones are added for you if you used the Vercel KV integration). Redeploy.

---

## Using the admin

1. Go to `https://your-site.com/admin` → you'll be sent to the login page.
2. Enter your `ADMIN_PASSWORD`.
3. Edit under the tabs **Gallery / Videos / Packages / Text content**.
4. Click **Save changes** — the public site updates immediately.

**Videos:** paste a YouTube ID *or* upload a video file. Posters are images.

## Notes

- One admin account (single password). Login lasts 7 days per browser.
- "Delete" removes an item from the site. The underlying file may still live in
  your Cloudinary library (safe to leave, or delete it from the Cloudinary dashboard).
- The site is no longer a static export — it must run on a server (Vercel).
