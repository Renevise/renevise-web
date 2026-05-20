"use client";

import { motion } from "motion/react";
import { Sparkles, Star } from "lucide-react";
import { CTAButtons } from "./CTAButtons";

type HeroContentProps = {
  badge?: string;
  title?: string;
  titleHighlight?: string;
  subtitle?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  socialProof?: {
    rating?: string;
    count?: string;
    label?: string;
  };
};

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HeroContent({
  badge,
  title,
  titleHighlight,
  subtitle,
  primaryCTA,
  secondaryCTA,
  socialProof,
}: HeroContentProps) {
  const rating = socialProof?.rating ?? "5.0";
  const count = socialProof?.count ?? "50+";
  const label = socialProof?.label ?? "businesses worldwide";

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="relative z-10 max-w-xl"
    >
      <motion.div variants={item}>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[11px] font-medium text-white/85 backdrop-blur-md">
          {/* <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[4px] bg-gradient-to-br from-[#3b82f6] to-[#1e2b7a]">
            <Sparkles className="h-2.5 w-2.5 text-white" />
          </span> */}
          {badge ?? "Transforming Enterprise Technology"}
        </span>
      </motion.div>

      <motion.h1
        variants={item}
        className="mt-4 font-extrabold leading-[1.02] tracking-[-0.015em] text-white"
        style={{ fontSize: "clamp(2rem, 1.4rem + 2.05vw, 3.15rem)" }}
      >
        {title ?? "Build Faster With"}{" "}
        {/* <span className="relative inline-block bg-gradient-to-r from-[#3b82f6] to-[#7aa2ff] bg-clip-text text-transparent">
          {titleHighlight ?? "AI-Powered Solutions"}
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.7, ease: "easeOut" }}
            className="absolute -bottom-1 left-0 right-0 h-[2px] origin-left rounded-full bg-gradient-to-r from-[#3b82f6] to-[#7aa2ff]"
          />
        </span> */}
      </motion.h1>

      <motion.p
        variants={item}
        className="mt-4 max-w-md text-[14.5px] leading-relaxed text-white/60"
      >
        {subtitle ??
          "We build AI, web, and mobile products that help businesses scale faster."}
      </motion.p>

      <motion.div variants={item} className="mt-5">
        <CTAButtons primaryLabel={primaryCTA} secondaryLabel={secondaryCTA} />
      </motion.div>

      <motion.div
        variants={item}
        className="mt-4 flex flex-wrap items-center gap-3"
      >
        <div className="flex -space-x-2">
          {[
            "from-[#3b82f6] to-[#1e2b7a]",
            "from-[#7aa2ff] to-[#3b82f6]",
            "from-emerald-400 to-[#3b82f6]",
            "from-amber-300 to-rose-400",
          ].map((g, i) => (
            <div
              key={i}
              className={`h-7 w-7 rounded-full border-2 border-[#0d1234] bg-gradient-to-br ${g}`}
            />
          ))}
        </div>
        <span className="text-sm font-bold text-white">{rating}</span>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-3.5 w-3.5 fill-amber-300 text-amber-300"
            />
          ))}
        </div>
        <span className="text-[13px] text-white/55">
          Trusted by {count} {label}
        </span>
      </motion.div>
    </motion.div>
  );
}
