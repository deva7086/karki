import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 text-center">
      <span className="eyebrow">
        <span className="h-px w-8 bg-gold" /> Error 404
      </span>
      <h1 className="mt-6 font-display text-7xl text-white md:text-9xl">
        Lost the <span className="italic text-gradient-gold">frame</span>
      </h1>
      <p className="mt-6 max-w-md text-white/55">
        The page you&rsquo;re looking for has wandered off. Let&rsquo;s get you back to
        somewhere beautiful.
      </p>
      <Link href="/" className="btn-gold mt-10">
        Back Home
      </Link>
    </section>
  );
}
