"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { motion } from "motion/react";

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
      <motion.div whileHover={{ y: -1.5 }} whileTap={{ scale: 0.98 }}>
        <Link
          href={primaryHref}
          className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1e2b7a] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(59,130,246,0.65)] transition-all duration-300 hover:shadow-[0_18px_40px_-10px_rgba(59,130,246,0.8)]"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
          <span className="relative">{primaryLabel}</span>
          <ArrowRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </motion.div>

      <motion.div whileHover={{ y: -1.5 }} whileTap={{ scale: 0.98 }}>
        <Link
          href={secondaryHref}
          className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08]"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
            <PlayCircle className="h-3.5 w-3.5 text-[#7aa2ff]" />
          </span>
          <span>{secondaryLabel}</span>
        </Link>
      </motion.div>
    </div>
  );
}
