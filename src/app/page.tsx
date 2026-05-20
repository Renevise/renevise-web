import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImage";
import groq from "groq";

export const revalidate = 60;
import React from 'react';
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import ServicesGrid from "@/components/ServicesGrid";

export const metadata: Metadata = buildMetadata({
  title: "Business Technology Consulting",
  description:
    "Renevise partners with enterprises to deliver high-impact web, mobile, and AI solutions. Transform your technology infrastructure with a firm that measures success by yours.",
  path: "/",
});
import { Section, SectionTitle } from "@/components/Section";
import Link from "next/link";
import ProcessSectionWrapper from "@/components/ProcessSectionWrapper";
import FadeIn from "@/components/animations/FadeIn";
import ScaleIn from "@/components/animations/ScaleIn";
import HoverCard from "@/components/animations/HoverCard";
import { HeroSection } from "@/components/hero/HeroSection";
import { StatsBar } from "@/components/hero/StatsBar";

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
      <Section className="bg-primary text-white overflow-hidden relative">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-accent/5 rounded-l-full blur-[120px] pointer-events-none" />
        <SectionTitle
          dark
          title="Our Structured Approach"
          subtitle="Positioning reliability as the core of every partnership. Our repeatable process guarantees quality at scale."
        />
        <div className="relative z-10">
          <ProcessSectionWrapper />
        </div>
      </Section>



      {/* CASE STUDIES */}
      <Section>
        <SectionTitle
          title="Measurable Impact"
          subtitle="Explore how we transform businesses."
        />
        {caseStudies.length === 0 ? (
          <FadeIn>
            <p className="text-center text-text-muted">
              Case studies coming soon.
            </p>
          </FadeIn>
        ) : <div className="grid md:grid-cols-2 gap-10">
          {caseStudies.map((c: any, idx: number) => (
            <ScaleIn key={c._id} delay={idx * 0.1}>
              <div className="group overflow-hidden flex flex-col">
                <div className="relative h-80 rounded-card overflow-hidden mb-6 border border-border">
                  <Image
                    src={urlFor(c.image).url()}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-xs text-text-muted uppercase">{c.client}</h4>
                <h3 className="text-xl font-bold text-primary mb-2">{c.title}</h3>
                <p className="text-text-muted italic">&ldquo;{c.result}&rdquo;</p>
              </div>
            </ScaleIn>
          ))}
        </div>};

        {/* <FadeIn>
          <div className="flex justify-center mt-12">
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-2 px-8 py-3 rounded-theme border border-accent text-accent font-bold transition-all duration-300 hover:bg-accent hover:text-white"
            >
              Show More
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn> */}
      </Section>

      <Section className="bg-surface">
        <SectionTitle
          title="Client Trust"
          subtitle="Reliable solutions for decision makers."
        />

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t: any) => (
            <ScaleIn key={t._id}>
              <HoverCard className="bg-white p-10 rounded-card border border-border">
                <p className="text-lg text-text-muted mb-8 italic">
                  &ldquo;{t.content}&rdquo;
                </p>

                <div className="flex items-center gap-4">
                  {t.image ? (
                    <Image
                      src={urlFor(t.image).url()}
                      alt={t.name}
                      width={48}
                      height={48}
                      className="rounded-full border object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full border bg-blue-50 flex items-center justify-center text-accent font-bold text-sm shrink-0">
                      {t.name?.[0]}
                    </div>
                  )}

                  <div>
                    <div className="font-bold text-primary">{t.name}</div>
                    <div className="text-text-muted text-sm">
                      {t.role}, {t.company}
                    </div>
                  </div>
                </div>

              </HoverCard>
            </ScaleIn>

          ))}
        </div>
      </Section >

      {/* FINAL CTA */}
      <Section className="bg-surface pb-32">
        <div className="relative overflow-hidden bg-gradient-to-br from-primary via-[#1a2260] to-[#1e2b7a] text-white p-12 md:p-20 text-center rounded-card shadow-2xl">
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {data?.ctaTitle}
            </h2>

            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              {data?.ctaSubtitle}
            </p>

            <Link href="/contact" className="inline-block bg-accent px-8 py-3 rounded-theme font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
              {data?.primaryCTA}
            </Link>
          </div>
        </div>
      </Section>

    </div >
  );
}