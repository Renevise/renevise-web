import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImage";
import groq from "groq";

export const revalidate = 60;
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import ServicesGrid from "@/components/ServicesGrid";

export const metadata: Metadata = buildMetadata({
  title: "Renevise | Web Development, AI Automation & Digital Solutions",
  description:
    "Renevise helps businesses grow through custom web development, AI automation, software solutions, and digital transformation services.",
  path: "/",
});
import { Section, SectionTitle } from "@/components/Section";
import Link from "next/link";
import ProcessSectionWrapper from "@/components/ProcessSectionWrapper";
import FadeIn from "@/components/animations/FadeIn";
import ScaleIn from "@/components/animations/ScaleIn";
import { HeroSection } from "@/components/hero/HeroSection";
import { StatsBar } from "@/components/hero/StatsBar";
import { SectionBackground } from "@/components/SectionBackground";
import { HeroBackground } from "@/components/hero/HeroBackground";
import { Quote } from "lucide-react";

// QUERIES
const homeQuery = groq`*[_type == "home"][0]{
  heroBadge,
  heroTitle,
  heroTitleHighlight,
  heroSubtitle,
  primaryCTA,
  secondaryCTA,
  socialProof,
  stats,
  ctaTitle,
  ctaSubtitle
}`;

const servicesQuery = groq`*[_type == "service"][0...3]{
  _id,
  title,
  description,
  icon,
  image,
  techTags,
  "slug": slug.current,
}`;

const caseStudiesQuery = groq`*[_type == "caseStudy"][0...2]{
  _id,
  title,
  client,
  result,
  image
}`;

const testimonialsQuery = groq`*[_type == "testimonial"][0...2]{
  _id,
  name,
  role,
  company,
  content,
  image
}`;

