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
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  whatsapp: "919876543210",
  whatsappMessage: "Hi KARKEY, I'd love to know more about your photography packages.",
  email: "hello@karkeyphotography.com",
  address: "Studio 12, Creative Quarter, Chennai, Tamil Nadu 600001, India",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248844.0567207!2d80.04036!3d13.047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265ea4f7d3361%3A0x6e61a70b6863d433!2sChennai!5e0!3m2!1sen!2sin!4v1700000000000",
  hours: [
    { day: "Monday – Friday", time: "9:00 AM – 8:00 PM" },
    { day: "Saturday", time: "10:00 AM – 6:00 PM" },
    { day: "Sunday", time: "By appointment" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com", handle: "@karkeyphotography" },
    { label: "Facebook", href: "https://facebook.com", handle: "/karkeyphotography" },
    { label: "YouTube", href: "https://youtube.com", handle: "KARKEY Films" },
    { label: "Pinterest", href: "https://pinterest.com", handle: "@karkeyphoto" },
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
  { value: 2, suffix: "+", label: "Years behind the lens" },
  { value: 120, suffix: "+", label: "Weddings & events" },
  { value: 15, suffix: "+", label: "Cities covered" },
  { value: 100, suffix: "%", label: "Happy couples" },
];

/* ── SERVICES ─────────────────────────────────────────────────────────────── */
export type Service = {
  slug: string;
  title: string;
  icon: string; // lucide-react icon name
  blurb: string;
  features: string[];
  priceFrom?: string;
  image: string;
};

export const services: Service[] = [
  {
    slug: "photography",
    title: "Photography",
    icon: "Camera",
    blurb:
      "Candid, editorial and fine-art coverage that reads like a film still — every frame intentional.",
    features: ["Full-day coverage", "Lead + second shooter", "Hand-edited gallery", "Print-ready files"],
    priceFrom: "₹65,000",
    image: "/images/bride-white.webp",
  },
  {
    slug: "videography",
    title: "Videography",
    icon: "Video",
    blurb:
      "Cinematic motion capture with pro audio, gimbals and colour grading for a truly filmic look.",
    features: ["4K / 6K capture", "Multi-cam setup", "Licensed music", "Colour grade"],
    priceFrom: "₹85,000",
    image: "/images/last-light.webp",
  },
  {
    slug: "drone-shoots",
    title: "Drone Shoots",
    icon: "Send",
    blurb:
      "Sweeping aerial perspectives that give your story a breathtaking sense of scale and place.",
    features: ["Licensed pilots", "4K aerials", "Venue reveals", "Sunset flights"],
    priceFrom: "₹25,000",
    image: "/images/beach-freedom.webp",
  },
  {
    slug: "wedding-films",
    title: "Wedding Films",
    icon: "Clapperboard",
    blurb:
      "A 3–7 minute cinematic film plus highlight teaser — the day you'll relive again and again.",
    features: ["Story-led edit", "Teaser + feature film", "Vows & speeches", "Same-day edit option"],
    priceFrom: "₹1,20,000",
    image: "/images/couple-indoor.webp",
  },
  {
    slug: "albums",
    title: "Fine-Art Albums",
    icon: "BookOpen",
    blurb:
      "Museum-grade layflat albums, hand-bound in Italian leather — designed, not just printed.",
    features: ["Layflat spreads", "Italian leather", "Archival prints", "Custom design"],
    priceFrom: "₹18,000",
    image: "/images/yellow-saree.webp",
  },
  {
    slug: "outdoor-shoots",
    title: "Outdoor Shoots",
    icon: "Sun",
    blurb:
      "Pre-wedding, maternity and portrait sessions at handpicked locations, golden-hour perfected.",
    features: ["Location scouting", "Styling guidance", "2–3 hr session", "Golden hour"],
    priceFrom: "₹22,000",
    image: "/images/ocean-breeze.webp",
  },
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
  name: "Karthik Keyan",
  role: "Founder & Lead Photographer",
  intro:
    "Since 2024 I've chased light across coastlines, temples and ballrooms — always in pursuit of the one honest frame that says everything words can't.",
  story: [
    "KARKEY began with a single borrowed camera and a stubborn belief that photographs should feel like memories, not poses. What started as weekend shoots for friends grew into a boutique studio trusted by families across the country.",
    "We keep our calendar small on purpose. Fewer weddings means more presence — time to notice the grandmother wiping a tear, the nervous laugh before the vows, the light doing something it will never do again.",
    "Every gallery we deliver is hand-crafted, never mass-produced. Because your story deserves an author, not an algorithm.",
  ],
  awards: [
    "Featured — WeddingSutra 'Fresh Talent'",
    "Winner — South India Wedding Awards 2025",
    "Rising Studio — Cinematic Wedding Films, 2025",
    "Junebug Weddings — Hotlist Feature",
  ],
  timeline: [
    { year: "2024", title: "KARKEY Begins", text: "Founded the studio and shot our very first wedding." },
    { year: "2024", title: "First Studio", text: "Opened our creative space and built the core team." },
    { year: "2025", title: "Films Division", text: "Launched our cinematic wedding films arm." },
    { year: "2025", title: "Going Wider", text: "Expanded destination coverage across South India." },
    { year: "2026", title: "Rising Fast", text: "A young studio already trusted by couples across the region." },
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
