/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export -> deployable to Firebase Hosting free (Spark) plan.
  output: "export",
  reactStrictMode: true,
  images: {
    // No server on static hosting, so serve images as-is (already WebP-optimised).
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
