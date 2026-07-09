"use client";

import { createContext, useContext } from "react";
import type { SiteContent } from "@/lib/content";

const ContentContext = createContext<SiteContent | null>(null);

export function ContentProvider({
  value,
  children,
}: {
  value: SiteContent;
  children: React.ReactNode;
}) {
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent(): SiteContent {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent must be used within a ContentProvider");
  }
  return ctx;
}
