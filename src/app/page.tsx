import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import FeaturedWork from "@/components/sections/FeaturedWork";
import ServicesPreview from "@/components/sections/ServicesPreview";
import Testimonials from "@/components/sections/Testimonials";
import InstagramPreview from "@/components/sections/InstagramPreview";
import CTA from "@/components/sections/CTA";
import { site, contact } from "@/content/site";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": site.url,
    name: site.fullName,
    image: site.ogImage,
    description: site.description,
    url: site.url,
    telephone: contact.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address,
    },
    priceRange: "₹₹₹",
    sameAs: contact.socials.map((s) => s.href),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Stats />
      <FeaturedWork />
      <ServicesPreview />
      <Testimonials />
      <InstagramPreview />
      <CTA />
    </>
  );
}
