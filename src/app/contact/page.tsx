import type { Metadata } from "next";
import { client } from "@/lib/sanity";
import groq from "groq";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact — Start Your Project",
  description:
    "Ready to modernize your technology stack? Get in touch with Renevise consultants for a discovery call. We respond within 2 hours.",
  path: "/contact",
});
import { Section } from "@/components/Section";
import { Mail, MessageSquare, ArrowRight, CheckCircle2, Phone } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import ScaleIn from "@/components/animations/ScaleIn";
import HoverCard from "@/components/animations/HoverCard";
import ContactForm from "@/components/ContactForm";

const query = groq`*[_type == "contact"][0]{
  heading,
  subtext,
  email,
  phone,
  whatsapp,
  services
}`;

export default async function Contact() {
  const data = await client.fetch(query);

  return (
    <div className="pt-[72px]">

      <Section className="bg-surface">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 2xl:gap-28 items-start">

          {/* LEFT */}
          <FadeIn>
            <div>

              <span className="text-accent text-xs font-bold uppercase tracking-widest mb-6 block">
                Consultation
              </span>

              <h1 className="text-4xl md:text-6xl 2xl:text-7xl font-extrabold text-primary mb-8 leading-tight">
                {data.heading}
              </h1>

              <p className="text-lg 2xl:text-xl text-text-muted mb-12 leading-relaxed font-light max-w-2xl">
                {data.subtext}
              </p>

              <div className="space-y-8">

                {/* EMAIL */}
                <HoverCard className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-border">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Email Inquiry</h4>
                    <p className="text-text-muted text-sm mb-2">Typically responds within 2 hours.</p>
                    <a href={`mailto:${data.email}`} className="text-accent font-bold hover:underline">
                      {data.email}
                    </a>
                  </div>
                </HoverCard>

                {/* PHONE */}
                <HoverCard className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-border">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Consultation Call</h4>
                    <p className="text-text-muted text-sm mb-2">Strategic discussions available.</p>
                    <a href={`tel:${data.phone}`} className="text-accent font-bold hover:underline">
                      {data.phone}
                    </a>
                  </div>
                </HoverCard>

                {/* WHATSAPP */}
                <HoverCard className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-border">
                    <MessageSquare className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Direct Message</h4>
                    <p className="text-text-muted text-sm mb-2">Quick queries via WhatsApp.</p>
                    <span className="text-accent font-bold">{data.whatsapp}</span>
                  </div>
                </HoverCard>

              </div>
            </div>
          </FadeIn>

          <ScaleIn>
            <ContactForm services={data.services} />
          </ScaleIn>
        </div>
      </Section>
    </div>
  );
}
