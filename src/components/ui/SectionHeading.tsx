"use client";

import Reveal from "./Reveal";
import TextReveal from "./TextReveal";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-8 bg-gold" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <TextReveal
        text={title}
        as="h2"
        delay={0.1}
        className={cn(
          "mt-5 text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl",
          align === "center" && "justify-center"
        )}
      />
      {description && (
        <Reveal delay={0.3}>
          <p className="mt-6 text-base leading-relaxed text-white/55 md:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
