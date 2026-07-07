# Deploying to Firebase Hosting (free / Spark plan)

This site is a **static export** (`output: "export"`), so it runs on Firebase Hosting's
**free Spark plan** — no billing card, free HTTPS, free `*.web.app` domain. Perfect for
low-traffic, long-lived sites. Commercial use is allowed on the free plan.

Everything is already configured: `next.config.mjs` exports static HTML, images are
WebP-optimised, and `firebase.json` is ready.

## One-time setup

1. Create a free Firebase project at https://console.firebase.google.com (any name).
2. Install the CLI and log in:
   ```bash
   npm install -g firebase-tools
   firebase login
   ```
3. Link this folder to your project (creates `.firebaserc`):
   ```bash
   cd ~/karkey-photography
   firebase use --add
   ```
   Pick your project, alias it `default`.
   > Do **not** run `firebase init` — it would overwrite the ready-made `firebase.json`.

## Deploy (and every future update)

```bash
cd ~/karkey-photography
npm run deploy
```

That runs `next build` (regenerates `out/`) and uploads it. Your site goes live at
`https://<project-id>.web.app`. Re-run it any time you change content in
`src/content/site.ts`.

## Custom domain (optional, free)
Firebase Console → Hosting → **Add custom domain** → follow the DNS steps. HTTPS is
automatic and free.

## Free-tier limits (plenty for ~10 users)
- Storage: 10 GB (this site is ~20 MB)
- Transfer: 360 MB/day (a full visit is ~1–15 MB depending on videos viewed)

## Notes
- To preview the production build locally before deploying:
  `npx serve out` (or `firebase emulators:start --only hosting`).
- Backups of pre-compression images are in `.predeploy-originals/` and
  `.lowres-originals-backup/` (both git-ignored, not deployed).
