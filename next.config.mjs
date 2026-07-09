/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server-rendered on Vercel (dynamic content + admin). No static export.
  reactStrictMode: true,
  images: {
    // Local /public images are already WebP; remote media comes from Cloudinary.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
