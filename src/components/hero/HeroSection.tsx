"use client";

import { useState } from "react";
import { HeroBackground } from "./HeroBackground";
import { HeroContent } from "./HeroContent";
import { HeroVisual } from "./HeroVisual";
import type { Stat } from "./StatsBar";

export type HeroSectionData = {
  heroBadge?: string;
  heroTitle?: string;
  heroTitleHighlight?: string;
  heroSubtitle?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  socialProof?: { rating?: string; count?: string; label?: string };
  stats?: Stat[];
};

type HeroSectionProps = { data?: HeroSectionData | null };

export function HeroSection({ data }: HeroSectionProps) {
  const [resetSignal, setResetSignal] = useState(0);

  return (
    <section
      className="relative isolate flex flex-col overflow-hidden bg-[#06092a] text-white"
      style={{ minHeight: "max(740px, min(100svh, 940px))" }}
    >
      <HeroBackground />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-16 pt-[88px] sm:px-6 md:pb-28 md:pt-[96px] 2xl:max-w-[1400px]">
        <div className="grid flex-1 items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10 xl:gap-14">
          <HeroContent
            badge={data?.heroBadge}
            title={data?.heroTitle}
            titleHighlight={data?.heroTitleHighlight}
            subtitle={data?.heroSubtitle}
            primaryCTA={data?.primaryCTA}
            secondaryCTA={data?.secondaryCTA}
            socialProof={data?.socialProof}
          />

          <div className="relative">
            <HeroVisual
              resetSignal={resetSignal}
              onReset={() => setResetSignal((n) => n + 1)}
            />
          </div>
        </div>
      </div>

      {/* Bottom anchor — keeps the deep navy uniform to the section edge so the
          stats clearly read as inside the hero, not bleeding into the next section. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent via-[#05071f]/60 to-[#04061a]"
      />
    </section>
  );
}
