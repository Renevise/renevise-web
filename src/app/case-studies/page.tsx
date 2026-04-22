import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImage";
import groq from "groq";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/Section";
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
  const caseStudies: CaseStudy[] = await client.fetch(query);

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
