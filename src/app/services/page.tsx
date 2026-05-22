import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImage";
import groq from "groq";

export const revalidate = 60;
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
import { DarkSection } from "@/components/DarkSection";

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
  const services = await sanityFetch<any[]>(query, {}, { tags: ["service"] });

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
    <div>
      <JsonLd data={serviceSchema} />

      {/* HERO */}
      <DarkSection
        className="border-b border-white/10"
        innerClassName="pt-[120px] md:pt-[140px] pb-20 md:pb-24"
        withBottomAnchor
      >
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 backdrop-blur-md">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7aa2ff]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">
                What we do
              </span>
            </div>
            <h1
              className="font-extrabold mb-5 leading-[1.05] tracking-[-0.015em] text-white"
              style={{ fontSize: "clamp(2.25rem, 1.4rem + 2.6vw, 3.75rem)" }}
            >
              Capabilities
            </h1>
            <p className="text-base md:text-[17px] text-white/65 leading-relaxed font-light max-w-2xl mx-auto">
              Outcome-driven technology services designed for high-performing organizations. No buzzwords — just measurable business value.
            </p>
          </div>
        </FadeIn>
      </DarkSection>

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

                <p className="text-lg text-text-muted mb-10 leading-relaxed font-light max-w-2xl">
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
                  className="group/svc mt-12 inline-flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-theme font-bold will-change-transform transition-[transform,box-shadow,background-color] duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] hover:-translate-y-0.5 hover:bg-[#1a2570] hover:shadow-[0_18px_36px_-14px_rgba(18,25,69,0.45)] active:translate-y-0 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2"
                >
                  Explore Service
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] group-hover/svc:translate-x-1" />
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