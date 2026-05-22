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
 * Hover behaviour is delegated to the shared `.rv-card-dark` utility so
 * every dark card across the site speaks the same motion language.
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
        noHover ? "" : "rv-card-dark",
        className,
      ].join(" ")}
      style={style}
    >
      <SectionBackground />
      {!noHover && <span className="rv-card-glow" aria-hidden />}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
