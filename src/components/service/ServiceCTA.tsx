import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";

interface Props {
  serviceTitle: string;
}

export function ServiceCTA({ serviceTitle }: Props) {
  return (
    <section className="bg-surface">
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-6 py-20 md:py-28">
        <FadeIn>
          <div className="relative overflow-hidden bg-gradient-to-br from-primary via-[#1a2260] to-[#1e2b7a] text-white p-10 md:p-16 lg:p-20 rounded-card shadow-2xl">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

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
                  className="inline-flex items-center justify-center gap-2 bg-accent text-white px-8 py-3.5 rounded-theme font-semibold text-[15px] transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
                >
                  Start a Conversation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/case-studies"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-theme font-semibold text-[15px] transition-all duration-300 hover:bg-white/15"
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
