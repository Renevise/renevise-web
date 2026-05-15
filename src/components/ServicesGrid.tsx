"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Globe, Smartphone, Sparkles, type LucideIcon } from "lucide-react";
import { urlFor } from "@/lib/sanityImage";

const iconMap: Record<string, LucideIcon> = {
  web: Globe,
  mobile: Smartphone,
  ai: Sparkles,
};

type Service = {
  _id: string;
  title: string;
  description?: string;
  icon?: string;
  image?: unknown;
  slug?: string;
  techTags?: string[];
};

/* ---------- Visual: Web Development (marquee tech chips) ---------- */

type ChipVariant = "solid" | "ghost" | "outline";

function Chip({
  label,
  variant = "ghost",
  size = "md",
}: {
  label: string;
  variant?: ChipVariant;
  size?: "sm" | "md";
}) {
  const sizing =
    size === "sm"
      ? "px-2 py-0.5 text-[8px]"
      : "px-2.5 py-1 text-[9px]";
  const palette =
    variant === "solid"
      ? "bg-accent text-white shadow-[0_4px_12px_-4px_rgba(59,130,246,0.5)]"
      : variant === "outline"
      ? "bg-white text-primary border border-primary/15 shadow-sm"
      : "bg-white text-primary/70 border border-primary/10";
  return (
    <span
      className={`inline-flex items-center rounded-full font-bold tracking-[0.12em] uppercase whitespace-nowrap ${sizing} ${palette}`}
    >
      {label}
    </span>
  );
}

function MarqueeRow({
  tags,
  direction = "left",
  duration,
  size = "md",
  emphasisIndex = -1,
  outlineIndex = -1,
  gapClass = "gap-2",
  trailingClass = "pr-2",
  className = "",
}: {
  tags: string[];
  direction?: "left" | "right";
  duration: number;
  size?: "sm" | "md";
  emphasisIndex?: number;
  outlineIndex?: number;
  gapClass?: string;
  trailingClass?: string;
  className?: string;
}) {
  const animClass =
    direction === "right" ? "rv-marquee-right" : "rv-marquee-left";

  const renderChips = (keyPrefix: string) =>
    tags.map((t, i) => (
      <Chip
        key={`${keyPrefix}-${i}`}
        label={t}
        size={size}
        variant={
          i === emphasisIndex
            ? "solid"
            : i === outlineIndex
            ? "outline"
            : "ghost"
        }
      />
    ));

  return (
    <div className={`flex overflow-hidden ${className}`}>
      <div
        className={`flex shrink-0 ${animClass}`}
        style={
          { "--rv-marquee-duration": `${duration}s` } as CSSProperties
        }
      >
        <div className={`flex shrink-0 ${gapClass} ${trailingClass}`}>
          {renderChips("a")}
        </div>
        <div
          className={`flex shrink-0 ${gapClass} ${trailingClass}`}
          aria-hidden="true"
        >
          {renderChips("b")}
        </div>
      </div>
    </div>
  );
}

function WebDevVisual({ tags }: { tags: string[] }) {
  // Three rows drift at different speeds and directions for a layered marquee.
  // Each row uses a rotated ordering of the tag list so the seams don't sync.
  const row1Tags = tags;
  const row2Tags = [...tags.slice(2), ...tags.slice(0, 2)];
  const row3Tags = [...tags].reverse();

  return (
    <div
      className="hidden lg:flex flex-1 items-center justify-center my-2 relative pointer-events-none select-none -mx-2"
      aria-hidden="true"
    >
      <div className="w-full flex flex-col gap-2.5">
        <MarqueeRow
          tags={row1Tags}
          direction="left"
          duration={32}
          size="sm"
          emphasisIndex={2}
          gapClass="gap-1.5"
          trailingClass="pr-1.5"
          className="-translate-x-8 opacity-55"
        />
        <MarqueeRow
          tags={row2Tags}
          direction="right"
          duration={44}
          size="md"
          emphasisIndex={1}
          outlineIndex={3}
          gapClass="gap-2"
          trailingClass="pr-2"
          className="translate-x-3"
        />
        <MarqueeRow
          tags={row3Tags}
          direction="left"
          duration={38}
          size="sm"
          emphasisIndex={3}
          gapClass="gap-1.5"
          trailingClass="pr-1.5"
          className="-translate-x-5 opacity-65"
        />
      </div>
    </div>
  );
}

