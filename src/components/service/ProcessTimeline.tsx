import FadeIn from "@/components/animations/FadeIn";
import { SectionBackground } from "@/components/SectionBackground";

interface Step {
  number: string;
  title: string;
  description: string;
}

export type ProcessVariant = "web" | "mobile" | "ai" | "default";

const STEPS: Record<ProcessVariant, Step[]> = {
  web: [
    {
      number: "01",
      title: "Discovery",
      description:
        "Stakeholder workshops and a system audit to align scope with measurable business outcomes.",
    },
    {
      number: "02",
      title: "Architecture Planning",
      description:
        "Data model, API contracts, and infrastructure topology — documented before code is written.",
    },
    {
      number: "03",
      title: "UI/UX Design",
      description:
        "Information architecture and high-fidelity design, validated through interactive prototypes.",
    },
    {
      number: "04",
      title: "Full-Stack Development",
      description:
        "Senior engineers build in two-week sprints with continuous demos and a transparent backlog.",
    },
    {
      number: "05",
      title: "QA & Optimization",
      description:
        "Automated tests, accessibility audits, and load profiling against committed performance targets.",
    },
    {
      number: "06",
      title: "Deployment",
      description:
        "Controlled rollouts with observability instrumented from day one and a clean team handover.",
    },
    {
      number: "07",
      title: "Growth & Maintenance",
      description:
        "Ongoing performance tuning, feature evolution, and SLOs we hold ourselves accountable to.",
    },
  ],
  mobile: [
    {
      number: "01",
      title: "Product Discovery",
      description:
        "Goals, user journeys, and platform priorities scoped against the outcomes you care about.",
    },
    {
      number: "02",
      title: "Wireframing",
      description:
        "Low-fidelity flows that lock down navigation and core interactions before visual design begins.",
    },
    {
      number: "03",
      title: "Mobile UI Design",
      description:
        "Native-feeling interfaces aligned to iOS and Android conventions, with motion and a11y baked in.",
    },
    {
      number: "04",
      title: "App Development",
      description:
        "Cross-functional sprints across iOS, Android, and backend with weekly internal test builds.",
    },
    {
      number: "05",
      title: "Device Testing",
      description:
        "Real-device QA across screen sizes, OS versions, and network conditions — not just emulators.",
    },
    {
      number: "06",
      title: "Store Deployment",
      description:
        "App Store and Play Console submission, review responses, and phased rollouts to production.",
    },
    {
      number: "07",
      title: "Scaling & Support",
      description:
        "Crash analytics, performance budgets, and quarterly release trains as your user base grows.",
    },
  ],
  ai: [
    {
      number: "01",
      title: "Brand Research",
      description:
        "Voice, audience, and visual identity captured as guardrails for every asset we produce.",
    },
    {
      number: "02",
      title: "Content Strategy",
      description:
        "Channel plan, cadence, and content pillars mapped against growth and conversion goals.",
    },
    {
      number: "03",
      title: "AI Asset Generation",
      description:
        "Production at scale across video, image, and voice using best-in-class models and pipelines.",
    },
    {
      number: "04",
      title: "Editing & Refinement",
      description:
        "Human-in-the-loop review, color grading, and on-brand polish before anything ships.",
    },
    {
      number: "05",
      title: "Social Optimization",
      description:
        "Format, length, and hook variants tuned per platform — Reels, Shorts, TikTok, X, LinkedIn.",
    },
    {
      number: "06",
      title: "Publishing Workflow",
      description:
        "Scheduling, approvals, and asset libraries integrated into your existing operating cadence.",
    },
    {
      number: "07",
      title: "Performance Iteration",
      description:
        "Engagement, retention, and conversion data feed the next sprint of content decisions.",
    },
  ],
  default: [
    {
      number: "01",
      title: "Discovery",
      description:
        "Workshops and audits to align scope with the business outcomes you actually care about.",
    },
    {
      number: "02",
      title: "Strategy",
      description:
        "A phased roadmap with measurable milestones, scope guardrails, and a delivery plan.",
    },
    {
      number: "03",
      title: "Design",
      description:
        "Information architecture and high-fidelity design validated with prototypes before code.",
    },
    {
      number: "04",
      title: "Development",
      description:
        "Senior teams build in short sprints with continuous demos and a transparent backlog.",
    },
    {
      number: "05",
      title: "Testing",
      description:
        "Automated tests, accessibility checks, and load profiling — production-readiness, not optimism.",
    },
    {
      number: "06",
      title: "Deployment",
      description:
        "Controlled rollouts, observability instrumented from day one, and a clean handover.",
    },
    {
      number: "07",
      title: "Optimization",
      description:
        "We tune the system against the outcomes we committed to upfront — long after launch.",
    },
  ],
};

interface Props {
  variant?: ProcessVariant;
}

export function ProcessTimeline({ variant = "default" }: Props) {
  const steps = STEPS[variant];

  return (
    <section className="relative isolate bg-[#06092a] text-white overflow-hidden">
      <SectionBackground />

      <div className="relative max-w-7xl 2xl:max-w-[1400px] mx-auto px-6 py-20 md:py-28">
        <FadeIn>
          <div className="max-w-2xl mb-14 md:mb-20">
            <span className="text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-3 block">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.4rem] font-extrabold leading-[1.1] tracking-tight mb-4">
              A disciplined path from idea to outcome.
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              The same seven-stage rhythm runs through every engagement —
              tuned to the specifics of your team, scope, and stakes.
            </p>
          </div>
        </FadeIn>

        {/* DESKTOP — connected horizontal timeline */}
        <div className="hidden lg:block relative">
          <div
            aria-hidden
            className="absolute top-[34px] left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
          />
          <div className="grid grid-cols-7 gap-x-5 xl:gap-x-7">
            {steps.map((s, i) => (
              <FadeIn key={s.number} delay={Math.min(i * 0.04, 0.28)}>
                <div className="relative">
                  <div className="relative flex justify-center mb-7">
                    <span className="relative z-10 w-[68px] h-[68px] rounded-full bg-primary border border-blue-400/40 flex items-center justify-center text-blue-300 font-mono font-bold text-lg shadow-[0_0_0_4px_rgba(18,25,69,1)]">
                      {s.number}
                    </span>
                  </div>
                  <h3 className="text-[15px] xl:text-base font-bold mb-2 text-white leading-snug tracking-tight">
                    {s.title}
                  </h3>
                  <p className="text-[13px] xl:text-[13.5px] text-white/65 leading-relaxed">
                    {s.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* MOBILE / TABLET — vertical timeline */}
        <div className="lg:hidden relative pl-12">
          <div
            aria-hidden
            className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-blue-400/40 via-blue-400/15 to-transparent"
          />
          <ol className="space-y-8">
            {steps.map((s, i) => (
              <FadeIn key={s.number} delay={Math.min(i * 0.04, 0.28)}>
                <li className="relative">
                  <span className="absolute -left-12 top-0 w-10 h-10 rounded-full bg-primary border border-blue-400/40 flex items-center justify-center text-blue-300 font-mono font-bold text-[11px]">
                    {s.number}
                  </span>
                  <h3 className="text-base md:text-lg font-bold mb-1.5 text-white leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed">
                    {s.description}
                  </p>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
