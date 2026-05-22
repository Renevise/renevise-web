"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";

type CTAButtonsProps = {
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTAButtons({
  primaryLabel = "Book Free Consultation",
  primaryHref = "/contact",
  secondaryLabel = "View Case Studies",
  secondaryHref = "/services",
}: CTAButtonsProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:gap-3.5">
      <Link
        href={primaryHref}
        className="group rv-btn-primary inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1e2b7a] px-5 py-3 text-sm font-semibold text-white"
      >
        <span className="rv-btn-sheen" aria-hidden />
        <span className="relative">{primaryLabel}</span>
        <ArrowRight className="relative h-4 w-4 transition-transform duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] group-hover:translate-x-0.5" />
      </Link>

      <Link
        href={secondaryHref}
        className="group rv-btn-ghost inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white backdrop-blur-md hover:border-white/30 hover:bg-white/[0.09]"
      >
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 transition-colors duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] group-hover:bg-white/20">
          <PlayCircle className="h-3.5 w-3.5 text-[#7aa2ff]" />
        </span>
        <span>{secondaryLabel}</span>
      </Link>
    </div>
  );
}
