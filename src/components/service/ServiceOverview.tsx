import { PortableText, type PortableTextBlock } from "next-sanity";
import FadeIn from "@/components/animations/FadeIn";
import { CapabilityIllustration } from "./CapabilityIllustration";
import { HeroBackgroundCard } from "@/components/HeroBackgroundCard";
import { overviewPortableText } from "./portableText";
import type { ServiceCapability } from "@/types";

interface ServiceOverviewProps {
  heading?: string;
  serviceTitle: string;
  overview?: PortableTextBlock[];
  capabilities?: ServiceCapability[];
  illustrationVariant?: "web" | "mobile" | "ai" | "default";
}

export function ServiceOverview({
  heading,
  serviceTitle,
  overview,
  capabilities,
  illustrationVariant = "default",
}: ServiceOverviewProps) {
  const hasOverview = overview && overview.length > 0;
  const hasCapabilities = capabilities && capabilities.length > 0;

  if (!hasOverview && !hasCapabilities) return null;

  return (
    <section className="relative bg-white border-b border-border">
      {/* Soft accent wash to keep the light section feeling premium, not flat */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_12%,rgba(59,130,246,0.06),transparent_55%),radial-gradient(circle_at_8%_92%,rgba(122,162,255,0.05),transparent_55%)]"
      />

      <div className="relative max-w-7xl 2xl:max-w-[1400px] mx-auto px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-12 lg:gap-16 items-center">
          {/* LEFT — heading + long form text */}
          <div className="min-w-0 w-full">
            <FadeIn>
              <span className="text-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-4 block">
                What We Can Do For You
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary leading-[0.95] tracking-tight mb-8 max-w-[700px]">
                {heading ?? `End-to-end ${serviceTitle} built for measurable business impact.`}
              </h2>

              {hasOverview ? (
                <div className="max-w-[640px]">
                  <PortableText value={overview!} components={overviewPortableText} />
                </div>
              ) : (
                <p className="text-text-muted text-base md:text-[17px] leading-relaxed max-w-[640px]">
                  Our team partners with you across discovery, design, engineering,
                  and rollout — delivering enterprise-grade {serviceTitle.toLowerCase()} solutions
                  built around your operational and growth goals.
                </p>
              )}
            </FadeIn>
          </div>

          {/* RIGHT — illustration (self-contained dark card sitting on the light section) */}
          <div className="min-w-0 w-full lg:max-w-[520px] lg:ml-auto">
            <FadeIn delay={0.1}>
              <CapabilityIllustration variant={illustrationVariant} />
            </FadeIn>
          </div>
        </div>

        {/* CAPABILITY GRID */}
        {hasCapabilities && (
          <div className="mt-16 md:mt-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px flex-1 bg-border" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-muted">
                Core Capabilities
              </span>
              <span className="h-px flex-1 bg-border" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {capabilities!.map((cap, idx) => (
                <FadeIn key={cap.title} delay={Math.min(idx * 0.05, 0.3)}>
                  <HeroBackgroundCard>
                    <div className="p-6">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="mt-1 w-2 h-2 rounded-full bg-[#7aa2ff] shrink-0 transition-transform duration-300 group-hover:scale-150" />
                        <h3 className="text-lg font-semibold text-white leading-snug">
                          {cap.title}
                        </h3>
                      </div>
                      {cap.description && (
                        <p className="text-sm md:text-[15px] text-white/70 leading-relaxed pl-5">
                          {cap.description}
                        </p>
                      )}
                    </div>
                  </HeroBackgroundCard>
                </FadeIn>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