export default async function Home() {
  const [data, services, caseStudies, testimonials] = await Promise.all([
    sanityFetch<any>(homeQuery, {}, { tags: ["home"] }),
    sanityFetch<any[]>(servicesQuery, {}, { tags: ["service"] }),
    sanityFetch<any[]>(caseStudiesQuery, {}, { tags: ["caseStudy"] }),
    sanityFetch<any[]>(testimonialsQuery, {}, { tags: ["testimonial"] }),
  ]);

  return (
    <div>

      {/* HERO — extends to the very top so the navbar floats on the dark gradient */}
      <HeroSection data={data} />

      {/* STATS — floats across the hero/services boundary (md+); stacks naturally on mobile */}
      <div className="relative z-20 px-5 sm:px-6 md:-mt-[88px] lg:-mt-[96px]">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1400px]">
          <StatsBar stats={data?.stats} />
        </div>
      </div>

      {/* SERVICES */}
      <Section className="bg-surface pt-16 md:pt-24">
        <SectionTitle
          label="Expertise"
          title="Industry-Leading Expertise"
          subtitle="We build high-performance tools optimized for scalability and performance."
        />

        <FadeIn>
          <ServicesGrid services={services} />
        </FadeIn>

        {/* <FadeIn>
          <div className="flex justify-center mt-12">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 px-8 py-3 rounded-theme border border-accent text-accent font-bold transition-all duration-300 hover:bg-accent hover:text-white"
            >
              Show More
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn> */}
      </Section>

      {/* Process Section */}
      <section className="relative isolate overflow-hidden bg-[#06092a] text-white py-24 px-6 md:py-32">
        <SectionBackground />
        <div className="relative max-w-7xl 2xl:max-w-[1400px] mx-auto">
          <SectionTitle
            dark
            title="Our Structured Approach"
            subtitle="Positioning reliability as the core of every partnership. Our repeatable process guarantees quality at scale."
          />
          <ProcessSectionWrapper />
        </div>
      </section>



      {/* CASE STUDIES */}
      <Section>
        <SectionTitle
          label="Case Studies"
          title="Measurable Impact"
          subtitle="Explore how we transform businesses."
        />
        {caseStudies.length === 0 ? (
          <FadeIn>
            <p className="text-center text-text-muted">
              Case studies coming soon.
            </p>
          </FadeIn>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {caseStudies.map((c: any, idx: number) => (
              <ScaleIn key={c._id} delay={idx * 0.1} className="h-full">
                <div className="group rv-card relative isolate flex h-full flex-col overflow-hidden rounded-card border border-border bg-white">
                  <span className="rv-card-glow" aria-hidden />
                  <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                    {c.image && (
                      <Image
                        src={urlFor(c.image).url()}
                        alt={c.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover will-change-transform transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
                      />
                    )}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/55 via-primary/10 to-transparent opacity-0 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7 md:p-8">
                    {c.client && (
                      <span className="text-accent text-[10px] font-bold uppercase tracking-widest mb-3 block">
                        {c.client}
                      </span>
                    )}
                    <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 leading-snug transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:text-accent">
                      {c.title}
                    </h3>
                    {c.result && (
                      <p className="text-text-muted italic leading-relaxed mt-auto">
                        &ldquo;{c.result}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              </ScaleIn>
            ))}
          </div>
        )}
      </Section>

      {/* TESTIMONIALS */}
      <section className="relative isolate overflow-hidden bg-[#06092a] text-white">
        <HeroBackground />

        <div className="relative max-w-7xl 2xl:max-w-[1400px] mx-auto px-6 py-24 md:py-32">
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <span className="text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-3 block">
              Client Trust
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[2.4rem] font-extrabold leading-[1.1] tracking-tight text-white mb-4">
              Trusted by ambitious teams
            </h2>
            <p className="text-base md:text-lg text-white/70 leading-relaxed">
              Reliable solutions for decision makers who need outcomes, not buzzwords.
            </p>
          </div>

          {testimonials.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-stretch">
              {testimonials.map((t: any, idx: number) => (
                <ScaleIn key={t._id} delay={idx * 0.08} className="h-full">
                  <figure
                    className="group rv-card-dark relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] p-8 md:p-10 backdrop-blur-2xl"
                    style={{
                      backgroundImage:
                        "linear-gradient(140deg, rgba(24,33,96,0.55) 0%, rgba(15,21,56,0.65) 55%, rgba(8,12,40,0.75) 100%)",
                    }}
                  >
                    <span className="rv-card-glow" aria-hidden />
                    {/* upper-right brand glow lobe */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -top-20 -right-14 h-44 w-44 rounded-full bg-[#3b82f6]/22 blur-[70px] opacity-90 transition-opacity duration-[var(--rv-duration-slow)] ease-[var(--rv-ease-out)] group-hover:opacity-100"
                    />
                    {/* hairline top highlight */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    />

                    <Quote
                      aria-hidden
                      className="absolute right-7 top-7 w-9 h-9 text-[#7aa2ff]/25 transition-[color,transform] duration-[var(--rv-duration-slow)] ease-[var(--rv-ease-out)] group-hover:text-[#7aa2ff]/45 group-hover:rotate-[-6deg]"
                      strokeWidth={1.5}
                    />

                    <div
                      aria-hidden
                      className="relative mb-6 h-[2px] w-10 rounded-full bg-gradient-to-r from-[#7aa2ff] to-[#7aa2ff]/0 transition-[width] duration-[var(--rv-duration-slow)] ease-[var(--rv-ease-out)] group-hover:w-16"
                    />

                    <blockquote className="relative flex-1">
                      <p className="text-[17px] md:text-[18px] text-white/85 leading-relaxed font-normal">
                        &ldquo;{t.content}&rdquo;
                      </p>
                    </blockquote>

                    <figcaption className="relative mt-8 flex items-center gap-4 pt-6 border-t border-white/10">
                      {t.image ? (
                        <Image
                          src={urlFor(t.image).url()}
                          alt={t.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full border border-white/15 object-cover shadow-[0_4px_12px_-4px_rgba(0,0,0,0.45)]"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full border border-white/15 bg-gradient-to-br from-white/[0.10] to-white/[0.02] flex items-center justify-center text-[#9bb7ff] font-bold text-sm shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.10),0_4px_12px_-4px_rgba(59,130,246,0.35)]">
                          {t.name?.[0]}
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="font-semibold text-white leading-tight">
                          {t.name}
                        </div>
                        <div className="text-white/60 text-sm leading-tight mt-1">
                          {t.role}
                          {t.role && t.company ? " · " : ""}
                          <span className="text-white/80 font-medium">
                            {t.company}
                          </span>
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                </ScaleIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FINAL CTA */}
      <Section className="bg-surface pb-32">
        <div className="relative isolate overflow-hidden bg-[#06092a] text-white p-12 md:p-20 text-center rounded-card shadow-2xl">
          <SectionBackground />

          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {data?.ctaTitle}
            </h2>

            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              {data?.ctaSubtitle}
            </p>

            <Link
              href="/contact"
              className="group rv-btn-primary inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1e2b7a] px-8 py-3 font-bold text-white"
            >
              <span className="rv-btn-sheen" aria-hidden />
              <span className="relative">{data?.primaryCTA}</span>
            </Link>
          </div>
        </div>
      </Section>

    </div >
  );
}