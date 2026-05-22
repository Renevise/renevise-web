"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Activity,
  BarChart3,
  Bot,
  Check,
  ChevronRight,
  Cpu,
  Files,
  Home,
  LineChart as LineChartIcon,
  MoreHorizontal,
  RotateCcw,
  Sparkles,
  User2,
} from "lucide-react";
import { DraggableCard } from "./DraggableCard";
import { DashboardPanel } from "./DashboardPanel";

type HeroVisualProps = {
  resetSignal: number;
  onReset: () => void;
};

/**
 * Right-side interactive ecosystem — layered dashboard cluster.
 * Compose:
 *  - Project Overview (wide, top-left)
 *  - AI Workflow (tall, top-right)
 *  - Code editor (middle-bottom, left)
 *  - Analytics (tall, bottom-right)
 *  - Performance card (floats over Analytics)
 *  - AI Processing pill (small accent)
 * All draggable with momentum, reset via the hint pill below.
 */
export function HeroVisual({ resetSignal, onReset }: HeroVisualProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const [canDrag, setCanDrag] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const sync = () => setCanDrag(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <div className="relative w-full">
      {/* Orbit rings */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: 360 }}
        transition={{
          opacity: { duration: 1 },
          rotate: { duration: 80, repeat: Infinity, ease: "linear" },
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04]"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, rotate: -360 }}
        transition={{
          opacity: { duration: 1 },
          rotate: { duration: 120, repeat: Infinity, ease: "linear" },
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.03]"
      />

      <div
        ref={constraintsRef}
        className="relative mx-auto aspect-[5/5.2] w-full max-w-[540px]"
      >
        {/* PROJECT OVERVIEW — large primary panel, top-left */}
        <DraggableCard
          constraintsRef={constraintsRef}
          draggable={canDrag}
          resetSignal={resetSignal}
          delay={0.18}
          z={20}
          float={{ y: -4, x: 2, duration: 9 }}
          className="left-[-2%] top-[0%] w-[60%]"
          ariaLabel="Project Overview panel. Drag to reposition."
        >
          <div className="h-[245px]">
            <DashboardPanel />
          </div>
        </DraggableCard>

        {/* AI WORKFLOW — tall panel, top-right */}
        <DraggableCard
          constraintsRef={constraintsRef}
          draggable={canDrag}
          resetSignal={resetSignal}
          delay={0.32}
          z={25}
          float={{ y: 6, x: -3, duration: 8 }}
          initial={{ rotate: -1.5 }}
          className="right-[-3%] top-[3%] w-[42%]"
          ariaLabel="AI Workflow panel. Drag to reposition."
        >
          <AIWorkflowCard />
        </DraggableCard>

        {/* CODE EDITOR — middle-left, overlaps Project Overview bottom */}
        <DraggableCard
          constraintsRef={constraintsRef}
          draggable={canDrag}
          resetSignal={resetSignal}
          delay={0.46}
          z={22}
          float={{ y: -5, x: -3, duration: 10 }}
          initial={{ rotate: 1.2 }}
          className="left-[2%] top-[50%] w-[56%]"
          ariaLabel="Code editor card. Drag to reposition."
        >
          <CodeCard />
        </DraggableCard>

        {/* ANALYTICS — tall panel, bottom-right */}
        <DraggableCard
          constraintsRef={constraintsRef}
          draggable={canDrag}
          resetSignal={resetSignal}
          delay={0.58}
          z={24}
          float={{ y: 4, x: 3, duration: 9 }}
          className="right-[-2%] bottom-[1%] w-[42%]"
          ariaLabel="Analytics panel. Drag to reposition."
        >
          <AnalyticsCard />
        </DraggableCard>

        {/* PERFORMANCE — floats over Analytics top-left */}
        <DraggableCard
          constraintsRef={constraintsRef}
          draggable={canDrag}
          resetSignal={resetSignal}
          delay={0.72}
          z={30}
          float={{ y: -7, x: -4, duration: 7.5 }}
          initial={{ rotate: -2 }}
          className="bottom-[34%] right-[8%] w-[44%]"
          ariaLabel="Performance card. Drag to reposition."
        >
          <PerformanceCard />
        </DraggableCard>

        {/* AI PROCESSING — small pill, decorative accent */}
        <DraggableCard
          constraintsRef={constraintsRef}
          draggable={canDrag}
          resetSignal={resetSignal}
          delay={0.86}
          z={28}
          float={{ y: 6, x: -3, duration: 6 }}
          className="left-[35%] top-[-3%]"
          ariaLabel="AI processing indicator. Drag to reposition."
        >
          <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[rgba(7,14,39,0.78)] px-2.5 py-1.5 shadow-[0_10px_24px_-12px_rgba(59,130,246,0.5)] backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#7aa2ff]/70" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#7aa2ff]" />
            </span>
            <Sparkles className="h-3 w-3 text-[#7aa2ff]" />
            <span className="text-[10px] font-medium text-white/85">
              AI processing
            </span>
          </div>
        </DraggableCard>
      </div>

      {/* Long-press hint + Reset */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.5 }}
        className="mt-3 flex items-center justify-center"
      >
        <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-[rgba(7,14,39,0.6)] py-1 pl-3 pr-1 text-[11px] text-white/55 backdrop-blur-md shadow-[0_8px_24px_-12px_rgba(59,130,246,0.4)]">
          <Sparkles className="h-3 w-3 text-[#7aa2ff]" />
          <span className="hidden sm:inline">Long-press any card to drag</span>
          <span className="sm:hidden">Drag cards</span>
          <button
            type="button"
            onClick={onReset}
            className="group/reset ml-1 inline-flex items-center gap-1 rounded-full bg-white/[0.08] px-2 py-[3px] text-[11px] font-medium text-white/90 transition-[background-color,box-shadow] duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] hover:bg-white/[0.16] hover:shadow-[0_4px_12px_-4px_rgba(122,162,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7aa2ff]/60"
          >
            <RotateCcw className="h-3 w-3 transition-transform duration-[var(--rv-duration-slow)] ease-[var(--rv-ease-out)] group-hover/reset:-rotate-[28deg]" />
            Reset
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ───────────────────────── sub-cards ───────────────────────── */

function AIWorkflowCard() {
  const steps = [
    { icon: User2, label: "User Request", trail: "2.1s", tint: "text-white/70" },
    { icon: Cpu, label: "AI Processing", trail: "4.6s", tint: "text-[#7aa2ff]", active: true },
    { icon: BarChart3, label: "Data Analysis", trail: "live", tint: "text-emerald-300" },
    { icon: Sparkles, label: "Smart Response", trail: <Check className="h-3 w-3 text-emerald-300" />, tint: "text-white/70" },
  ] as const;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#10173f]/95 via-[#0c123a]/95 to-[#070b29]/95 px-3 py-3 shadow-[0_24px_60px_-25px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-12 -right-8 h-32 w-32 rounded-full bg-[#3b82f6]/22 blur-[60px]"
      />
      <p className="relative text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
        AI Workflow
      </p>
      <div className="relative mt-2 space-y-1.5">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className={
                "flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.025] px-2 py-1.5" +
                (("active" in s && s.active) ? " ring-1 ring-[#3b82f6]/40 bg-[#3b82f6]/[0.08]" : "")
              }
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/[0.06]">
                <Icon className={`h-3 w-3 ${s.tint}`} strokeWidth={1.85} />
              </span>
              <span className="text-[10.5px] font-medium text-white/85">
                {s.label}
              </span>
              <span className="ml-auto text-[9.5px] text-white/45">
                {s.trail}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CodeCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0e143b]/95 via-[#0a1032]/95 to-[#060a23]/95 shadow-[0_24px_60px_-25px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-2xl">
      <div className="flex items-center justify-between border-b border-white/[0.06] px-3 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
        </div>
        <div className="flex items-center gap-2 text-[9.5px] text-white/50">
          <Files className="h-3 w-3" />
          <span className="text-white/85">app.py</span>
          <span>models.py</span>
          <span>routes.py</span>
        </div>
      </div>
      <pre className="px-3 py-2.5 font-mono text-[10px] leading-relaxed">
        <code>
          <span className="mr-2 text-white/30">1</span>
          <span className="text-[#7aa2ff]">import</span>{" "}
          <span className="text-white/85">openai</span>
          {"\n"}
          <span className="mr-2 text-white/30">2</span>
          <span className="text-[#7aa2ff]">import</span>{" "}
          <span className="text-white/85">pandas</span>{" "}
          <span className="text-[#7aa2ff]">as</span>{" "}
          <span className="text-white/85">pd</span>
          {"\n"}
          <span className="mr-2 text-white/30">3</span>
          {"\n"}
          <span className="mr-2 text-white/30">4</span>
          <span className="text-[#7aa2ff]">def</span>{" "}
          <span className="text-amber-200">analyze_data</span>
          <span className="text-white/70">(</span>
          <span className="text-white/85">data</span>
          <span className="text-white/70">):</span>
          {"\n"}
          <span className="mr-2 text-white/30">5</span>
          {"  "}
          <span className="text-white/85">response</span>
          <span className="text-white/60"> = </span>
          <span className="text-white/85">openai</span>
          <span className="text-white/60">.</span>
          <span className="text-amber-200">ChatCompletion</span>
          <span className="text-white/60">.</span>
          <span className="text-amber-200">create</span>
          <span className="text-white/70">(</span>
          {"\n"}
          <span className="mr-2 text-white/30">6</span>
          {"    "}
          <span className="text-white/70">model=</span>
          <span className="text-emerald-300">{'"gpt-4"'}</span>
          <span className="text-white/60">,</span>
        </code>
      </pre>
    </div>
  );
}

function AnalyticsCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#10173f]/95 via-[#0c123a]/95 to-[#070b29]/95 shadow-[0_24px_60px_-25px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -right-10 h-32 w-32 rounded-full bg-[#7aa2ff]/15 blur-[60px]"
      />
      {/* phone status */}
      <div className="flex items-center justify-between px-3 pt-2 text-[9px] font-semibold text-white/55">
        <span>5:41</span>
        <div className="flex items-center gap-1 text-white/40">
          <span className="h-1 w-1 rounded-full bg-white/70" />
          <span className="h-1 w-1 rounded-full bg-white/70" />
          <span className="h-1 w-1 rounded-full bg-white/70" />
        </div>
      </div>
      <div className="px-3 pb-2">
        <h4 className="text-[12px] font-semibold text-white">Analytics</h4>
        <div className="mt-2 rounded-lg border border-white/[0.06] bg-white/[0.03] p-2">
          <p className="text-[8.5px] uppercase tracking-wide text-white/45">
            Overview
          </p>
          <div className="flex items-baseline gap-1.5">
            <p className="text-[14px] font-bold text-white">$24,318</p>
            <p className="text-[9px] font-semibold text-emerald-300">+12.5%</p>
          </div>
          <svg viewBox="0 0 120 30" className="mt-1 h-7 w-full">
            <defs>
              <linearGradient id="rv-mini" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7aa2ff" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#7aa2ff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 22 C 15 18, 25 24, 40 16 S 65 8, 80 12 S 100 4, 120 6 L 120 30 L 0 30 Z"
              fill="url(#rv-mini)"
            />
            <path
              d="M 0 22 C 15 18, 25 24, 40 16 S 65 8, 80 12 S 100 4, 120 6"
              fill="none"
              stroke="#7aa2ff"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        <p className="mt-2 text-[8.5px] uppercase tracking-wide text-white/45">
          Top Metrics
        </p>
        <div className="mt-1 space-y-1">
          {[
            { icon: User2, label: "Users", v: "12,540" },
            { icon: Activity, label: "Sessions", v: "24,318" },
            { icon: BarChart3, label: "Conversions" },
          ].map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={i}
                className="flex items-center justify-between rounded-md px-1.5 py-1 text-[9.5px] text-white/70"
              >
                <span className="flex items-center gap-1.5">
                  <Icon className="h-3 w-3 text-[#7aa2ff]" strokeWidth={1.8} />
                  {m.label}
                </span>
                <span className="text-white/45">
                  {m.v ?? <ChevronRight className="h-3 w-3" />}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      {/* bottom nav */}
      <div className="mt-1 flex items-center justify-around border-t border-white/[0.06] px-1.5 py-1.5">
        {[
          { icon: Home, label: "Home", active: true },
          { icon: LineChartIcon, label: "Analytics" },
          { icon: BarChart3, label: "Reports" },
          { icon: MoreHorizontal, label: "More" },
        ].map((n, i) => {
          const Icon = n.icon;
          return (
            <span
              key={i}
              className={`flex flex-col items-center gap-0.5 text-[8px] ${n.active ? "text-[#7aa2ff]" : "text-white/40"}`}
            >
              <Icon className="h-3 w-3" strokeWidth={1.85} />
              {n.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function PerformanceCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#141b48]/95 via-[#0f1538]/95 to-[#080c28]/95 px-3 py-2.5 shadow-[0_28px_60px_-24px_rgba(59,130,246,0.4),0_24px_60px_-25px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-16 -left-8 h-32 w-32 rounded-full bg-[#3b82f6]/30 blur-[60px]"
      />
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-semibold text-white/85">Performance</p>
        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-[#3b82f6] to-[#1e2b7a]">
          <Bot className="h-3 w-3 text-white" />
        </span>
      </div>
      <div className="relative mt-1 flex items-end justify-between gap-2">
        <div>
          <p className="text-[1.4rem] font-extrabold leading-none text-white">
            +26<span className="text-[#7aa2ff]">%</span>
          </p>
          <p className="mt-0.5 text-[9px] text-white/45">vs last month</p>
        </div>
        <div className="flex h-9 items-end gap-0.5">
          {[35, 58, 44, 70, 52, 82, 68, 95].map((h, i) => (
            <motion.span
              key={i}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.5, delay: 0.9 + i * 0.04 }}
              style={{ height: `${h}%`, transformOrigin: "bottom" }}
              className="block w-[3px] rounded-sm bg-gradient-to-t from-[#3b82f6]/50 to-[#7aa2ff]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
