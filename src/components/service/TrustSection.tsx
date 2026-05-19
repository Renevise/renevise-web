import {
  Gauge,
  ShieldCheck,
  MessagesSquare,
  Rocket,
  Target,
  LineChart,
} from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

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
    <section className="bg-white border-b border-border">
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-6 py-20 md:py-28">
        <FadeIn>
          <div className="max-w-2xl mb-12 md:mb-16">
            <span className="text-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-3 block">
              Why Clients Trust Us
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.4rem] font-extrabold text-primary leading-[1.1] tracking-tight mb-4">
              An engineering partner built for the long term.
            </h2>
            <p className="text-base md:text-lg text-text-muted leading-relaxed">
              We earn trust the way our clients do — through quality, clarity,
              and the discipline to ship what we promised.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <FadeIn key={item.title} delay={Math.min(idx * 0.06, 0.36)}>
                <div className="group h-full p-7 md:p-8 rounded-card bg-surface border border-border transition-all duration-300 hover:bg-white hover:border-accent/40 hover:shadow-[0_8px_30px_rgba(18,25,69,0.06)] hover:-translate-y-0.5">
                  <div className="w-11 h-11 rounded-theme bg-accent/10 text-accent flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-primary mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-text-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
