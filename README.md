# KARKEY Photography — Premium Portfolio

An award-agency-grade photography website built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **GSAP + ScrollTrigger** and **Lenis** smooth scroll. Black / white / gold luxury theme, glassmorphism, cinematic motion, fully responsive and SEO-ready.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## ✏️ Editing content — ONE file

**All text, images and videos live in [`src/content/site.ts`](src/content/site.ts).**
Nothing is hard-coded in the pages, so you update the whole site from that single file:

| Section | Key |
|---|---|
| Business name, tagline, SEO | `site` |
| Phone / email / WhatsApp / map / hours / socials | `contact` |
| Hero (headline, background video/slideshow) | `hero` |
| Stat counters | `stats` |
| Services + pricing | `services` |
| Portfolio images + categories | `portfolio`, `portfolioCategories` |
| Gallery images | `gallery` |
| Videos (YouTube ID or mp4) | `videos` |
| About story, awards, timeline | `about` |
| Testimonials | `testimonials` |
| FAQ | `faqs` |
| Instagram grid | `instagram` |

### Swapping in real photos
Images currently use Unsplash placeholders. To use KARKEY's own photos:
1. Drop files into `public/images/`.
2. Change the URL in `site.ts` to e.g. `/images/wedding-01.jpg`.
3. To load images from another external host, add its hostname to `remotePatterns` in `next.config.mjs`.

### Hero background video
Set `hero.video` to an `.mp4` URL for a cinematic looping background (poster image is the fallback). Leave it empty (`""`) to use the auto-rotating slideshow.

### Videos
Each item in `videos` takes either a `youtubeId` **or** a hosted `src` (mp4). Update the placeholder IDs.

### Contact form
`src/components/sections/ContactForm.tsx` currently simulates submission. Wire the `onSubmit` handler to your provider (Resend, Formspree, or a Next.js Route Handler) to receive enquiries.

## Structure

```
src/
├─ app/                 # routes: home, about, portfolio, services,
│                       #         gallery, videos, testimonials, contact
│                       # + sitemap.ts, robots.ts, not-found.tsx
├─ components/
│  ├─ layout/           # Navbar, Footer, SmoothScroll (Lenis), Preloader,
│  │                    # Cursor, ScrollProgress, BackToTop, WhatsAppButton, Theme
│  ├─ sections/         # Hero, Stats, FeaturedWork, ServicesPreview,
│  │                    # Testimonials, InstagramPreview, CTA, Timeline, FAQ, ContactForm
│  ├─ gallery/          # MasonryGallery, InfiniteGallery, VideoGallery (lightbox)
│  └─ ui/               # Reveal, TextReveal, Magnetic, Counter, SectionHeading, PageHero, Icon
├─ content/site.ts      # ← ALL CONTENT
└─ lib/utils.ts
```

## Features
- Cinematic hero (video/slideshow) with parallax + animated headline reveal
- Lenis smooth scroll synced to GSAP ScrollTrigger
- Framer Motion scroll-reveals, text reveals, magnetic buttons, animated counters
- Masonry galleries with filtering, lightbox (zoom + thumbnails), lazy loading
- Infinite-scroll gallery; fullscreen video player with categories
- Sticky glass navbar, animated hamburger, fullscreen mobile menu
- Dark/light theme toggle, custom cursor, preloader, scroll progress bar
- Floating WhatsApp + back-to-top buttons
- SEO: metadata, Open Graph, Twitter cards, JSON-LD LocalBusiness, sitemap.xml, robots.txt
- Accessibility: reduced-motion support, semantic markup, keyboard-friendly, ARIA labels
- `next/image` optimization (AVIF/WebP), fully responsive, mobile-first

## Notes
- Placeholder copy and Unsplash imagery are used because the reference Canva site
  renders client-side and could not be scraped. Replace via `site.ts` as above.
- Custom cursor and heavy motion auto-disable on touch devices / reduced-motion.
