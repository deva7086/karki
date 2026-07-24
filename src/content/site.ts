/**
 * ────────────────────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH FOR ALL SITE CONTENT
 * ────────────────────────────────────────────────────────────────────────────
 *  Replace placeholder copy, image URLs and video URLs below with KARKEY
 *  Photography's real assets. Every page reads from this file, so you only
 *  edit content in one place.
 *
 *  Images are served from /public/images. To add or swap a photo: drop the file
 *  into /public/images and reference it as "/images/your-file.webp".
 * ────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "KARKEY",
  fullName: "KARKEY Photography",
  tagline: "Timeless stories, cinematically told.",
  description:
    "KARKEY Photography is a premium wedding & lifestyle photography studio crafting cinematic, emotion-led imagery for the moments that matter most.",
  url: "https://karkeyphotography.com",
  ogImage: "/images/wedding-couple.webp",
  keywords: [
    "wedding photography",
    "pre wedding shoot",
    "candid photography",
    "cinematic wedding films",
    "maternity photography",
    "fashion photography",
    "KARKEY Photography",
  ],
};

export const contact = {
  phone: "+91 63813 31614",
  phoneHref: "tel:+916381331614",
  whatsapp: "916381331614",
  whatsappMessage: "Hi KARKEY, I'd love to know more about your photography packages.",
  email: "karkeyphotography231@gmail.com",
  address: "Chennai, Tamil Nadu, India",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248844.0567207!2d80.04036!3d13.047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai!5e0!3m2!1sen!2sin!4v1700000000000",
  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
    { day: "Saturday", time: "10:00 AM – 6:00 PM" },
    { day: "Sunday", time: "By appointment" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com/karkey__photography", handle: "@karkey__photography" },
  ],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Videos", href: "/videos" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

/* ── HERO ─────────────────────────────────────────────────────────────────── */
export const hero = {
  eyebrow: "Award-winning wedding & lifestyle photography",
  // Set to a real .mp4 URL for a cinematic background video; falls back to poster.
  video: "",
  poster: "/images/wedding-couple.webp",
  headline: ["We frame", "the feeling,", "not just the moment."],
  sub: "A boutique studio turning fleeting glances, quiet tears and unrepeatable joy into heirlooms you'll return to for a lifetime.",
  slideshow: [
    "/images/wedding-couple.webp",
    "/images/beach-freedom.webp",
    "/images/heritage-trio.webp",
    "/images/last-light.webp",
  ],
};

/* ── STATS / COUNTERS ─────────────────────────────────────────────────────── */
export const stats = [
  { value: 5, suffix: "+", label: "Years of experience" },
  { value: 100, suffix: "+", label: "Weddings & events" },
  { value: 15, suffix: "+", label: "Cities covered" },
  { value: 100, suffix: "%", label: "Happy couples" },
];

/* ── SERVICES / WEDDING PACKAGES ──────────────────────────────────────────── */
export type PackageTier = {
  slug: string;
  name: string;
  price: string;
  blurb: string;
  features: string[];
  image: string;
  featured?: boolean;
};

export const weddingPackages: PackageTier[] = [
  {
    slug: "silver",
    name: "Silver",
    price: "₹35,000",
    blurb: "Essential wedding coverage for intimate celebrations.",
    features: ["Single-day coverage", "Candid + traditional photos", "Hand-edited gallery", "Online delivery"],
    image: "/images/bride-white.webp",
  },
  {
    slug: "gold",
    name: "Gold",
    price: "₹55,000",
    blurb: "Our most-loved balance of photo and cinematic coverage.",
    features: ["Full-day coverage", "Photo + video team", "Highlight teaser", "Print-ready files"],
    image: "/images/couple-indoor.webp",
  },
  {
    slug: "platinum",
    name: "Platinum",
    price: "₹75,000",
    blurb: "Extended cinematic coverage for the full celebration.",
    features: ["Multi-day coverage", "Lead + second shooter", "Cinematic wedding film", "Premium album"],
    image: "/images/last-light.webp",
    featured: true,
  },
  {
    slug: "diamond",
    name: "Diamond",
    price: "₹1,05,000",
    blurb: "The complete signature experience — no detail spared.",
    features: ["Everything in Platinum", "Drone aerials", "Pre-wedding shoot", "Luxury layflat album"],
    image: "/images/yellow-saree.webp",
  },
];

