import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { urlFor } from "@/lib/sanityImage";
import FadeIn from "@/components/animations/FadeIn";
import ScaleIn from "@/components/animations/ScaleIn";
import { HeroBackground } from "@/components/hero/HeroBackground";

interface ServiceHeroProps {
  title: string;
  tagline?: string;
  description?: string;
  image?: any;
  capabilityLabel?: string;
}

export function ServiceHero({
  title,
  tagline,  
  description,
  image,
  capabilityLabel = "Capability",
}: ServiceHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-[#06092a] text-white">
      <HeroBackground />

      <div className="relative max-w-7xl 2xl:max-w-[1400px] mx-auto px-6 pt-[100px] md:pt-[120px] pb-20 md:pb-28">
        {/* 55 / 45 split on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[11fr_9fr] gap-y-10 lg:gap-x-14 items-center">
          {/* LEFT — content */}
          <div>
            <FadeIn>
              <div className="max-w-[640px]">
                <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7aa2ff]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">
                    {capabilityLabel}
                  </span>
                </div>

                <h1
                  className="font-extrabold mb-4 leading-[1.05] tracking-[-0.015em] text-white"
                  style={{ fontSize: "clamp(2rem, 1.4rem + 2.05vw, 3.25rem)" }}
                >
                  {title}
                </h1>

                {tagline && (
                  <p className="text-lg md:text-xl font-semibold mb-5 leading-snug bg-gradient-to-r from-[#3b82f6] to-[#7aa2ff] bg-clip-text text-transparent">
                    {tagline}
                  </p>
                )}

                {description && (
                  <p className="text-base md:text-[17px] text-white/60 leading-relaxed font-light mb-8">
                    {description}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/contact"
                    className="group rv-btn-primary inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1e2b7a] px-7 py-3.5 text-[15px] font-semibold text-white"
                  >
                    <span className="rv-btn-sheen" aria-hidden />
                    <span className="relative">Start Project</span>
                    <ArrowRight className="relative w-4 h-4 transition-transform duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] group-hover:translate-x-0.5" />
                  </Link>

                  <Link
                    href="/case-studies"
                    className="group rv-btn-ghost inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur-md hover:bg-white/[0.09] hover:border-white/30"
                  >
                    View Related Work
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* RIGHT — image */}
          <div>
            {image ? (
              <ScaleIn>
                <div
                  className="group relative aspect-[5/4] lg:aspect-[5/4] xl:aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 transition-[transform,border-color,box-shadow] duration-[var(--rv-duration-slow)] ease-[var(--rv-ease-out)] hover:-translate-y-1 hover:border-white/20"
                  style={{
                    boxShadow:
                      "0 30px 60px -25px rgba(0,0,0,0.55), 0 18px 40px -20px rgba(59,130,246,0.28), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  <Image
                    src={urlFor(image).width(1000).height(800).url()}
                    alt={title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover will-change-transform transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  {/* Subtle navy gradient overlay to fuse the image into the hero atmosphere */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#06092a]/55 via-[#06092a]/10 to-transparent pointer-events-none" />
                  {/* Inner hairline highlight */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  />
                </div>
              </ScaleIn>
            ) : (
              <div className="aspect-[5/4] rounded-2xl border border-white/10 bg-white/[0.03]" />
            )}
          </div>
        </div>

      </div>

      {/* Bottom anchor — keeps the deep navy uniform to the section edge before the
          light overview section creates the intentional contrast break. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[#05071f]/60 to-[#04061a]"
      />
    </section>
  );
}
