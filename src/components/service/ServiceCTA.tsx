import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { SectionBackground } from "@/components/SectionBackground";

interface Props {
  serviceTitle: string;
}

export function ServiceCTA({ serviceTitle }: Props) {
  return (
    <section className="bg-surface">
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-6 py-20 md:py-28">
        <FadeIn>
          <div className="relative isolate overflow-hidden bg-[#06092a] text-white p-10 md:p-16 lg:p-20 rounded-card shadow-2xl">
            <SectionBackground />

            <div className="relative max-w-3xl">
              <span className="text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-4 block">
                Let&apos;s Build Together
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight mb-5">
                Start your {serviceTitle} engagement.
              </h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-9 max-w-2xl">
                Tell us about your goals, current systems, and where you want to be in 12 months.
                We&apos;ll respond with a tailored plan within two business days.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  href="/contact"
                  className="group rv-btn-primary inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1e2b7a] px-8 py-3.5 text-[15px] font-semibold text-white"
                >
                  <span className="rv-btn-sheen" aria-hidden />
                  <span className="relative">Start a Conversation</span>
                  <ArrowRight className="relative w-4 h-4 transition-transform duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/case-studies"
                  className="rv-btn-ghost inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-theme font-semibold text-[15px] hover:bg-white/[0.18] hover:border-white/30"
                >
                  Explore Our Work
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
