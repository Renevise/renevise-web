import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImage";
import groq from "groq";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { Section } from "@/components/Section";
import { ArrowRight, Settings, BarChart3, TrendingUp } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import ScaleIn from "@/components/animations/ScaleIn";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, siteConfig } from "@/lib/seo";
import type { CaseStudy } from "@/types";

const caseStudyQuery = groq`*[_type == "caseStudy" && slug.current == $slug][0]{
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

const allSlugsQuery = groq`*[_type == "caseStudy" && defined(slug.current)]{
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
  const slugs: { slug: string }[] = await client.fetch(allSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study: CaseStudy | null = await client.fetch(caseStudyQuery, { slug });
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
  const study: CaseStudy | null = await client.fetch(caseStudyQuery, { slug });

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
    <div className="pt-[72px]">
      <JsonLd data={caseStudySchema} />

      {/* HERO */}
      <Section className="bg-surface border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            {study.serviceTitle && (
              <Link
                href={
                  study.serviceSlug
                    ? `/services/${study.serviceSlug}`
                    : "/services"
                }
                className="text-accent text-xs font-bold uppercase tracking-widest mb-6 inline-block transition-all duration-200 hover:tracking-[0.2em]"
              >
                {study.serviceTitle}
              </Link>
            )}
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-4 leading-tight">
              {study.title}
            </h1>
            <p className="text-lg text-text-muted font-light">
              Client:{" "}
              <span className="text-primary font-semibold">{study.client}</span>
            </p>
          </FadeIn>

          {study.image && (
            <ScaleIn>
              <div className="relative aspect-[4/3] rounded-card overflow-hidden border border-border shadow-xl">
                <Image
                  src={urlFor(study.image).width(1000).height(750).url()}
                  alt={study.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </ScaleIn>
          )}
        </div>
      </Section>

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
                      className="px-3 py-1.5 bg-white border border-border text-text-muted text-[11px] font-bold rounded-theme transition-all duration-300 hover:bg-accent hover:text-white hover:border-accent"
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
                “{study.result}”
              </p>
            </div>
          </FadeIn>
        </Section>
      )}

      {/* DETAILS (portable text) */}
      {study.details?.length ? (
        <Section className="border-b border-border">
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

      {/* CTA */}
      <Section className="bg-primary text-white text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            Have a similar challenge?
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto font-light">
            Let&apos;s talk about your goals and build something that delivers
            real, measurable results.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-accent text-white px-10 py-4 rounded-theme font-bold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            Start a Conversation
            <ArrowRight className="w-5 h-5" />
          </Link>
        </FadeIn>
      </Section>
    </div>
  );
}
