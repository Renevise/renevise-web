import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImage";
import groq from "groq";
import Image from "next/image";
import { Section } from "@/components/Section";
import { ArrowRight, BarChart3, Settings, TrendingUp } from "lucide-react";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";
import ScaleIn from "@/components/animations/ScaleIn";
import HoverCard from "@/components/animations/HoverCard";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, siteConfig } from "@/lib/seo";

const query = groq`*[_type == "caseStudy"]{
  _id,
  client,
  title,
  problem,
  solution,
  tech,
  result,
  image
}`;

export const metadata: Metadata = buildMetadata({
  title: "Case Studies — Proven Results",
  description:
    "See how Renevise has delivered measurable outcomes for enterprise clients across web, mobile, and AI projects. Real problems. Structured solutions. Quantified results.",
  path: "/case-studies",
});

export default async function CaseStudies() {
  const caseStudies = await client.fetch(query);

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Renevise Case Studies",
    url: `${siteConfig.url}/case-studies`,
    itemListElement: caseStudies.map((c: any, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: c.title,
        description: c.problem,
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
      <Section className="bg-primary text-white">
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
      </Section>

      {/* CASE STUDIES */}
      {caseStudies.map((caseStudy: any, idx: number) => {
        const isEven = idx % 2 === 1;

        return (
          <Section
            key={caseStudy._id}
            className={isEven ? "bg-surface" : "bg-white"}
          >
            <div className="grid lg:grid-cols-2 gap-16 items-start">

              {/* TEXT */}
              <FadeIn delay={idx * 0.1}>
                <div className={isEven ? "lg:order-2" : ""}>

                  <span className="text-accent text-xs font-bold uppercase tracking-widest mb-6 block">
                    Client: {caseStudy.client}
                  </span>

                  <h2 className="text-3xl md:text-5xl font-bold text-primary mb-10">
                    {caseStudy.title}
                  </h2>

                  <div className="space-y-12">

                    {/* Problem */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Settings className="w-4 h-4 text-accent" />
                        <h4 className="text-primary font-bold uppercase text-xs">
                          The Problem
                        </h4>
                      </div>

                      <p className="text-text-muted text-lg leading-relaxed">
                        {caseStudy.problem}
                      </p>
                    </div>

                    {/* Solution */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <BarChart3 className="w-4 h-4 text-accent" />
                        <h4 className="text-primary font-bold uppercase text-xs">
                          Our Solution
                        </h4>
                      </div>

                      <p className="text-text-muted text-lg leading-relaxed">
                        {caseStudy.solution}
                      </p>

                      {/* TECH TAGS */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {caseStudy.tech?.map((t: string) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 bg-surface border border-border text-text-muted text-[10px] font-bold rounded-theme transition-all duration-300 hover:bg-accent hover:text-white hover:border-accent"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* RESULT */}
                    <HoverCard className="p-8 rounded-card bg-blue-50 border border-blue-100">
                      <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-4 h-4 text-accent" />
                        <h4 className="text-accent font-bold uppercase text-xs">
                          Quantified Result
                        </h4>
                      </div>

                      <p className="text-primary text-xl md:text-2xl font-bold">
                        "{caseStudy.result}"
                      </p>
                    </HoverCard>

                  </div>
                </div>
              </FadeIn>

              {/* IMAGE */}
              <ScaleIn delay={idx * 0.1}>
                <div className={`sticky top-28 ${isEven ? "lg:order-1" : ""}`}>
                  <HoverCard className="relative aspect-[4/3] rounded-card overflow-hidden border border-border shadow-xl">
                    <Image
                      src={urlFor(caseStudy.image).url()}
                      alt={caseStudy.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </HoverCard>
                </div>
              </ScaleIn>

            </div>
          </Section>
        );
      })}

      {/* FINAL CTA */}
      <Section className="text-center pt-0 pb-32">
        <ScaleIn>
          <div className="max-w-xl mx-auto p-12 rounded-card border border-border bg-surface shadow-sm hover:shadow-lg transition-all duration-300">

            <h3 className="text-xl font-bold text-primary mb-4">
              Ready to be our next success story?
            </h3>

            <Link
              href="/contact"
              className="text-accent font-bold flex items-center justify-center gap-2 transition-all duration-300 hover:translate-x-1"
            >
              Get in touch to discuss your project
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

          </div>
        </ScaleIn>
      </Section>

    </div>
  );
}