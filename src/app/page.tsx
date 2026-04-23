import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImage";
import groq from "groq";
import React from 'react';
import Image from "next/image";
import { Globe, Smartphone, Sparkles, type LucideIcon } from "lucide-react";
import { buildMetadata } from "@/lib/seo";

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

const iconMap: Record<string, LucideIcon> = {
  web: Globe,
  mobile: Smartphone,
  ai: Sparkles,
};

// QUERIES
const homeQuery = groq`*[_type == "home"][0]{
  heroTitle,
  heroSubtitle,
  primaryCTA,
  secondaryCTA,
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
  const data = await client.fetch(homeQuery);
  const services = await client.fetch(servicesQuery);
  const caseStudies = await client.fetch(caseStudiesQuery);
  const testimonials = await client.fetch(testimonialsQuery);

  return (
    <div className="pt-[72px]">

      {/* HERO */}
      <section className="relative min-h-[500px] flex items-center px-6 overflow-hidden bg-gradient-to-br from-[#121945] to-[#1e2b7a] text-white">
        <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto w-full py-20">
          <FadeIn>
            <div className="max-w-2xl">

              <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-6 block">
                Transforming Enterprise Technology
              </span>

              <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                {data?.heroTitle}
              </h1>

              <p className="text-lg md:text-xl text-white/80 mb-10">
                {data?.heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact" className="bg-accent text-white px-8 py-3.5 rounded-theme font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                  {data?.primaryCTA}
                </Link>

                <Link href="/services" className="px-8 py-3.5 rounded-theme font-bold bg-white/10 border border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                  {data?.secondaryCTA}
                </Link>
              </div>

            </div>
          </FadeIn>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-white border-b border-border py-6 px-6">
        <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto flex flex-wrap justify-between gap-6">
          {data?.stats?.map((stat: any, i: number) => (
            <div key={i} className="text-xs font-bold uppercase tracking-widest text-text-muted">
              <span className="text-lg text-primary">{stat.value}</span> {stat.label}
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <Section className="bg-surface">
        <SectionTitle
          label="Expertise"
          title="Industry-Leading Expertise"
          subtitle="We build high-performance tools optimized for scalability and performance."
        />

        <FadeIn>
          <div className="flex flex-col md:flex-row gap-6 md:min-h-[420px]">
            {services.map((service: any, idx: number) => {
              const Icon = iconMap[service.icon] ?? Globe;
              const step = String(idx + 1).padStart(2, "0");
              const imageUrl = service.image
                ? urlFor(service.image).width(1200).quality(85).url()
                : null;

              return (
                <Link
                  key={service._id}
                  href={service.slug ? `/services/${service.slug}` : "/services"}
                  className="group relative flex-1 md:hover:flex-[2] min-h-[280px] md:min-h-0 overflow-hidden rounded-card bg-[#eef1f9] border border-border transition-all duration-500 ease-out"
                >
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 66vw"
                      className="object-cover opacity-0 md:group-hover:opacity-100 transition-opacity duration-500"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/80 to-primary/95 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-theme bg-white md:group-hover:bg-white/10 flex items-center justify-center transition-colors duration-500">
                        <Icon
                          className="w-5 h-5 text-accent md:group-hover:text-white transition-colors duration-500"
                          strokeWidth={1.75}
                        />
                      </div>
                      <span className="text-xs font-semibold tracking-[0.2em] text-text-muted md:group-hover:text-white/70 transition-colors duration-500">
                        {step}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-primary md:group-hover:text-white transition-colors duration-500 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-text-muted md:text-white/80 md:opacity-0 md:group-hover:opacity-100 md:translate-y-2 md:group-hover:translate-y-0 transition-all duration-500 md:max-w-md">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
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