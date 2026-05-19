import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, TrendingUp } from "lucide-react";
import { urlFor } from "@/lib/sanityImage";
import FadeIn from "@/components/animations/FadeIn";
import type { CaseStudy } from "@/types";

interface Props {
  studies: CaseStudy[];
  serviceTitle: string;
}

export function RelatedCaseStudies({ studies, serviceTitle }: Props) {
  if (!studies || studies.length === 0) return null;

  return (
    <section className="bg-white border-b border-border">
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-6 py-20 md:py-28">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-14">
            <div className="max-w-2xl">
              <span className="text-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-3 block">
                Proof of Work
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-[2.4rem] font-extrabold text-primary leading-[1.1] tracking-tight mb-4">
                Selected {serviceTitle.toLowerCase()} engagements.
              </h2>
              <p className="text-base md:text-lg text-text-muted leading-relaxed">
                A few engagements that show how this capability translates into real outcomes.
              </p>
            </div>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-sm font-bold text-accent transition-all duration-200 hover:gap-3 self-start md:self-auto"
            >
              View all case studies
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {studies.map((study, i) => (
            <FadeIn key={study._id} delay={i * 0.08}>
              <Link
                href={study.slug ? `/case-studies/${study.slug}` : "/case-studies"}
                className="group block h-full rounded-card border border-border overflow-hidden bg-white transition-all duration-300 hover:border-accent/40 hover:shadow-[0_14px_44px_rgba(18,25,69,0.10)] hover:-translate-y-0.5"
              >
                {study.image && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={urlFor(study.image).width(960).height(600).url()}
                      alt={study.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent" />

                    {/* Service badge */}
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-[10px] font-bold uppercase tracking-[0.14em] text-primary shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {serviceTitle}
                    </span>
                  </div>
                )}

                <div className="p-6 md:p-7">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-muted mb-2">
                    {study.client}
                  </p>
                  <h3 className="text-lg md:text-xl font-bold text-primary mb-4 leading-snug">
                    {study.title}
                  </h3>

                  {study.result && (
                    <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-theme px-3 py-2 mb-5">
                      <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                      <span className="text-xs font-bold leading-none">
                        {study.result}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm font-semibold text-primary">
                      Read case study
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
