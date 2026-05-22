import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Linkedin, Github, MapPin } from 'lucide-react';
import type { NavService } from '@/types';

export interface FooterSettings {
  footerDescription?: string;
  email?: string;
  addressLines?: string[];
  linkedinUrl?: string;
  whatsappUrl?: string;
  githubUrl?: string;
  privacyPolicyUrl?: string;
  termsUrl?: string;
}

interface FooterProps {
  settings?: FooterSettings | null;
  services?: NavService[];
}

const FALLBACK = {
  description:
    "Building scalable digital solutions for modern businesses. Positioning your company as a leader in the digital landscape.",
  email: "renevise.ltd@gmail.com",
  addressLines: ["Latifabad Unit 8, Hyderabad District", "Sindh, Pakistan"],
  linkedinUrl: "#",
  whatsappUrl: "https://wa.me/+923043673951",
  githubUrl: "https://github.com/Renevise",
};

const socialLinkClass =
  'group p-2 bg-white/5 rounded-full transition-[background-color,transform,box-shadow] duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] hover:bg-white/12 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-8px_rgba(122,162,255,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7aa2ff]/60';

const navLinkClass =
  'text-white/60 hover:text-white transition-colors duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] text-sm focus-visible:outline-none focus-visible:text-white';

export function Footer({ settings, services = [] }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const description = settings?.footerDescription ?? FALLBACK.description;
  const email = settings?.email ?? FALLBACK.email;
  const addressLines =
    settings?.addressLines && settings.addressLines.length > 0
      ? settings.addressLines
      : FALLBACK.addressLines;

  const linkedinUrl = settings?.linkedinUrl ?? FALLBACK.linkedinUrl;
  const whatsappUrl = settings?.whatsappUrl ?? FALLBACK.whatsappUrl;
  const githubUrl = settings?.githubUrl ?? FALLBACK.githubUrl;

  const privacyHref = settings?.privacyPolicyUrl ?? '#';
  const termsHref = settings?.termsUrl ?? '#';

  return (
    <footer className="bg-[#0d1234] text-white pt-20 pb-10 px-6 border-t border-white/10">
      <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 lg:gap-x-12 gap-y-12 mb-20">
          {/* BRAND */}
          <div className="md:col-span-4">
            <Link href="/" className="group inline-flex items-center gap-3 mb-6">
              <span
                className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#1a2554]/85 via-[#0f1640]/90 to-[#080d2a]/95 ring-1 ring-inset ring-white/[0.09] shadow-[0_6px_18px_-4px_rgba(59,130,246,0.45),0_2px_6px_-1px_rgba(0,0,0,0.4),inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-[transform,box-shadow] duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)] group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_28px_-4px_rgba(59,130,246,0.65),0_2px_6px_-1px_rgba(0,0,0,0.45),inset_0_1px_0_0_rgba(255,255,255,0.12)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(circle_at_30%_20%,rgba(96,165,250,0.18),transparent_60%)] opacity-70"
                />
                <Image
                  src="/logos/logo.png"
                  alt="Renevise"
                  width={48}
                  height={48}
                  className="relative h-[24px] w-[24px] object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
                />
              </span>
              <span className="text-xl font-extrabold uppercase tracking-tighter text-white leading-none">
                Renevise
              </span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-sm">
              {description}
            </p>
            <div className="flex gap-4">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={socialLinkClass}
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className={socialLinkClass}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={socialLinkClass}
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* SERVICES */}
          <div className="md:col-span-2">
            <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">
              Services
            </h4>
            <ul className="space-y-4">
              {services.length > 0
                ? services.map((s) => (
                    <li key={s.slug.current}>
                      <Link
                        href={`/services/${s.slug.current}`}
                        className={navLinkClass}
                      >
                        {s.title}
                      </Link>
                    </li>
                  ))
                : (
                  <>
                    <li>
                      <Link href="/services" className={navLinkClass}>
                        All Services
                      </Link>
                    </li>
                  </>
                )}
            </ul>
          </div>

          {/* COMPANY */}
          <div className="md:col-span-2">
            <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">
              Company
            </h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className={navLinkClass}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className={navLinkClass}>
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/contact" className={navLinkClass}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="md:col-span-4">
            <h4 className="font-bold mb-6 text-white uppercase text-xs tracking-widest">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <Mail className="w-4 h-4 shrink-0" />
                <a
                  href={`mailto:${email}`}
                  className="hover:text-white transition-colors duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)]"
                >
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 mt-1 shrink-0" />
                <span className="leading-relaxed">
                  {addressLines.map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < addressLines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/40 text-xs">
            © {currentYear} Renevise Consulting. All rights reserved.
          </p>
          <div className="flex gap-8">
            <a
              href={privacyHref}
              className="text-white/40 hover:text-white text-xs transition-colors duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)]"
            >
              Privacy Policy
            </a>
            <a
              href={termsHref}
              className="text-white/40 hover:text-white text-xs transition-colors duration-[var(--rv-duration-base)] ease-[var(--rv-ease-out)]"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
