import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImage";
import groq from "groq";

export const revalidate = 60;
export const dynamicParams = true;

import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { Section } from "@/components/Section";
import { DarkSection } from "@/components/DarkSection";
import { HeroBackground } from "@/components/hero/HeroBackground";
import FadeIn from "@/components/animations/FadeIn";
import ScaleIn from "@/components/animations/ScaleIn";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, siteConfig } from "@/lib/seo";
import type { CaseStudy } from "@/types";
import { ArrowRight, ArrowUpRight, Settings, BarChart3, TrendingUp } from "lucide-react";

const caseStudyQuery = groq`*[_type == "caseStudy" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  _id,
  title,
  client,
  problem,
  solution,
  tech,
  result,
  image,
  details,
  "slug": slug.current,
  "serviceTitle": service->title,
  "serviceSlug": service->slug.current
}`;

const allSlugsQuery = groq`*[_type == "caseStudy" && defined(slug.current) && !(_id in path("drafts.**"))]{
  "slug": slug.current
}`;

const portableTextComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl md:text-3xl font-extrabold text-primary mt-12 mb-4 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-bold text-primary mt-8 mb-3 leading-snug">
        {children}
      </h3>
    ),
    normal: ({ children }: any) => (
      <p className="text-text-muted text-base leading-relaxed mb-5">
        {children}
      </p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-accent bg-surface pl-5 pr-4 py-5 my-8 rounded-r-lg">
        <span className="text-primary font-medium italic text-base leading-relaxed block">
          {children}
        </span>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="space-y-2.5 mb-6">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="space-y-2.5 mb-6 list-decimal list-inside">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-3 text-text-muted text-base leading-relaxed list-none">
        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-[0.65em] shrink-0" />
        <span>{children}</span>
      </li>
    ),
    number: ({ children }: any) => (
      <li className="text-text-muted text-base leading-relaxed">{children}</li>
    ),
  },
};

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(allSlugsQuery, {}, { tags: ["caseStudy"] });
  return slugs.filter((s) => s.slug).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = await sanityFetch<CaseStudy | null>(caseStudyQuery, { slug }, { tags: ["caseStudy"] });
  if (!study) return {};

  return buildMetadata({
    title: `${study.title} — ${study.client}`,
    description: study.problem ?? study.result,
    path: `/case-studies/${slug}`,
    ogImage: study.image
      ? urlFor(study.image).width(1200).height(630).url()
      : undefined,
  });
}

