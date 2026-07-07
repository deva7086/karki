"use client";

import {
  Camera,
  Video,
  Send,
  Clapperboard,
  BookOpen,
  Sun,
  type LucideProps,
} from "lucide-react";

const map = { Camera, Video, Send, Clapperboard, BookOpen, Sun } as const;

export type IconName = keyof typeof map;

export default function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = map[name as IconName] ?? Camera;
  return <Cmp {...props} />;
}
