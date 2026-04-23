import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImage";
import groq from "groq";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "next-sanity";
import { Section } from "@/components/Section";
import { CheckCircle2, ArrowRight, TrendingUp } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import ScaleIn from "@/components/animations/ScaleIn";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, siteConfig } from "@/lib/seo";
import type { Service, CaseStudy } from "@/types";

const serviceQuery = groq`*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,  
  tagline,
  problemsSolved,
  outcomes,
  image,
  details,
  seo
}`;

const allSlugsQuery = groq`*[_type == "service"]{ "slug": slug.current }`;

const relatedCaseStudiesQuery = groq`*[_type == "caseStudy" && service._ref == $serviceId][0...2]{
  _id,
  title,
  client,
  result,
  image,
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
      <p className="text-text-muted text-base leading-relaxed mb-5">{children}</p>
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
  const service: Service | null = await client.fetch(serviceQuery, { slug });
  if (!service) return {};

  return buildMetadata({
    title: service.seo?.metaTitle ?? service.title,
    description: service.seo?.metaDescription ?? service.description,
    path: `/services/${slug}`,
    ogImage: service.image ? urlFor(service.image).width(1200).height(630).url() : undefined,
  });
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service: Service | null = await client.fetch(serviceQuery, { slug });

  if (!service) notFound();

  const relatedStudies: CaseStudy[] = await client.fetch(
    relatedCaseStudiesQuery,
    { serviceId: service._id }
  );

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    url: `${siteConfig.url}/services/${slug}`,
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <div className="pt-[72px]">
      <JsonLd data={serviceSchema} />

      {/* HERO */}
      <Section className="bg-surface border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <FadeIn>
            <span className="text-accent text-xs font-bold uppercase tracking-widest mb-6 block">
              Capability
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-4 leading-tight">
              {service.title}
            </h1>
            {service.tagline && (
              <p className="text-xl text-accent font-semibold mb-6">
                {service.tagline}
              </p>
            )}
            <p className="text-lg text-text-muted leading-relaxed font-light max-w-2xl">
              {service.description}
            </p>
          </FadeIn>

          {service.image && (
            <ScaleIn>
              <div className="relative aspect-square rounded-card overflow-hidden border border-border">
                <Image
                  src={urlFor(service.image).width(800).height(800).url()}
                  alt={service.title}
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

      {/* PROBLEMS + OUTCOMES */}
      {(service.problemsSolved?.length || service.outcomes?.length) && (
        <Section className="border-b border-border">
          <div className="rounded-2xl bg-surface border border-border p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

              {service.problemsSolved?.length ? (
                <FadeIn>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                      Problems We Solve
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {service.problemsSolved.map((p, i) => (
                      <li
                        key={i}
                        className="flex gap-3 items-start text-text-muted text-sm leading-relaxed italic
                                   transition-all duration-200 hover:translate-x-1 hover:text-primary cursor-default"
                      >
                        <div className="w-5 h-5 rounded-md bg-blue-50 flex items-center justify-center text-accent mt-0.5 shrink-0">
                          <CheckCircle2 className="w-3 h-3" />
                        </div>
                        {p}
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              ) : null}

              {service.outcomes?.length ? (
                <FadeIn delay={0.15}>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                    <h2 className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                      Strategic Outcomes
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {service.outcomes.map((o, i) => (
                      <li
                        key={i}
                        className="flex gap-3 items-start font-semibold text-sm leading-relaxed text-primary
                                   transition-all duration-200 hover:translate-x-1 hover:text-accent cursor-default"
                      >
                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </FadeIn>
              ) : null}

            </div>
          </div>
        </Section>
      )}

      {/* DETAILED CONTENT */}
      {service.details?.length ? (
        <Section className="border-b border-border">
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              <span className="text-accent text-xs font-bold uppercase tracking-widest block mb-3">
                Deep Dive
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-primary mb-10 leading-tight">
                How It Works
              </h2>
              <PortableText
                value={service.details}
                components={portableTextComponents}
              />
            </div>
          </FadeIn>
        </Section>
      ) : null}

      {/* RELATED CASE STUDIES */}
      {relatedStudies.length > 0 && (
        <Section className="border-b border-border">
          <FadeIn>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-accent text-xs font-bold uppercase tracking-widest block mb-2">
                  Proof of Work
                </span>
                <h2 className="text-2xl md:text-4xl font-extrabold text-primary leading-tight">
                  Related Case Studies
                </h2>
              </div>
              <Link
                href="/case-studies"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all duration-200 hover:gap-3"
              >
                View all
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedStudies.map((study, i) => (
              <FadeIn key={study._id} delay={i * 0.1}>
                <div className="group rounded-card border border-border overflow-hidden bg-surface transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                  {study.image && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={urlFor(study.image).width(640).height(360).url()}
                        alt={study.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-text-muted mb-2">
                      {study.client}
                    </p>
                    <h3 className="text-lg font-bold text-primary mb-3 leading-snug">
                      {study.title}
                    </h3>
                    {study.result && (
                      <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-lg px-3 py-2 mb-4">
                        <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-xs font-bold">{study.result}</span>
                      </div>
                    )}
                    <div>
                      <Link
                        href={study.slug ? `/case-studies/${study.slug}` : "/case-studies"}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all duration-200 hover:gap-3"
                      >
                        View full case study
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section className="bg-surface pb-32">
        <FadeIn>
          <div className="relative overflow-hidden bg-gradient-to-br from-primary via-[#1a2260] to-[#1e2b7a] text-white text-center p-12 md:p-20 rounded-card shadow-2xl">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
                Start Your {service.title} Project
              </h2>
              <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto font-light">
                Ready to move forward? Let&apos;s talk about your goals and build something that delivers real results.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-accent text-white px-10 py-4 rounded-theme font-bold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </Section>
    </div>
  );
}
