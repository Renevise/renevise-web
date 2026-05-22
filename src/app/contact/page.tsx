import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity";
import groq from "groq";

export const revalidate = 60;
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact — Start Your Project",
  description:
    "Ready to modernize your technology stack? Get in touch with Renevise consultants for a discovery call. We respond within 2 hours.",
  path: "/contact",
});
import { Section } from "@/components/Section";
import { DarkSection } from "@/components/DarkSection";
import { Mail, MessageSquare, ArrowUpRight, Phone } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import ScaleIn from "@/components/animations/ScaleIn";
import ContactForm from "@/components/ContactForm";

const query = groq`*[_type == "contact"][0]{
  heroBadge,
  heroHeading,
  heroSubheading,
  heading,
  subtext,
  email,
  phone,
  whatsapp,
  services
}`;

interface ContactMethod {
  icon: typeof Mail;
  label: string;
  title: string;
  description: string;
  value?: string;
  href?: string;
}

export default async function Contact() {
  const data = await sanityFetch<any>(query, {}, { tags: ["contact"] });

  const heroBadge = data?.heroBadge ?? "Get in touch";
  const heroHeading = data?.heroHeading ?? "Let's build what's next, together.";
  const heroSubheading =
    data?.heroSubheading ??
    "Tell us about your goals — our consultants respond within two business hours with a tailored plan.";

  const whatsappDigits = data?.whatsapp
    ? String(data.whatsapp).replace(/[^\d]/g, "")
    : "";
  const whatsappHref = whatsappDigits ? `https://wa.me/${whatsappDigits}` : undefined;

  const methods: ContactMethod[] = [
    {
      icon: Mail,
      label: "Email",
      title: "Email Inquiry",
      description: "Typically responds within 2 hours.",
      value: data?.email,
      href: data?.email ? `mailto:${data.email}` : undefined,
    },
    {
      icon: Phone,
      label: "Call",
      title: "Consultation Call",
      description: "Strategic discussions available.",
      value: data?.phone,
      href: data?.phone ? `tel:${data.phone}` : undefined,
    },
    {
      icon: MessageSquare,
      label: "WhatsApp",
      title: "Direct Message",
      description: "Quick queries via WhatsApp.",
      value: data?.whatsapp,
      href: whatsappHref,
    },
  ];

  return (
    <div>
      {/* HERO */}
      <DarkSection
        className="border-b border-white/10"
        innerClassName="pt-[120px] md:pt-[140px] pb-20 md:pb-24"
        withBottomAnchor
      >
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            {heroBadge && (
              <div className="inline-flex items-center gap-2 mb-6 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7aa2ff]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/75">
                  {heroBadge}
                </span>
              </div>
            )}
            <h1
              className="font-extrabold mb-5 leading-[1.05] tracking-[-0.015em] text-white"
              style={{ fontSize: "clamp(2.25rem, 1.4rem + 2.6vw, 3.75rem)" }}
            >
              {heroHeading}
            </h1>
            <p className="text-base md:text-[17px] text-white/65 leading-relaxed font-light max-w-2xl mx-auto">
              {heroSubheading}
            </p>
          </div>
        </FadeIn>
      </DarkSection>

      {/* CONSULTATION + FORM */}
      <Section className="bg-surface">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* LEFT */}
          <FadeIn>
            <div>
              <span className="text-accent text-xs font-bold uppercase tracking-widest mb-6 block">
                Consultation
              </span>

              <h2 className="text-3xl md:text-5xl font-extrabold text-primary mb-6 leading-[1.08] tracking-tight">
                {data?.heading}
              </h2>

              <p className="text-base md:text-lg text-text-muted mb-10 leading-relaxed font-light max-w-2xl">
                {data?.subtext}
              </p>

              <ul className="space-y-4">
                {methods.map((m) => {
                  const Icon = m.icon;
                  const inner = (
                    <div className="relative flex h-full items-start gap-5 p-5 md:p-6">
                      <div className="relative shrink-0">
                        <span
                          aria-hidden
                          className="pointer-events-none absolute -inset-2 rounded-2xl bg-accent/15 blur-xl opacity-0 transition-opacity duration-[var(--rv-duration-slow)] ease-[var(--rv-ease-out)] group-hover:opacity-100"
                        />
                        <div className="relative w-12 h-12 rounded-xl border border-border bg-gradient-to-br from-white to-[#eef3ff] flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_14px_-6px_rgba(59,130,246,0.18)] transition-[transform,border-color,box-shadow] duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] group-hover:-translate-y-0.5 group-hover:border-accent/40 group-hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_10px_24px_-10px_rgba(59,130,246,0.42)]">
                          <Icon
                            className="w-5 h-5 text-accent transition-transform duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] group-hover:scale-110"
                            strokeWidth={1.85}
                          />
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="font-bold text-primary leading-snug">
                              {m.title}
                            </h4>
                            <p className="text-text-muted text-sm mt-1">
                              {m.description}
                            </p>
                          </div>
                          {m.href && (
                            <ArrowUpRight
                              aria-hidden
                              className="w-4 h-4 mt-1 shrink-0 text-text-muted/60 transition-[color,transform] duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                            />
                          )}
                        </div>
                        {m.value && (
                          <span className="mt-3 inline-block text-accent font-semibold text-[15px] transition-colors duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] group-hover:text-primary">
                            {m.value}
                          </span>
                        )}
                      </div>
                    </div>
                  );

                  const cardClass =
                    "group rv-card relative isolate block h-full overflow-hidden rounded-card border border-border bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2";

                  const isExternal = m.href?.startsWith("http");

                  return (
                    <li key={m.label}>
                      {m.href ? (
                        <a
                          href={m.href}
                          className={cardClass}
                          {...(isExternal
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          <span className="rv-card-glow" aria-hidden />
                          {inner}
                        </a>
                      ) : (
                        <div className={cardClass}>
                          <span className="rv-card-glow" aria-hidden />
                          {inner}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </FadeIn>

          <ScaleIn>
            <ContactForm services={data?.services ?? []} />
          </ScaleIn>
        </div>
      </Section>
    </div>
  );
}
