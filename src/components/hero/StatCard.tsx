"use client";

import type { LucideIcon } from "lucide-react";

export type StatCardProps = {
  value?: string;
  label?: string;
  icon?: LucideIcon;
  chip?: string;
  className?: string;
};

function splitValue(raw?: string): { head: string; tail: string } {
  if (!raw) return { head: "", tail: "" };
  const match = raw.match(/^([\d.,]+)([^\d].*)?$/);
  if (!match) return { head: raw, tail: "" };
  return { head: match[1], tail: match[2] ?? "" };
}

/**
 * Premium dark glass stat card — the single source of truth for the
 * "homepage hero stat" visual treatment. Used by the homepage hero
 * `StatsBar`, the service detail hero, and the about page floating stat.
 *
 * The optional `icon` + `chip` slots are header decorations; when omitted
 * the card collapses to a clean value + label layout used by the about
 * floating stat.
 */
export function StatCard({
  value,
  label,
  icon: Icon,
  chip,
  className,
}: StatCardProps) {
  const { head, tail } = splitValue(value);
  const hasHeader = Boolean(Icon || chip);

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] p-4 backdrop-blur-2xl transition-[transform,box-shadow,border-color] duration-300 hover:border-white/[0.14] sm:p-5 ${className ?? ""}`}
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

      {hasHeader && (
        <div className="relative flex items-center justify-between">
          {Icon ? (
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.10] to-white/[0.02] text-[#9bb7ff] shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-6px_12px_-6px_rgba(59,130,246,0.5)]">
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </span>
          ) : (
            <span />
          )}
          {chip ? (
            <span className="rounded-md border border-white/10 bg-white/[0.05] px-2 py-[3px] text-[9.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
              {chip}
            </span>
          ) : null}
        </div>
      )}

      <p
        className={`relative text-[2.1rem] font-extrabold leading-none tracking-tight text-white sm:text-[2.4rem] ${hasHeader ? "mt-4" : ""}`}
      >
        {head}
        {tail && (
          <span className="bg-gradient-to-r from-[#3b82f6] to-[#7aa2ff] bg-clip-text text-transparent">
            {tail}
          </span>
        )}
      </p>
      {label && (
        <p className="relative mt-2 text-[12.5px] font-medium leading-snug text-white/55">
          {label}
        </p>
      )}
    </div>
  );
}