/* Standalone add-on pricing (outside the wedding packages) */
export type AddOn = { name: string; price: string };

export const otherPricing: AddOn[] = [
  { name: "Pre-Wedding Shoot", price: "₹15,000" },
  { name: "Drone Shoots", price: "₹12,000 – ₹15,000" },
  { name: "Outdoor Shoots", price: "₹8,000 / 2 hrs (hourly)" },
];

/* ── PORTFOLIO CATEGORIES & IMAGES ────────────────────────────────────────── */
export type PortfolioItem = {
  src: string;
  category: string;
  title: string;
  /** grid span for masonry variety: 1 (tall) | 0 (normal) */
  tall?: boolean;
};

export const portfolioCategories = [
  "All",
  "Wedding",
  "Pre Wedding",
  "Engagement",
  "Fashion",
  "Events",
  "Commercial",
] as const;

export const portfolio: PortfolioItem[] = [
  { src: "/images/wedding-couple.webp", category: "Wedding", title: "The Reception" },
  { src: "/images/couple-bw.webp", category: "Engagement", title: "Held Close", tall: true },
  { src: "/images/portrait-gold.webp", category: "Fashion", title: "Golden Hour", tall: true },
  { src: "/images/beach-freedom.webp", category: "Pre Wedding", title: "Set Free" },
  { src: "/images/bride-white.webp", category: "Wedding", title: "The Bride", tall: true },
  { src: "/images/heritage-trio.webp", category: "Fashion", title: "Golden Trio" },
  { src: "/images/gold-steps.webp", category: "Fashion", title: "Heritage Steps", tall: true },
  { src: "/images/engagement-garland.webp", category: "Engagement", title: "The Garlands" },
  { src: "/images/seaside-calm.webp", category: "Pre Wedding", title: "Seaside Calm", tall: true },
  { src: "/images/last-light.webp", category: "Commercial", title: "Last Light", tall: true },
  { src: "/images/couple-indoor.webp", category: "Wedding", title: "Reception Portrait", tall: true },
  { src: "/images/heritage-man.webp", category: "Fashion", title: "Sandstone", tall: true },
  { src: "/images/ocean-breeze.webp", category: "Pre Wedding", title: "Ocean Breeze", tall: true },
  { src: "/images/young-smile.webp", category: "Events", title: "Pure Joy", tall: true },
  { src: "/images/city-rain.webp", category: "Commercial", title: "City Rain", tall: true },
  { src: "/images/heritage-grace.webp", category: "Fashion", title: "Heritage Grace", tall: true },
  { src: "/images/stage-portrait.webp", category: "Events", title: "On Stage", tall: true },
  { src: "/images/yellow-saree.webp", category: "Fashion", title: "Mellow Yellow", tall: true },
  { src: "/images/liquid-gold.webp", category: "Commercial", title: "Liquid Gold", tall: true },
  { src: "/images/stage-spotlight.webp", category: "Events", title: "Spotlight", tall: true },
  { src: "/images/ritual-coconut.webp", category: "Wedding", title: "The Rituals" },
];

/* ── GALLERY (dedicated infinite gallery) ─────────────────────────────────── */
export const gallery: string[] = [...portfolio.map((p) => p.src)];

/* ── VIDEOS ───────────────────────────────────────────────────────────────── */
export type VideoItem = {
  title: string;
  category: string;
  poster: string;
  // For hosted mp4 previews set `src`; for YouTube set `youtubeId`.
  src?: string;
  youtubeId?: string;
};

export const videos: VideoItem[] = [
  {
    title: "Blooms of the Old City",
    category: "Cinematic",
    poster: "/images/video-1.webp",
    src: "/videos/reel-1.mp4",
  },
  {
    title: "Courtyard Light",
    category: "Pre Wedding",
    poster: "/images/video-2.webp",
    src: "/videos/reel-2.mp4",
  },
];

