import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImage";
import groq from "groq";

export const revalidate = 60;

import JsonLd from "@/components/JsonLd";
import { buildMetadata, siteConfig } from "@/lib/seo";
import type { Service, CaseStudy } from "@/types";

import {
  ServiceHero,
  ServiceOverview,
  TrustSection,
  WhyChooseSection,
  ProblemsOutcomes,
  TechStackSection,
  ProcessTimeline,
  RelatedCaseStudies,
  ServiceCTA,
} from "@/components/service";
import { StatsBar } from "@/components/hero/StatsBar";

const SERVICE_TRUST_METRICS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "12+", label: "Industries Served" },
  { value: "98%", label: "Client Retention" },
  { value: "24/7", label: "Priority Support" },
];

const serviceQuery = groq`*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  description,
  tagline,
  image,
  icon,
  overviewHeading,
  serviceOverview,
  capabilities[]{
    title,
    description
  },
  problemsSolved,
  outcomes,
  technologyCategories[]{
    title,
    technologies
  },
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

export async function generateStaticParams() {
  const slugs = await sanityFetch<{ slug: string }[]>(
    allSlugsQuery,
    {},
    { tags: ["service"] }
  );
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await sanityFetch<Service | null>(
    serviceQuery,
    { slug },
    { tags: ["service"] }
  );
  if (!service) return {};

  return buildMetadata({
    title: service.seo?.metaTitle ?? service.title,
    description: service.seo?.metaDescription ?? service.description,
    path: `/services/${slug}`,
    ogImage: service.image
      ? urlFor(service.image).width(1200).height(630).url()
      : undefined,
  });
}

type IllustrationVariant = "web" | "mobile" | "ai" | "default";

function resolveIllustration(service: Service): IllustrationVariant {
  const icon = (service as any).icon as string | undefined;
  if (icon === "web" || icon === "mobile" || icon === "ai") return icon;

  const slug = service.slug?.current?.toLowerCase() ?? "";
  if (slug.includes("mobile") || slug.includes("app")) return "mobile";
  if (slug.includes("ai") || slug.includes("content")) return "ai";
  if (slug.includes("web")) return "web";
  return "default";
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await sanityFetch<Service | null>(
    serviceQuery,
    { slug },
    { tags: ["service"] }
  );

  if (!service) notFound();

  const relatedStudies = await sanityFetch<CaseStudy[]>(
    relatedCaseStudiesQuery,
    { serviceId: service._id },
    { tags: ["caseStudy"] }
  );

  const illustrationVariant = resolveIllustration(service);

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
    <div>
      <JsonLd data={serviceSchema} />

      <ServiceHero
        title={service.title}
        tagline={service.tagline}
        description={service.description}
        image={service.image}
      />

      {/* STATS — floats across the hero / overview boundary (md+); stacks naturally on mobile */}
      <div className="relative z-20 px-5 sm:px-6 md:-mt-[88px] lg:-mt-[96px]">
        <div className="mx-auto max-w-7xl 2xl:max-w-[1400px]">
          <StatsBar stats={SERVICE_TRUST_METRICS} />
        </div>
      </div>

      <ServiceOverview
        heading={service.overviewHeading}
        serviceTitle={service.title}
        overview={service.serviceOverview}
        capabilities={service.capabilities}
        illustrationVariant={illustrationVariant}
      />

      <TrustSection />

      <WhyChooseSection />

      <ProblemsOutcomes
        problems={service.problemsSolved}
        outcomes={service.outcomes}
      />

      <TechStackSection categories={service.technologyCategories} />

      <ProcessTimeline variant={illustrationVariant} />

      <RelatedCaseStudies
        studies={relatedStudies}
        serviceTitle={service.title}
      />

      <ServiceCTA serviceTitle={service.title} />
    </div>

  );
}
