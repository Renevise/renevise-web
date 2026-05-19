import { AlertTriangle, TrendingUp, ArrowUpRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

interface Props {
  problems?: string[];
  outcomes?: string[];
}

export function ProblemsOutcomes({ problems, outcomes }: Props) {
  const hasProblems = problems && problems.length > 0;
  const hasOutcomes = outcomes && outcomes.length > 0;
  if (!hasProblems && !hasOutcomes) return null;

  return (
    <section className="bg-white border-b border-border">
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-6 py-20 md:py-28">
        <FadeIn>
          <div className="max-w-2xl mb-12 md:mb-16">
            <span className="text-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-3 block">
              Where We Move The Needle
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.4rem] font-extrabold text-primary leading-[1.1] tracking-tight mb-4">
              From operational friction to measurable outcomes.
            </h2>
            <p className="text-base md:text-lg text-text-muted leading-relaxed">
              Two sides of the same engagement: the problems we resolve, and
              the strategic outcomes we hold ourselves accountable for.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* PROBLEMS */}
          {hasProblems && (
            <FadeIn>
              <div className="relative h-full rounded-card bg-surface border border-border p-8 md:p-10 overflow-hidden">
                <div
                  aria-hidden
                  className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-amber-100/40 blur-3xl pointer-events-none"
                />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-10 h-10 rounded-theme bg-amber-50 text-amber-600 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-700/80">
                        Problems We Solve
                      </span>
                      <p className="text-xs text-text-muted mt-0.5">
                        Common friction we hear from leadership teams
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3.5">
                    {problems!.map((p, i) => (
                      <li
                        key={i}
                        className="group flex gap-4 items-start p-4 -mx-4 rounded-theme transition-all duration-200 hover:bg-amber-50/40"
                      >
                        <span className="mt-[6px] w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                        <p className="text-[15px] md:text-base text-text-muted italic leading-relaxed group-hover:text-primary transition-colors">
                          {p}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          )}

          {/* OUTCOMES */}
          {hasOutcomes && (
            <FadeIn delay={0.1}>
              <div className="relative h-full rounded-card bg-primary text-white border border-primary p-8 md:p-10 overflow-hidden shadow-xl">
                <div
                  aria-hidden
                  className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-accent/25 blur-3xl pointer-events-none"
                />
                <div
                  aria-hidden
                  className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-accent/10 blur-3xl pointer-events-none"
                />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-10 h-10 rounded-theme bg-accent/20 text-blue-300 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-blue-300">
                        Strategic Outcomes
                      </span>
                      <p className="text-xs text-white/60 mt-0.5">
                        What success looks like at the end of an engagement
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3.5">
                    {outcomes!.map((o, i) => (
                      <li
                        key={i}
                        className="group flex gap-4 items-start p-4 -mx-4 rounded-theme transition-all duration-200 hover:bg-white/[0.04]"
                      >
                        <ArrowUpRight className="w-5 h-5 text-blue-300 mt-0.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        <p className="text-[15px] md:text-base font-semibold text-white leading-relaxed">
                          {o}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