/* ── ABOUT ────────────────────────────────────────────────────────────────── */
export const about = {
  portrait: "/images/founder.webp",
  name: "Yugendra Raja Karthikeyan",
  role: "Founder & Lead Photographer",
  coFounder: "Samruthi K",
  coFounderRole: "Co-Founder",
  intro:
    "A passionate freelance photographer with 5+ years of experience, specializing in corporate events, event coverage and visual storytelling.",
  story: [
    "A passionate freelance photographer with 5+ years of experience, specializing in corporate events, event coverage, and visual storytelling.",
    "I have organized and covered numerous events, and worked as a DOP for short films and a pilot film.",
    "With a strong eye for detail and composition, I aim to create impactful visuals that tell powerful stories and elevate every project I work on.",
  ],
  awards: [
    "Best Photograph — Shrimathi Devkunvar Nanalal Bhatt Vaishnav College for Women, 2024",
    "Best Event Management — Shrimathi Devkunvar Nanalal Bhatt Vaishnav College for Women, 2025",
  ],
  timeline: [
    { year: "2024", title: "KARKEY Begins", text: "The studio was born — where our journey behind the lens began." },
    { year: "2024", title: "Our First Event", text: "Covered our very first event and never looked back." },
    { year: "2025", title: "First Film Event", text: "Stepped into cinema as DOP for short films and a pilot film." },
    { year: "2026", title: "Rising Fast", text: "A young studio already trusted by clients across the region." },
  ],
};

/* ── TESTIMONIALS ─────────────────────────────────────────────────────────── */
export type Testimonial = {
  name: string;
  event: string;
  rating: number;
  quote: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Ananya & Rohan",
    event: "Wedding · Udaipur",
    rating: 5,
    quote:
      "They didn't just photograph our wedding — they understood it. Every image feels like the emotion of that exact second. We cry happy tears every time we open the album.",
    avatar: "/images/bride-white.webp",
  },
  {
    name: "Priya Nair",
    event: "Maternity Session",
    rating: 5,
    quote:
      "The most comfortable shoot of my life. KARKEY has a way of making you forget the camera is even there. The photos are pure poetry.",
    avatar: "/images/portrait-gold.webp",
  },
  {
    name: "The Menon Family",
    event: "Baby Shoot",
    rating: 5,
    quote:
      "Patient, kind and ridiculously talented. They captured our daughter's first week in a way we'll treasure forever.",
    avatar: "/images/young-smile.webp",
  },
  {
    name: "Vikram & Sana",
    event: "Pre-Wedding · Goa",
    rating: 5,
    quote:
      "Awwwards-level work, honestly. The film they made looks like it belongs in cinemas. Worth every rupee and more.",
    avatar: "/images/couple-bw.webp",
  },
  {
    name: "Ishita Rao",
    event: "Fashion Editorial",
    rating: 5,
    quote:
      "A rare eye for light and mood. The team is professional, creative and genuinely lovely to collaborate with.",
    avatar: "/images/yellow-saree.webp",
  },
];

/* ── FAQ ──────────────────────────────────────────────────────────────────── */
export const faqs = [
  {
    q: "How far in advance should we book?",
    a: "For peak season (Oct–Feb) we recommend booking 6–9 months ahead. We only take a limited number of weddings each month to stay fully present for every couple.",
  },
  {
    q: "Do you travel for destination weddings?",
    a: "Absolutely. We shoot across India and internationally. Travel and stay are added at cost with full transparency — no surprises.",
  },
  {
    q: "When will we receive our photos and film?",
    a: "A sneak-peek gallery arrives within 72 hours. Full galleries in 3–4 weeks, cinematic films in 6–8 weeks. Rush delivery is available.",
  },
  {
    q: "Can we customise a package?",
    a: "Every package here is a starting point. Tell us your vision, guest count and coverage needs and we'll tailor something that fits perfectly.",
  },
  {
    q: "What is required to reserve a date?",
    a: "A signed agreement and a 30% retainer secure your date. The balance is split across two milestones before delivery.",
  },
];

/* ── INSTAGRAM PREVIEW ────────────────────────────────────────────────────── */
export const instagram = [
  "/images/engagement-garland.webp",
  "/images/gold-steps.webp",
  "/images/heritage-man.webp",
  "/images/young-smile.webp",
  "/images/seaside-calm.webp",
  "/images/city-rain.webp",
];
