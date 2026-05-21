import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImage";
import groq from "groq";

export const revalidate = 60;
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
import { SectionBackground } from "@/components/SectionBackground";
import { HeroBackground } from "@/components/hero/HeroBackground";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import ScaleIn from "@/components/animations/ScaleIn";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, siteConfig } from "@/lib/seo";
import type { CaseStudy } from "@/types";

const query = groq`*[_type == "caseStudy" && defined(slug.current)] | order(_createdAt desc){
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
  const caseStudies = await sanityFetch<CaseStudy[]>(query, {}, { tags: ["caseStudy"] });

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
    <div className="pt-[72px]">
      <JsonLd data={caseStudySchema} />

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#06092a] text-white py-24 px-6 md:py-32">
        <SectionBackground />
        <div className="relative max-w-7xl 2xl:max-w-[1400px] mx-auto">
          <FadeIn>
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                Our Impact
              </h1>
              <p className="text-lg text-white/70">
                Real problems. Structured solutions. Measured results.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* GRID */}
      <Section>
        {caseStudies.length === 0 ? (
          <FadeIn>
            <p className="text-center text-text-muted">
              Case studies coming soon.
            </p>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, idx) => (
              <FadeIn key={study._id} delay={idx * 0.08}>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="group block rounded-card border border-border overflow-hidden bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-accent/40"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                    {study.image && (
                      <Image
                        src={urlFor(study.image).width(800).height(600).url()}
                        alt={study.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                    )}
                  </div>

                  <div className="p-6">
                    {study.serviceTitle && (
                      <span className="text-accent text-[10px] font-bold uppercase tracking-widest block mb-3">
                        {study.serviceTitle}
                      </span>
                    )}
                    <h2 className="text-lg md:text-xl font-bold text-primary leading-snug transition-colors duration-300 group-hover:text-accent">
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
      <Section className="text-center pt-0 pb-32">
        <ScaleIn>
          <div className="relative isolate max-w-xl mx-auto p-12 rounded-card border border-white/10 bg-[#06092a] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            style={{
              boxShadow:
                "0 18px 40px -20px rgba(0,0,0,0.55), 0 10px 30px -18px rgba(59,130,246,0.28), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}>
            <HeroBackground />
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white mb-4">
                Ready to be our next success story?
              </h3>

              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1e2b7a] px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(59,130,246,0.65)] transition-all duration-300 hover:shadow-[0_18px_40px_-10px_rgba(59,130,246,0.85)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="relative">Get in touch to discuss your project</span>
                <ArrowRight className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </ScaleIn>
      </Section>
    </div>
  );
}
