import { cn } from "@/lib/utils";
import { HeroBackground } from "@/components/hero/HeroBackground";

interface DarkSectionProps {
  children: React.ReactNode;
  /** Outer <section> classes (padding, etc). */
  className?: string;
  /** Inner content wrapper classes (max-width / spacing). */
  innerClassName?: string;
  /**
   * When true, adds the soft bottom anchor gradient used by hero sections to
   * fade into the next (light) section without a hard seam.
   */
  withBottomAnchor?: boolean;
  /** Disable the centered max-width container (for callers that want full bleed inner control). */
  noContainer?: boolean;
}

/**
 * Shared dark premium section — the single source of truth for the
 * `bg-[#06092a]` + `<HeroBackground />` atmosphere used across heroes
 * and CTA blocks. Pages should compose their content inside this
 * wrapper instead of recreating the gradient/glow stack inline.
 */
export function DarkSection({
  children,
  className,
  innerClassName,
  withBottomAnchor = false,
  noContainer = false,
}: DarkSectionProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-[#06092a] text-white",
        className
      )}
    >
      <HeroBackground />

      {noContainer ? (
        children
      ) : (
        <div
          className={cn(
            "relative max-w-7xl 2xl:max-w-[1400px] mx-auto px-6",
            innerClassName
          )}
        >
          {children}
        </div>
      )}

      {withBottomAnchor && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-[#05071f]/60 to-[#04061a]"
        />
      )}
    </section>
  );
}
