import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImage";
import groq from "groq";
import Image from "next/image";
import { Section } from "@/components/Section";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FadeIn from "@/components/animations/FadeIn";
import ScaleIn from "@/components/animations/ScaleIn";
import HoverCard from "@/components/animations/HoverCard";
import JsonLd from "@/components/JsonLd";
import { buildMetadata, siteConfig } from "@/lib/seo";

const query = groq`*[_type == "service"]{
  _id,
  title,
  slug,
  description,
  problemsSolved,
  outcomes,
  image
}`;

export const metadata: Metadata = buildMetadata({
  title: "Technology Consulting Services",
  description:
    "Expert web development, mobile app, and AI consulting services tailored for enterprise growth. Outcome-driven technology solutions with measurable ROI.",
  path: "/services",
});

export default async function Services() {
  const services = await client.fetch(query);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Renevise Technology Services",
    url: `${siteConfig.url}/services`,
    itemListElement: services.map((s: any, i: number) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.title,
        description: s.description,
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
      },
    })),
  };

  return (
    <div className="pt-[72px]">
      <JsonLd data={serviceSchema} />

      {/* HERO */}
      <Section className="bg-surface border-b border-border">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-6">
              Capabilities
            </h1>
            <p className="text-lg text-text-muted leading-relaxed font-light">
              We provide outcome-driven technology services designed for high-performing organizations. No buzzwords, just business value.
            </p>
          </div>
        </FadeIn>
      </Section>

      {/* SERVICES */}
      {services.map((service: any, idx: number) => {
        const isEven = idx % 2 === 1;

        return (
          <FadeIn key={service._id} delay={idx * 0.1}>
            <Section
              containerClassName={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
              )}
            >

              {/* TEXT */}
              <div className={cn(isEven && "lg:order-2")}>

                <span className="text-accent text-xs font-bold uppercase tracking-widest mb-6 block">
                  Capability
                </span>

                <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">
                  {service.title}
                </h2>

                <p className="text-lg text-text-muted mb-10 leading-relaxed font-light">
                  {service.description}
                </p>

                {/* LISTS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                  {/* Problems */}
                  <div>
                    <h4 className="text-primary font-bold uppercase text-[10px] tracking-widest mb-6">
                      Problems we solve
                    </h4>

                    <ul className="space-y-4">
                      {service.problemsSolved?.map((p: string, i: number) => (
                        <li
                          key={i}
                          className="flex gap-3 text-text-muted text-sm leading-relaxed italic transition-all duration-300 hover:translate-x-1"
                        >
                          <div className="w-5 h-5 rounded-md bg-blue-50 flex items-center justify-center text-accent mt-0.5 transition-all duration-300 group-hover:bg-accent">
                            <CheckCircle2 className="w-3 h-3" />
                          </div>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcomes */}
                  <div>
                    <h4 className="text-primary font-bold uppercase text-[10px] tracking-widest mb-6">
                      Strategic outcomes
                    </h4>

                    <ul className="space-y-4">
                      {service.outcomes?.map((o: string, i: number) => (
                        <li
                          key={i}
                          className="flex gap-3 text-primary font-semibold text-sm leading-relaxed transition-all duration-300 hover:translate-x-1"
                        >
                          <CheckCircle2 className="w-5 h-5 text-accent mt-0.5 transition-transform duration-300" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* CTA */}
                <Link
                  href={`/services/${service.slug?.current}`}
                  className="mt-12 inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-theme font-bold transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  Explore Service
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Link>

              </div>

              {/* IMAGE */}
              <ScaleIn>
                <HoverCard
                  className={cn(
                    "relative aspect-square rounded-card overflow-hidden border border-border",
                    isEven && "lg:order-1"
                  )}
                >
                  <Image
                    src={urlFor(service.image).url()}
                    alt={service.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </HoverCard>
              </ScaleIn>

            </Section>
          </FadeIn>
        );
      })}
    </div>
  );
}