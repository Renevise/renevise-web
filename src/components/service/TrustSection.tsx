import {
  Gauge,
  ShieldCheck,
  MessagesSquare,
  Rocket,
  Target,
  LineChart,
} from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { HeroBackground } from "@/components/hero/HeroBackground";

const ITEMS = [
  {
    icon: Gauge,
    title: "Performance-First Engineering",
    description:
      "Every system we build is profiled, measured, and tuned — speed and reliability are non-negotiable.",
  },
  {
    icon: ShieldCheck,
    title: "Scalable Architecture",
    description:
      "We design for tomorrow's load today, so your platform grows with your business without rewrites.",
  },
  {
    icon: MessagesSquare,
    title: "Transparent Communication",
    description:
      "Weekly demos, clear status reporting, and a shared backlog — no surprises, ever.",
  },
  {
    icon: Rocket,
    title: "Fast Iteration Cycles",
    description:
      "Short, focused sprints get working software into your hands quickly so we can refine with evidence.",
  },
  {
    icon: Target,
    title: "Business-Focused Solutions",
    description:
      "We start from outcomes, not features. Every decision ties back to a measurable goal you care about.",
  },
  {
    icon: LineChart,
    title: "Long-Term Maintainability",
    description:
      "Clean architecture, documented systems, and tests — the codebase stays healthy after we hand it over.",
  },
];

export function TrustSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#06092a] text-white">
      <HeroBackground />

      <div className="relative max-w-7xl 2xl:max-w-[1400px] mx-auto px-6 py-20 md:py-28">
        <FadeIn>
          <div className="max-w-2xl mb-12 md:mb-16">
            <span className="text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-3 block">
              Why Clients Trust Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.4rem] font-extrabold text-white leading-[1.1] tracking-tight mb-4">
              An engineering partner built for the long term.
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              We earn trust the way our clients do — through quality, clarity,
              and the discipline to ship what we promised.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={Math.min(idx * 0.06, 0.36)} className="h-full">
                <div
                  className="group rv-card-dark relative h-full overflow-hidden rounded-2xl border border-white/[0.08] p-7 md:p-8 backdrop-blur-2xl"
                  style={{
                    backgroundImage:
                      "linear-gradient(140deg, rgba(24,33,96,0.55) 0%, rgba(15,21,56,0.65) 55%, rgba(8,12,40,0.75) 100%)",
                  }}
                >
                  <span className="rv-card-glow" aria-hidden />
                  {/* upper-right brand glow lobe */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-20 -right-14 h-44 w-44 rounded-full bg-[#3b82f6]/22 blur-[70px] opacity-90 transition-opacity duration-[var(--rv-duration-slow)] ease-[var(--rv-ease-out)] group-hover:opacity-100"
                  />
                  {/* hairline top highlight */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />

                  <div className="relative">
                    <div className="w-11 h-11 rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.10] to-white/[0.02] text-[#9bb7ff] flex items-center justify-center mb-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.10),inset_0_-6px_12px_-6px_rgba(59,130,246,0.5)] transition-[color,transform,border-color] duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] group-hover:text-white group-hover:border-white/20 group-hover:-translate-y-0.5">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[15px] text-white/65 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
