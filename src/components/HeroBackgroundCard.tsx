"use client";

import type { CSSProperties, ReactNode } from "react";
import { SectionBackground } from "@/components/SectionBackground";

interface HeroBackgroundCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Disable the built-in hover lift if a parent already handles motion. */
  noHover?: boolean;
}

/**
 * Card-sized wrapper that re-uses the exact atmospheric treatment from
 * HeroBackground (deep navy gradient, soft grid, ambient glows, drifting
 * particles) plus matching border + multi-layer shadow. Drop in around any
 * card body; child content sits above the background via z-10.
 *
 * Sized for individual cards — keeps the rest of the section untouched.
 */
export function HeroBackgroundCard({
  children,
  className = "",
  style,
  noHover = false,
}: HeroBackgroundCardProps) {
  return (
    <div
      className={[
        "group relative isolate h-full overflow-hidden rounded-card border border-white/10 bg-[#06092a] text-white",
        "transition-all duration-300",
        noHover ? "" : "hover:-translate-y-0.5 hover:border-white/25",
        className,
      ].join(" ")}
      style={{
        boxShadow:
          "0 18px 40px -20px rgba(0,0,0,0.55), 0 10px 30px -18px rgba(59,130,246,0.28), inset 0 1px 0 rgba(255,255,255,0.08)",
        ...style,
      }}
    >
      <SectionBackground />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