export default async function CaseStudyDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await sanityFetch<CaseStudy | null>(caseStudyQuery, { slug }, { tags: ["caseStudy"] });

  if (!study) notFound();

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: study.title,
    description: study.problem,
    url: `${siteConfig.url}/case-studies/${slug}`,
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: study.serviceTitle,
  };

  return (
    <div>
      <JsonLd data={caseStudySchema} />

      {/* HERO — dark premium hero matching ServiceHero */}
      <DarkSection
        innerClassName="pt-[100px] md:pt-[120px] pb-20 md:pb-28"
        withBottomAnchor
      >
        <div className="grid grid-cols-1 lg:grid-cols-[11fr_9fr] gap-y-10 lg:gap-x-14 items-center">
          {/* LEFT — content */}
          <FadeIn>
            <div className="max-w-[640px]">
              {study.serviceTitle && (
                <Link
                  href={
                    study.serviceSlug
                      ? `/services/${study.serviceSlug}`
                      : "/services"
                  }
                  className="group inline-flex items-center gap-2 mb-6 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 backdrop-blur-md transition-[background-color,border-color,transform,box-shadow] duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] hover:bg-white/[0.12] hover:border-white/25 hover:-translate-y-0.5 hover:shadow-[0_8px_22px_-10px_rgba(122,162,255,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7aa2ff]/60"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7aa2ff]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">
                    {study.serviceTitle}
                  </span>
                </Link>
              )}

              <h1
                className="font-extrabold mb-5 leading-[1.05] tracking-[-0.015em] text-white"
                style={{ fontSize: "clamp(2rem, 1.4rem + 2.05vw, 3.25rem)" }}
              >
                {study.title}
              </h1>

              <p className="text-base md:text-[17px] text-white/65 leading-relaxed font-light mb-8">
                Client:{" "}
                <span className="text-white font-semibold">{study.client}</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/contact"
                  className="group rv-btn-primary inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1e2b7a] px-7 py-3.5 text-[15px] font-semibold text-white"
                >
                  <span className="rv-btn-sheen" aria-hidden />
                  <span className="relative">Start a Similar Project</span>
                  <ArrowRight className="relative w-4 h-4 transition-transform duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] group-hover:translate-x-0.5" />
                </Link>

                <Link
                  href="/case-studies"
                  className="group rv-btn-ghost inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur-md hover:bg-white/[0.09] hover:border-white/30"
                >
                  All Case Studies
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </FadeIn>

          {/* RIGHT — image */}
          <div>
            {study.image ? (
              <ScaleIn>
                <div
                  className="group relative aspect-[5/4] lg:aspect-[5/4] xl:aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 transition-[transform,border-color,box-shadow] duration-[var(--rv-duration-slow)] ease-[var(--rv-ease-out)] hover:-translate-y-1 hover:border-white/20"
                  style={{
                    boxShadow:
                      "0 30px 60px -25px rgba(0,0,0,0.55), 0 18px 40px -20px rgba(59,130,246,0.28), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  <Image
                    src={urlFor(study.image).width(1000).height(800).url()}
                    alt={study.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover will-change-transform transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#06092a]/55 via-[#06092a]/10 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />
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
      </DarkSection>

      {/* PROBLEM */}
      {study.problem && (
        <Section className="border-b border-border">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-4 h-4 text-accent" />
                <h2 className="text-primary font-bold uppercase text-xs tracking-widest">
                  The Problem
                </h2>
              </div>
              <p className="text-xl md:text-2xl text-primary font-semibold leading-relaxed mb-4">
                What stood in the way.
              </p>
              <p className="text-text-muted text-lg leading-relaxed">
                {study.problem}
              </p>
            </div>
          </FadeIn>
        </Section>
      )}

      {/* SOLUTION + TECH */}
      {study.solution && (
        <Section className="bg-surface border-b border-border">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-accent" />
                <h2 className="text-primary font-bold uppercase text-xs tracking-widest">
                  Our Solution
                </h2>
              </div>
              <p className="text-text-muted text-lg leading-relaxed mb-8">
                {study.solution}
              </p>

              {study.tech?.length ? (
                <div className="flex flex-wrap gap-2">
                  {study.tech.map((t) => (
                    <span
                      key={t}
                      className="rv-pill-light px-3 py-1.5 text-[11px] font-bold rounded-theme"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </FadeIn>
        </Section>
      )}

      {/* RESULT */}
      {study.result && (
        <Section className="border-b border-border">
          <FadeIn>
            <div className="max-w-3xl mx-auto p-10 md:p-14 rounded-card bg-primary text-white text-center shadow-xl">
              <div className="flex items-center justify-center gap-2 mb-6">
                <TrendingUp className="w-4 h-4 text-accent" />
                <span className="text-accent font-bold uppercase text-xs tracking-widest">
                  Quantified Result
                </span>
              </div>
              <p className="text-2xl md:text-4xl font-extrabold leading-tight">
                &ldquo;{study.result}&rdquo;
              </p>
            </div>
          </FadeIn>
        </Section>
      )}

      {/* DETAILS (portable text) */}
      {study.details?.length ? (
        <Section className="bg-surface border-b border-border">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <span className="text-accent text-xs font-bold uppercase tracking-widest block mb-3">
                Deep Dive
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-10 leading-tight">
                Inside the Project
              </h2>
              <PortableText
                value={study.details}
                components={portableTextComponents}
              />
            </div>
          </FadeIn>
        </Section>
      ) : null}

      {/* CTA — dark premium ending block matching ServiceCTA */}
      <section className="bg-surface">
        <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-6 py-20 md:py-28">
          <FadeIn>
            <div className="relative isolate overflow-hidden bg-[#06092a] text-white p-10 md:p-16 lg:p-20 rounded-card shadow-2xl">
              <HeroBackground />
              <div className="relative max-w-3xl">
                <span className="text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-4 block">
                  Let&apos;s Build Together
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-[1.05] tracking-tight mb-5">
                  Have a similar challenge?
                </h2>
                <p className="text-white/70 text-base md:text-lg leading-relaxed mb-9 max-w-2xl">
                  Let&apos;s talk about your goals and build something that delivers
                  real, measurable results.
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
    </div>
  );
}