/* ---------- Visual: Mobile App Development (stacked phones) ---------- */

function PhoneMockup({
  className = "",
  variant = "front",
}: {
  className?: string;
  variant?: "back" | "front";
}) {
  const isBack = variant === "back";
  return (
    <div
      className={`rounded-[1rem] ${
        isBack
          ? "border-[1.5px] border-primary/30 bg-white/35"
          : "border-[1.5px] border-primary/25 bg-white shadow-[0_18px_36px_-14px_rgba(18,25,69,0.45)]"
      } ${className}`}
    >
      {/* speaker bar / notch */}
      <div
        className="absolute top-[6px] left-1/2 -translate-x-1/2 w-5 h-[3px] rounded-full bg-primary/30"
      />
      {/* screen content — front only */}
      {!isBack && (
        <>
          <div className="absolute top-[16px] left-2 right-2 h-[9px] rounded-[3px] bg-accent" />
          <div className="absolute top-[30px] left-2 right-3 h-[3px] rounded-full bg-primary/15" />
          <div className="absolute top-[37px] left-2 right-5 h-[3px] rounded-full bg-primary/12" />
          <div className="absolute bottom-2 left-2 right-2 h-[12px] rounded-[5px] bg-accent/15" />
        </>
      )}
    </div>
  );
}

function MobileAppVisual() {
  return (
    <div
      className="hidden lg:flex flex-1 items-center justify-center relative pointer-events-none select-none py-3"
      aria-hidden="true"
    >
      <div className="relative w-[140px] h-[128px] rv-phone-float">
        <PhoneMockup
          variant="back"
          className="absolute left-[14px] top-0 w-[60px] h-[120px] -rotate-[10deg]"
        />
        <PhoneMockup
          variant="front"
          className="absolute left-[56px] top-[6px] w-[68px] h-[122px] rotate-[5deg]"
        />
      </div>
    </div>
  );
}

/* ---------- Visual: AI Content (orbit / satellites) ----------
 * Logo assets expected at:
 *   /public/logos/higgsfield.png   (center, inside blue card)
 *   /public/logos/runway.png       (top satellite)
 *   /public/logos/midjourney.png   (left satellite)
 *   /public/logos/sora.png         (right satellite)
 * Drop the official brand logos there. PNG with transparent background
 * works best for the satellites; the center logo sits on the accent card.
 */

