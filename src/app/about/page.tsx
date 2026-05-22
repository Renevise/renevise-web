import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImage";
import groq from "groq";

export const revalidate = 60;
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Us — Our Identity & Values",
  description:
    "Learn how Renevise was built to serve ambitious enterprises. We combine technical depth with strategic thinking to deliver lasting technology transformation.",
  path: "/about",
});
import { Section, SectionTitle } from "@/components/Section";
import { SectionBackground } from "@/components/SectionBackground";
import { HeroBackground } from "@/components/hero/HeroBackground";
import { StatCard } from "@/components/hero/StatCard";
import { Target, Users, ShieldCheck, Mail } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import ScaleIn from "@/components/animations/ScaleIn";
import { HeroBackgroundCard } from "@/components/HeroBackgroundCard";

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
  const data = await sanityFetch<any>(query, {}, { tags: ["about"] });

  return (
    <div>

      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#06092a] text-white">
        <HeroBackground />

        <div className="relative max-w-7xl 2xl:max-w-[1400px] mx-auto px-6 pt-[100px] md:pt-[120px] pb-20 md:pb-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* TEXT */}
            <FadeIn>
              <div>
                <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7aa2ff]" />
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">
                    Our Identity
                  </span>
                </div>

                <h1
                  className="font-extrabold mb-6 leading-[1.05] tracking-[-0.015em] text-white"
                  style={{ fontSize: "clamp(2rem, 1.4rem + 2.4vw, 3.5rem)" }}
                >
                  {data.heading}
                </h1>

                <p className="text-base md:text-[17px] text-white/65 leading-relaxed font-light max-w-2xl">
                  {data.subtext}
                </p>
              </div>
            </FadeIn>

            {/* IMAGE */}
            <div className="relative">

              <ScaleIn>
                <div
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 transition-[transform,border-color,box-shadow] duration-[var(--rv-duration-slow)] ease-[var(--rv-ease-out)] hover:-translate-y-1 hover:border-white/20"
                  style={{
                    boxShadow:
                      "0 30px 60px -25px rgba(0,0,0,0.55), 0 18px 40px -20px rgba(59,130,246,0.28), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  <Image
                    src={urlFor(data.image).url()}
                    alt="About"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover will-change-transform transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  {/* Subtle navy gradient overlay to fuse the image into the hero atmosphere */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#06092a]/55 via-[#06092a]/10 to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-90" />
                  {/* Inner hairline highlight */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent"
                  />
                </div>
              </ScaleIn>

              {/* FLOATING STAT — reuses the homepage hero stat card */}
              <FadeIn delay={0.2}>
                <div className="absolute -bottom-8 -left-8 hidden md:block w-[240px] transition-transform duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] hover:-translate-y-1.5">
                  <StatCard
                    value={data.statsNumber}
                    label={data.statsLabel}
                  />
                </div>
              </FadeIn>

            </div>

          </div>
        </div>

        {/* Bottom anchor — keeps the deep navy uniform to the section edge before
            the light values section creates the intentional contrast break. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[#05071f]/60 to-[#04061a]"
        />
      </section>

      {/* VALUES */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {data.values?.map((item: any, i: number) => {
            const Icon = iconMap[i];

            return (
              <ScaleIn key={i} delay={i * 0.1} className="h-full">
                <HeroBackgroundCard>
                  <div className="p-8">
                    <div className="w-12 h-12 bg-white/10 border border-white/15 rounded-lg flex items-center justify-center mb-6 transition-[background-color,border-color,transform,box-shadow] duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] group-hover:bg-accent group-hover:border-accent group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_24px_-10px_rgba(59,130,246,0.7)]">
                      <Icon className="w-6 h-6 text-[#7aa2ff] transition-colors duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] group-hover:text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4">
                      {item.title}
                    </h3>

                    <p className="text-white/70 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </HeroBackgroundCard>
              </ScaleIn>
            );
          })}
        </div>
      </Section>

      {/* CONTACT */}
      <Section className="bg-surface pb-32">
        <FadeIn>
          <div className="relative isolate overflow-hidden bg-[#06092a] text-white text-center p-12 md:p-20 rounded-card shadow-2xl">
            <SectionBackground />

            <div className="relative">
              <SectionTitle
                dark
                label="Connect"
                title="Ready to transform?"
                subtitle="Our consultants are ready to discuss your next strategic move."
              />

              <a
                href={`mailto:${data.email}`}
                className="group flex flex-col sm:flex-row items-center justify-center gap-3 text-lg sm:text-2xl md:text-4xl font-bold text-white text-center break-words max-w-full px-4 transition-colors duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-4 focus-visible:ring-offset-[#06092a] rounded-md"
              >
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex-shrink-0 transition-transform duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] group-hover:-translate-y-0.5" />

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