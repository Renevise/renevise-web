import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImage";
import groq from "groq";

export const revalidate = 60;

import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { DarkSection } from "@/components/DarkSection";
import { HeroBackground } from "@/components/hero/HeroBackground";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import ScaleIn from "@/components/animations/ScaleIn";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, siteConfig } from "@/lib/seo";
import type { CaseStudy } from "@/types";

const query = groq`*[
  _type == "caseStudy"
  && defined(slug.current)
  && !(_id in path("drafts.**"))
] | order(_createdAt desc){
  _id,
  title,
  client,
  "slug": slug.current,
  image,
  "serviceTitle": service->title
}`;

export const metadata: Metadata = buildMetadata({
  title: "Case Studies — Proven Results",
  description:
    "See how Renevise has delivered measurable outcomes for enterprise clients across web, mobile, and AI projects. Real problems. Structured solutions. Quantified results.",
  path: "/case-studies",
});

export default async function CaseStudies() {
  const raw = await sanityFetch<CaseStudy[]>(query, {}, { tags: ["caseStudy"] });
  // Sanity's `perspective: "published"` already hides drafts, but defensively
  // strip anything missing the required public fields so we never render a
  // broken card or a link to `/case-studies/undefined`.
  const caseStudies = (raw ?? []).filter(
    (s): s is CaseStudy & { slug: string } =>
      Boolean(s && s.slug && s.title)
  );

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Renevise Case Studies",
    url: `${siteConfig.url}/case-studies`,
    itemListElement: caseStudies.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: c.title,
        url: c.slug ? `${siteConfig.url}/case-studies/${c.slug}` : undefined,
        creator: {
          "@type": "Organization",
          name: siteConfig.name,
        },
      },
    })),
  };

  return (
    <div>
      <JsonLd data={caseStudySchema} />

      {/* HERO */}
      <DarkSection
        className="border-b border-white/10"
        innerClassName="pt-[120px] md:pt-[140px] pb-20 md:pb-24"
        withBottomAnchor
      >
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7aa2ff]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">
                Proven Results
              </span>
            </div>
            <h1
              className="font-extrabold mb-5 leading-[1.05] tracking-[-0.015em] text-white"
              style={{ fontSize: "clamp(2.25rem, 1.4rem + 2.6vw, 3.75rem)" }}
            >
              Our Impact
            </h1>
            <p className="text-base md:text-[17px] text-white/65 leading-relaxed font-light max-w-2xl mx-auto">
              Real problems. Structured solutions. Measured results.
            </p>
          </div>
        </FadeIn>
      </DarkSection>

      {/* GRID */}
      <Section>
        {caseStudies.length === 0 ? (
          <FadeIn>
            <p className="text-center text-text-muted">
              Case studies coming soon.
            </p>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {caseStudies.map((study, idx) => (
              <FadeIn key={study._id} delay={idx * 0.08} className="h-full">
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group rv-card relative isolate flex h-full flex-col overflow-hidden rounded-card border border-border bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2"
                >
                  <span className="rv-card-glow" aria-hidden />
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                    {study.image && (
                      <Image
                        src={urlFor(study.image).width(800).height(600).url()}
                        alt={study.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover will-change-transform transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
                      />
                    )}
                    {/* Gradient overlay that fades in for content readability + premium depth */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/55 via-primary/10 to-transparent opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
                    />
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    {study.serviceTitle && (
                      <span className="text-accent text-[10px] font-bold uppercase tracking-widest block mb-3 transition-opacity duration-300 group-hover:opacity-90">
                        {study.serviceTitle}
                      </span>
                    )}
                    <h2 className="text-lg md:text-xl font-bold text-primary leading-snug transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-accent">
                      {study.title}
                    </h2>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </Section>

      {/* FINAL CTA */}
      <section className="bg-surface">
        <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-6 py-20 md:py-28">
          <ScaleIn>
            <div className="relative isolate overflow-hidden bg-[#06092a] text-white p-10 md:p-16 lg:p-20 rounded-card shadow-2xl">
              <HeroBackground />
              <div className="relative max-w-3xl mx-auto text-center">
                <span className="text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-4 block">
                  Let&apos;s Build Together
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight mb-5">
                  Ready to be our next success story?
                </h2>
                <p className="text-white/70 text-base md:text-lg leading-relaxed mb-9 max-w-xl mx-auto">
                  Tell us about your goals and we&apos;ll respond with a tailored plan within two business days.
                </p>
                <Link
                  href="/contact"
                  className="group rv-btn-primary inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1e2b7a] px-8 py-3.5 text-[15px] font-semibold text-white"
                >
                  <span className="rv-btn-sheen" aria-hidden />
                  <span className="relative">Start a Conversation</span>
                  <ArrowRight className="relative w-4 h-4 transition-transform duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>
    </div>
  );
}
