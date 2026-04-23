import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImage";
import groq from "groq";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us — Our Identity & Values",
  description:
    "Learn how Renevise was built to serve ambitious enterprises. We combine technical depth with strategic thinking to deliver lasting technology transformation.",
  path: "/about",
});
import { Section, SectionTitle } from "@/components/Section";
import { Target, Users, ShieldCheck, Mail } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import ScaleIn from "@/components/animations/ScaleIn";
import HoverCard from "@/components/animations/HoverCard";

const query = groq`*[_type == "about"][0]{
  heading,
  subtext,
  statsNumber,
  statsLabel,
  email,
  values,
  image
}`;

const iconMap = [Target, ShieldCheck, Users];

export default async function About() {
  const data = await client.fetch(query);

  return (
    <div className="pt-[72px]">

      {/* HERO */}
      <Section className="bg-surface">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* TEXT */}
          <FadeIn>
            <div>
              <span className="text-accent text-xs font-bold uppercase tracking-widest mb-6 block">
                Our Identity
              </span>

              <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-8">
                {data.heading}
              </h1>

              <p className="text-lg text-text-muted leading-relaxed font-light max-w-2xl">
                {data.subtext}
              </p>
            </div>
          </FadeIn>

          {/* IMAGE */}
          <div className="relative">

            <ScaleIn>
              <div className="group relative aspect-[4/3] rounded-card overflow-hidden shadow-xl border border-border">
                <Image
                  src={urlFor(data.image).url()}
                  alt="About"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </ScaleIn>

            {/* FLOATING STAT */}
            <FadeIn delay={0.2}>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-card border border-border shadow-xl hidden md:block transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="text-3xl font-bold text-primary mb-1">
                  {data.statsNumber}
                </div>
                <div className="text-text-muted text-xs font-bold uppercase tracking-widest">
                  {data.statsLabel}
                </div>
              </div>
            </FadeIn>

          </div>

        </div>
      </Section>

      {/* VALUES */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.values?.map((item: any, i: number) => {
            const Icon = iconMap[i];

            return (
              <ScaleIn key={i} delay={i * 0.1}>
                <HoverCard className="p-8 rounded-card bg-white border border-border hover:border-accent/30">

                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-accent">
                    <Icon className="w-6 h-6 text-accent transition-colors duration-300 group-hover:text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-primary mb-4">
                    {item.title}
                  </h3>

                  <p className="text-text-muted text-sm leading-relaxed">
                    {item.description}
                  </p>

                </HoverCard>
              </ScaleIn>
            );
          })}
        </div>
      </Section>

      {/* CONTACT */}
      <Section className="bg-surface pb-32">
        <FadeIn>
          <div className="relative overflow-hidden bg-gradient-to-br from-primary via-[#1a2260] to-[#1e2b7a] text-white text-center p-12 md:p-20 rounded-card shadow-2xl">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative">
              <SectionTitle
                dark
                label="Connect"
                title="Ready to transform?"
                subtitle="Our consultants are ready to discuss your next strategic move."
              />

              <a
                href={`mailto:${data.email}`}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 text-lg sm:text-2xl md:text-4xl font-bold text-white hover:text-accent transition-colors text-center break-words max-w-full px-4"
              >
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex-shrink-0" />

                <span className="break-all">
                  {data.email}
                </span>
              </a>
            </div>
          </div>
        </FadeIn>
      </Section>

    </div>
  );
}