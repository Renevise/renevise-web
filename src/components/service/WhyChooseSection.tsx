import {
  Compass,
  Cpu,
  Layers,
  Workflow,
  Sparkles,
  HeartHandshake,
} from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { HeroBackgroundCard } from "@/components/HeroBackgroundCard";

const ITEMS = [
  {
    icon: Compass,
    title: "Consulting Mindset",
    description:
      "We challenge requirements before we build them. The right answer is sometimes a different question.",
  },
  {
    icon: Cpu,
    title: "Engineering Depth",
    description:
      "Senior engineers on every project — no offshoring, no juniors carrying production work alone.",
  },
  {
    icon: Layers,
    title: "Architecture-First",
    description:
      "We invest in foundations: data modelling, boundaries, and contracts that hold up under load.",
  },
  {
    icon: Workflow,
    title: "Repeatable Delivery",
    description:
      "A proven delivery rhythm — discovery, design, build, ship — so timelines stay honest.",
  },
  {
    icon: Sparkles,
    title: "Performance & Polish",
    description:
      "Speed, accessibility, and craft are part of the definition of done, not an afterthought.",
  },
  {
    icon: HeartHandshake,
    title: "Outcome Accountability",
    description:
      "We define KPIs upfront and stay on the hook for them — long after launch.",
  },
];

export function WhyChooseSection() {
  return (
    <section className="bg-surface border-b border-border">
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-6 py-20 md:py-28">
        <FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-12 md:mb-16">
            <div className="lg:col-span-7">
              <span className="text-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-3 block">
                Why Choose Renevise
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-[2.4rem] font-extrabold text-primary leading-[1.1] tracking-tight">
                A different kind of technology partner.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base md:text-lg text-text-muted leading-relaxed">
                We sit between strategy and execution — close enough to your
                team to challenge the brief, disciplined enough to deliver
                production systems that operate at scale.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Staggered card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {ITEMS.map((item, idx) => {
            const Icon = item.icon;
            const isOffset = idx % 2 === 1;
            return (
              <FadeIn key={item.title} delay={Math.min(idx * 0.05, 0.3)} className="h-full">
                <HeroBackgroundCard className={isOffset ? "lg:translate-y-4" : ""}>
                  <div className="p-7 md:p-8">
                    <div className="absolute top-7 right-7 text-[11px] font-bold text-white/40 tracking-widest">
                      0{idx + 1}
                    </div>
                    <div className="w-11 h-11 rounded-theme bg-white/10 text-white flex items-center justify-center mb-5 border border-white/15 transition-[background-color,border-color,transform,box-shadow] duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] group-hover:bg-accent group-hover:border-accent group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_24px_-10px_rgba(59,130,246,0.7)]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[15px] text-white/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </HeroBackgroundCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
