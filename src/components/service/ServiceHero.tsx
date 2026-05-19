import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { urlFor } from "@/lib/sanityImage";
import FadeIn from "@/components/animations/FadeIn";
import ScaleIn from "@/components/animations/ScaleIn";

interface ServiceHeroProps {
  title: string;
  tagline?: string;
  description?: string;
  image?: any;
  capabilityLabel?: string;
}

const TRUST_METRICS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "12+", label: "Industries Served" },
  { value: "98%", label: "Client Retention" },
  { value: "24/7", label: "Priority Support" },
];

export function ServiceHero({
  title,
  tagline,
  description,
  image,
  capabilityLabel = "Capability",
}: ServiceHeroProps) {
  return (
    <section className="relative bg-surface border-b border-border">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_15%,rgba(59,130,246,0.08),transparent_55%)]"
      />

      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-6 pt-8 md:pt-12 lg:pt-14 pb-12 md:pb-16">
        {/* 55 / 45 split on desktop — explicit fr ratio prevents column collapse */}
        <div className="grid grid-cols-1 lg:grid-cols-[11fr_9fr] gap-y-10 lg:gap-x-14 items-center">
          {/* LEFT — content */}
          <div>
            <FadeIn>
              <div className="max-w-[640px]">
                <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white border border-border">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-text-muted">
                    {capabilityLabel}
                  </span>
                </div>

                <h1 className="text-[clamp(2rem,3.4vw,3.25rem)] font-extrabold text-primary mb-4 leading-[1.08] tracking-tight">
                  {title}
                </h1>

                {tagline && (
                  <p className="text-lg md:text-xl text-accent font-semibold mb-5 leading-snug">
                    {tagline}
                  </p>
                )}

                {description && (
                  <p className="text-base md:text-[17px] text-text-muted leading-relaxed font-light mb-8">
                    {description}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-accent text-white px-7 py-3.5 rounded-theme font-semibold text-[15px] transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                  >
                    Start Project
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    href="/case-studies"
                    className="inline-flex items-center justify-center gap-2 bg-white text-primary border border-border px-7 py-3.5 rounded-theme font-semibold text-[15px] transition-all duration-300 hover:border-accent hover:text-accent"
                  >
                    View Related Work
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT — image */}
          <div>
            {image ? (
              <ScaleIn>
                <div className="relative aspect-[5/4] lg:aspect-[5/4] xl:aspect-[4/3] rounded-card overflow-hidden border border-border shadow-[0_20px_50px_-20px_rgba(18,25,69,0.25)]">
                  <Image
                    src={urlFor(image).width(1000).height(800).url()}
                    alt={title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent pointer-events-none" />
                </div>
              </ScaleIn>
            ) : (
              <div className="aspect-[5/4] rounded-card bg-white border border-border" />
            )}
          </div>
        </div>

        {/* TRUST METRICS */}
        <FadeIn delay={0.15}>
          <div className="mt-12 md:mt-14 grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-border bg-white rounded-card border border-border overflow-hidden">
            {TRUST_METRICS.map((m, i) => (
              <div
                key={m.label}
                className={`px-6 py-5 md:py-6 flex flex-col justify-center ${
                  i % 2 === 1 ? "border-l border-border lg:border-l-0" : ""
                }`}
              >
                <span className="text-2xl md:text-3xl font-extrabold text-primary leading-none tracking-tight">
                  {m.value}
                </span>
                <span className="mt-2 text-[11px] md:text-xs font-semibold uppercase tracking-[0.14em] text-text-muted">
                  {m.label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
