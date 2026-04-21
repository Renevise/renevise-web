"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  label?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export function SectionTitle({
  title,
  subtitle,
  label,
  align = "center",
  dark,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      {label && (
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={cn(
            "text-xs font-bold uppercase tracking-widest mb-3 block",
            dark ? "text-blue-400" : "text-accent"
          )}
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={cn(
          "text-3xl md:text-4xl font-bold tracking-tight mb-4",
          dark ? "text-white" : "text-primary"
        )}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className={cn(
            "text-base md:text-lg opacity-80 leading-relaxed font-sans",
            dark ? "text-white/70" : "text-text-muted"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
