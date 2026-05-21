"use client";

import { motion } from "motion/react";

/**
 * Shared cinematic background used by the hero and every other dark
 * section/CTA across the site. Deep navy radial gradient, soft grid,
 * ambient glows, and subtle drifting particles. Pointer-events disabled
 * so it never intercepts clicks.
 *
 * Use inside any `relative isolate overflow-hidden` container that has
 * `bg-[#06092a]` (or similar deep navy) as its base color.
 */
export function SectionBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#13205e_0%,_#0b1240_42%,_#06092a_100%)]" />

      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 78%)",
        }}
      />

      <motion.div
        aria-hidden
        className="absolute -top-40 -left-32 h-[460px] w-[460px] rounded-full bg-[#3b82f6]/18 blur-[150px]"
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.04, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute top-1/3 right-[-12%] h-[560px] w-[560px] rounded-full bg-[#5b8def]/12 blur-[160px]"
        animate={{ opacity: [0.28, 0.45, 0.28], scale: [1, 1.06, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-48 left-1/3 h-[520px] w-[520px] rounded-full bg-[#1a2670]/35 blur-[170px]"
        animate={{ opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Subtle drifting particles */}
      {Array.from({ length: 12 }).map((_, i) => {
        const left = (i * 73) % 100;
        const top = (i * 41) % 100;
        const duration = 8 + (i % 5);
        const delay = (i % 7) * 0.6;
        return (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/30"
            style={{ left: `${left}%`, top: `${top}%` }}
            animate={{ y: [0, -16, 0], opacity: [0.12, 0.45, 0.12] }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }}
          />
        );
      })}
    </div>
  );
}
