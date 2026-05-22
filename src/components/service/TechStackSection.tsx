import FadeIn from "@/components/animations/FadeIn";
import { HeroBackgroundCard } from "@/components/HeroBackgroundCard";
import type { TechnologyCategory } from "@/types";

interface Props {
  categories?: TechnologyCategory[];
}

export function TechStackSection({ categories }: Props) {
  if (!categories || categories.length === 0) return null;

  // Flat list of every tech, used for the top marquee strip
  const allTech = categories.flatMap((c) => c.technologies);

  return (
    <section className="bg-surface border-b border-border">
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-6 py-20 md:py-28">
        <FadeIn>
          <div className="max-w-2xl mb-12 md:mb-14">
            <span className="text-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-3 block">
              Technology Stack
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.4rem] font-extrabold text-primary leading-[1.1] tracking-tight mb-4">
              Best-in-class tools, chosen for fit.
            </h2>
            <p className="text-base md:text-lg text-text-muted leading-relaxed">
              We pick technologies for longevity and team velocity — never for novelty.
            </p>
          </div>
        </FadeIn>

        {/* Marquee strip */}
        {allTech.length > 6 && (
          <FadeIn delay={0.05}>
            <div className="relative mb-10 md:mb-14 overflow-hidden rounded-card border border-border bg-white py-4">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10"
              />
              <div
                className="rv-marquee-left flex w-max gap-3"
                style={{ ["--rv-marquee-duration" as any]: "55s" }}
              >
                {[...allTech, ...allTech].map((tech, i) => (
                  <span
                    key={`${tech}-${i}`}
                    className="px-4 py-2 rounded-full bg-white border border-border text-sm font-semibold text-text-muted whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        {/* Grouped categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 items-stretch">
          {categories.map((cat, idx) => (
            <FadeIn key={cat.title} delay={Math.min(idx * 0.06, 0.36)} className="h-full">
              <HeroBackgroundCard>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-8 h-8 rounded-theme bg-accent/15 text-[#7aa2ff] text-xs font-bold flex items-center justify-center border border-white/10">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-wide">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.technologies.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1.5 bg-white/[0.06] border border-white/15 text-[12px] font-semibold text-white/80 rounded-theme backdrop-blur-sm transition-[background-color,color,border-color,transform,box-shadow] duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] hover:-translate-y-0.5 hover:bg-accent hover:text-white hover:border-accent hover:shadow-[0_8px_18px_-8px_rgba(59,130,246,0.55)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </HeroBackgroundCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
