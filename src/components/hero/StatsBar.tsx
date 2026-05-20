"use client";

import { motion } from "motion/react";
import {
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Globe2,
  type LucideIcon,
} from "lucide-react";

export type Stat = { value?: string; label?: string };

type StatsBarProps = { stats?: Stat[] };

type Decoration = { icon: LucideIcon; chip: string };

const fallback: Stat[] = [
  { value: "50+", label: "Projects shipped end-to-end" },
  { value: "12+", label: "Industries served worldwide" },
  { value: "98%", label: "Client retention since 2019" },
  { value: "24/7", label: "Priority support & monitoring" },
];

const decorations: Decoration[] = [
  { icon: CheckCircle2, chip: "DELIVERED" },
  { icon: Globe2, chip: "REACH" },
  { icon: Clock3, chip: "LOYALTY" },
  { icon: BadgeCheck, chip: "ON-CALL" },
];

function splitValue(raw?: string): { head: string; tail: string } {
  if (!raw) return { head: "", tail: "" };
  const match = raw.match(/^([\d.,]+)([^\d].*)?$/);
  if (!match) return { head: raw, tail: "" };
  return { head: match[1], tail: match[2] ?? "" };
}

export function StatsBar({ stats }: StatsBarProps) {
  const items = stats && stats.length > 0 ? stats : fallback;

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
      }}
      className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
    >
      {items.map((s, i) => {
        const { head, tail } = splitValue(s.value);
        const deco = decorations[i % decorations.length];
        const Icon = deco.icon;

        return (
          <motion.div
            key={`${s.label ?? "stat"}-${i}`}
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
              },
            }}
            whileHover={{ y: -3 }}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.08] p-4 backdrop-blur-2xl transition-[transform,box-shadow,border-color] duration-300 hover:border-white/[0.14] sm:p-5"
            style={{
              backgroundImage:
                "linear-gradient(140deg, rgba(24,33,96,0.92) 0%, rgba(15,21,56,0.94) 50%, rgba(8,12,40,0.96) 100%)",
              boxShadow:
                "0 30px 60px -25px rgba(0,0,0,0.55), 0 18px 40px -20px rgba(59,130,246,0.28), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(255,255,255,0.04)",
            }}
          >
            {/* upper-right brand glow lobe */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-14 h-44 w-44 rounded-full bg-[#3b82f6]/28 blur-[70px] opacity-90"
            />
            {/* lower-left ambient lift */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 -left-16 h-44 w-44 rounded-full bg-[#7aa2ff]/14 blur-[80px]"
            />
            {/* hover radial highlight */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(circle at 30% 0%, rgba(122,162,255,0.3), transparent 60%)",
              }}
            />
            {/* hairline top highlight */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
            />

            <div className="relative flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.10] to-white/[0.02] text-[#9bb7ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-6px_12px_-6px_rgba(59,130,246,0.5)]">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              </span>
              <span className="rounded-md border border-white/10 bg-white/[0.05] px-2 py-[3px] text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                {deco.chip}
              </span>
            </div>

            <p className="relative mt-4 text-[2.1rem] font-extrabold leading-none tracking-tight text-white sm:text-[2.4rem]">
              {head}
              {tail && (
                <span className="bg-gradient-to-r from-[#3b82f6] to-[#7aa2ff] bg-clip-text text-transparent">
                  {tail}
                </span>
              )}
            </p>
            <p className="relative mt-2 text-[12.5px] font-medium leading-snug text-white/55">
              {s.label}
            </p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