function Satellite({
  src,
  label,
  className,
}: {
  src: string;
  label: string;
  className: string;
}) {
  return (
    <div
      className={`absolute w-9 h-9 rounded-lg bg-white border border-primary/10 shadow-[0_6px_14px_-6px_rgba(18,25,69,0.28)] flex items-center justify-center overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={label}
        width={28}
        height={28}
        className="w-[22px] h-[22px] object-contain"
        unoptimized
      />
    </div>
  );
}

function AIContentVisual() {
  return (
    <div
      className="hidden lg:flex flex-1 items-center justify-center my-2 relative pointer-events-none select-none"
    >
      <div className="relative w-[180px] h-[150px]">
        {/* orbit rings */}
        <svg
          viewBox="0 0 180 150"
          className="absolute inset-0 w-full h-full text-primary/15"
          aria-hidden="true"
        >
          <g className="rv-orbit-ring" style={{ transformOrigin: "90px 75px" }}>
            <ellipse
              cx="90"
              cy="75"
              rx="78"
              ry="58"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
          </g>
          <ellipse
            cx="90"
            cy="75"
            rx="52"
            ry="40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>

        {/* center: Higgsfield — primary node */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-xl bg-accent flex items-center justify-center shadow-[0_12px_28px_-8px_rgba(59,130,246,0.6)] overflow-hidden"
        >
          <Image
            src="/logos/higgsfield.png"
            alt="Higgsfield"
            width={44}
            height={44}
            className="w-9 h-9 object-contain"
            unoptimized
          />
        </div>

        {/* satellites */}
        <Satellite
          src="/logos/runway.png"
          label="RunwayML"
          className="top-0 left-1/2 -translate-x-1/2 rv-orbit-float-a"
        />
        <Satellite
          src="/logos/midjourney.png"
          label="MidJourney"
          className="top-1/2 left-0 -translate-y-1/2 rv-orbit-float-b"
        />
        <Satellite
          src="/logos/sora.png"
          label="Sora"
          className="top-1/2 right-0 -translate-y-1/2 rv-orbit-float-c"
        />
      </div>
    </div>
  );
}

/* ---------- Visual dispatcher ---------- */

function ServiceVisual({
  iconKey,
  techTags,
}: {
  iconKey: string;
  techTags: string[];
}) {
  if (iconKey === "mobile") return <MobileAppVisual />;
  if (iconKey === "ai") return <AIContentVisual />;
  return <WebDevVisual tags={techTags} />;
}

/* ---------- Defaults for the Web tile chips ---------- */

const DEFAULT_WEB_TAGS = [
  "React",
  "Next.js",
  "SEO",
  "Edge",
  "SSR",
  "APIs",
  "TS",
];

/* ---------- Main grid ---------- */

export default function ServicesGrid({ services }: { services: Service[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!services?.length) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:min-h-[420px]">
      {services.map((service, idx) => {
        const iconKey = service.icon ?? "web";
        const Icon = iconMap[iconKey] ?? Globe;
        const step = String(idx + 1).padStart(2, "0");
        const imageUrl = service.image
          ? urlFor(service.image).width(1200).quality(85).url()
          : null;
        const isActive = idx === activeIndex;
        const webTags =
          service.techTags && service.techTags.length > 0
            ? service.techTags
            : DEFAULT_WEB_TAGS;

        return (
          <Link
            key={service._id}
            href={service.slug ? `/services/${service.slug}` : "/services"}
            onMouseEnter={() => setActiveIndex(idx)}
            onFocus={() => setActiveIndex(idx)}
            aria-label={service.title}
            className={`group relative min-h-[280px] lg:min-h-0 overflow-hidden rounded-card bg-[#eef1f9] border border-border transition-[flex] duration-500 ease-out flex-1 ${
              isActive ? "lg:flex-[2.4]" : "lg:flex-1"
            }`}
          >
            {imageUrl && (
              <Image
                src={imageUrl}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className={`object-cover transition-opacity duration-500 ${
                  isActive ? "lg:opacity-100 opacity-0" : "opacity-0"
                }`}
              />
            )}

            <div
              className={`absolute inset-0 transition-opacity duration-500 ${
                isActive ? "lg:opacity-100 opacity-0" : "opacity-0"
              } bg-gradient-to-b from-primary/70 via-primary/85 to-primary/95`}
            />

            <div
              className={`pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl transition-opacity duration-500 ${
                isActive ? "lg:opacity-60 opacity-0" : "opacity-0"
              } bg-accent/20`}
            />

            <div className="relative h-full flex flex-col p-8 md:p-10">
              <div className="flex items-start justify-between">
                <div
                  className={`w-10 h-10 rounded-theme flex items-center justify-center transition-colors duration-500 ${
                    isActive ? "lg:bg-white/10 bg-white" : "bg-white"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-500 ${
                      isActive ? "lg:text-white text-accent" : "text-accent"
                    }`}
                    strokeWidth={1.75}
                  />
                </div>
                <span
                  className={`text-xs font-semibold tracking-[0.2em] transition-colors duration-500 ${
                    isActive
                      ? "lg:text-white/60 text-text-muted"
                      : "text-text-muted"
                  }`}
                >
                  {step}
                </span>
              </div>

              {!isActive && (
                <ServiceVisual iconKey={iconKey} techTags={webTags} />
              )}
              {isActive && (
                <div className="hidden lg:block flex-1" aria-hidden="true" />
              )}

              <div>
                <h3
                  className={`font-bold transition-all duration-500 mb-2 ${
                    isActive
                      ? "lg:text-white lg:text-2xl text-primary text-xl"
                      : "text-primary text-xl"
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`text-sm transition-all duration-500 lg:max-w-md ${
                    isActive
                      ? "lg:text-white/80 lg:opacity-100 lg:translate-y-0 text-text-muted opacity-100 translate-y-0"
                      : "text-text-muted lg:opacity-0 lg:translate-y-2 opacity-100 translate-y-0"
                  }`}
                >
                  {service.description}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
