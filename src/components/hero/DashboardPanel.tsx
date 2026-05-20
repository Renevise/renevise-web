"use client";

import { motion } from "motion/react";
import {
  ChevronDown,
  CircleUserRound,
  Cpu,
  LayoutGrid,
  LineChart as LineChartIcon,
  Settings2,
  Workflow,
} from "lucide-react";

/**
 * "Project Overview" — the central wide panel of the hero visual.
 * Mini sidebar, KPI row, smoothed line chart with a hovering tooltip annotation.
 * Pure CSS / SVG / motion.
 */
export function DashboardPanel() {
  return (
    <div className="relative flex h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#10173f]/95 via-[#0c123a]/95 to-[#070b29]/95 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl">
      {/* ambient blue lobe */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-16 h-56 w-56 rounded-full bg-[#3b82f6]/22 blur-[80px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 right-0 h-56 w-56 rounded-full bg-[#1a2670]/40 blur-[80px]"
      />

      {/* Window header dots */}
      <div className="absolute left-3.5 top-3 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-rose-400/70" />
        <span className="h-2 w-2 rounded-full bg-amber-400/70" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
      </div>

      {/* Mini sidebar */}
      <div className="relative z-[1] flex w-9 flex-col items-center gap-2 border-r border-white/[0.06] py-7">
        {[LayoutGrid, LineChartIcon, Workflow, Cpu, CircleUserRound, Settings2].map(
          (Icon, i) => (
            <span
              key={i}
              className={
                i === 1
                  ? "flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.08] text-[#9bb7ff]"
                  : "flex h-6 w-6 items-center justify-center rounded-md text-white/40 transition-colors hover:text-white/70"
              }
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={1.75} />
            </span>
          )
        )}
      </div>

      {/* Main content */}
      <div className="relative z-[1] flex flex-1 flex-col px-4 pb-3 pt-7">
        <div className="flex items-center justify-between">
          <h3 className="text-[13px] font-semibold tracking-tight text-white">
            Project Overview
          </h3>
          <button
            type="button"
            className="flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[10px] text-white/65 hover:bg-white/[0.06]"
          >
            Last 30 days
            <ChevronDown className="h-3 w-3" />
          </button>
        </div>

        {/* KPI row */}
        <div className="mt-3 grid grid-cols-3 gap-1.5">
          <Kpi label="Total Users" value="24,318" trend="+12.5%" />
          <Kpi label="Revenue" value="$148.2K" trend="+16.8%" />
          <Kpi label="AI Workflows" value="18" trend="+12.5%" />
        </div>

        {/* Line chart */}
        <div className="relative mt-3 flex-1">
          <svg
            viewBox="0 0 320 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <linearGradient id="rv-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="rv-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#7aa2ff" />
              </linearGradient>
              {/* subtle horizontal grid */}
              <pattern
                id="rv-grid"
                width="40"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 20"
                  fill="none"
                  stroke="rgba(255,255,255,0.04)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="320" height="100" fill="url(#rv-grid)" />
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.4, ease: "easeOut" }}
              d="M 0 80 C 40 70, 70 65, 100 55 S 150 40, 180 38 S 230 25, 260 28 S 300 18, 320 22"
              fill="none"
              stroke="url(#rv-line)"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <motion.path
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              d="M 0 80 C 40 70, 70 65, 100 55 S 150 40, 180 38 S 230 25, 260 28 S 300 18, 320 22 L 320 100 L 0 100 Z"
              fill="url(#rv-area)"
            />
            {/* highlighted point */}
            <motion.circle
              cx="180"
              cy="38"
              r="3.5"
              fill="#7aa2ff"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 1.6 }}
            />
            <motion.circle
              cx="180"
              cy="38"
              r="7"
              fill="#7aa2ff"
              opacity="0.25"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.7 }}
            />
          </svg>

          {/* tooltip */}
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.9 }}
            className="absolute left-[52%] top-[6%] -translate-x-1/2 rounded-md border border-white/10 bg-[#0a1130]/90 px-2 py-1 text-center shadow-[0_8px_22px_-8px_rgba(0,0,0,0.6)] backdrop-blur"
          >
            <p className="text-[10px] font-bold text-white">$28,318</p>
            <p className="text-[8.5px] font-semibold text-emerald-300">+12.5%</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Kpi({
  label,
  value,
  trend,
}: {
  label: string;
  value: string;
  trend: string;
}) {
  return (
    <div className="rounded-md border border-white/[0.06] bg-white/[0.025] px-2 py-1.5">
      <p className="text-[8.5px] uppercase tracking-wide text-white/45">
        {label}
      </p>
      <p className="mt-0.5 text-[12.5px] font-bold leading-none text-white">
        {value}
      </p>
      <p className="mt-0.5 text-[8.5px] font-semibold text-emerald-300">
        {trend}
      </p>
    </div>
  );
}
