"use client";

import { motion } from "motion/react";
import {
  BadgeCheck,
  CheckCircle2,
  Clock3,
  Globe2,
  type LucideIcon,
} from "lucide-react";
import { StatCard } from "./StatCard";

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
        const deco = decorations[i % decorations.length];

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
          >
            <StatCard
              value={s.value}
              label={s.label}
              icon={deco.icon}
              chip={deco.chip}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
