/**
 * Static, theme-aware abstract illustrations used on the right side of
 * the dark "What We Can Do For You" section.
 *
 * No external imagery — pure SVG so it scales cleanly on 2K/ultrawide
 * and stays in the navy/blue palette.
 */
import { cn } from "@/lib/utils";

interface Props {
  variant?: "web" | "mobile" | "ai" | "default";
  className?: string;
}

export function CapabilityIllustration({ variant = "default", className }: Props) {
  return (
    <div
      className={cn(
        "relative aspect-square w-full rounded-card overflow-hidden border border-[#1a2670]/45",
        className
      )}
      style={{
        backgroundColor: "#06092a",
        backgroundImage:
          "radial-gradient(circle at 30% 20%, rgba(59,130,246,0.22), transparent 55%), radial-gradient(circle at 75% 80%, rgba(122,162,255,0.14), transparent 60%)",
        boxShadow:
          "0 30px 60px -25px rgba(18,25,69,0.45), 0 18px 40px -22px rgba(59,130,246,0.22), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      <Grid />
      {variant === "web" && <WebSvg />}
      {variant === "mobile" && <MobileSvg />}
      {variant === "ai" && <AiSvg />}
      {variant === "default" && <DefaultSvg />}
    </div>
  );
}

function Grid() {
  return (
    <svg
      aria-hidden
      className="absolute inset-0 w-full h-full text-white/[0.06]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="rv-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#rv-grid)" />
    </svg>
  );
}

function WebSvg() {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Browser window */}
      <g>
        <rect x="60" y="80" width="280" height="200" rx="10" fill="#0f1638" stroke="#3b82f6" strokeOpacity="0.35" />
        <rect x="60" y="80" width="280" height="28" rx="10" fill="#1a2260" />
        <circle cx="76" cy="94" r="4" fill="#3b82f6" fillOpacity="0.7" />
        <circle cx="90" cy="94" r="4" fill="#3b82f6" fillOpacity="0.4" />
        <circle cx="104" cy="94" r="4" fill="#3b82f6" fillOpacity="0.25" />

        {/* "Code" lines */}
        <rect x="76" y="124" width="120" height="8" rx="2" fill="#3b82f6" fillOpacity="0.55" />
        <rect x="76" y="142" width="190" height="6" rx="2" fill="#ffffff" fillOpacity="0.18" />
        <rect x="76" y="156" width="150" height="6" rx="2" fill="#ffffff" fillOpacity="0.14" />
        <rect x="76" y="170" width="220" height="6" rx="2" fill="#ffffff" fillOpacity="0.18" />
        <rect x="76" y="184" width="90" height="6" rx="2" fill="#3b82f6" fillOpacity="0.4" />

        {/* Right-side panel */}
        <rect x="220" y="124" width="90" height="60" rx="6" fill="#3b82f6" fillOpacity="0.12" stroke="#3b82f6" strokeOpacity="0.35" />
        <rect x="232" y="140" width="50" height="6" rx="2" fill="#ffffff" fillOpacity="0.25" />
        <rect x="232" y="154" width="66" height="6" rx="2" fill="#ffffff" fillOpacity="0.18" />
        <rect x="232" y="168" width="34" height="6" rx="2" fill="#3b82f6" fillOpacity="0.6" />

        {/* Bottom indicators */}
        <rect x="76" y="210" width="80" height="38" rx="6" fill="#3b82f6" fillOpacity="0.15" />
        <rect x="166" y="210" width="80" height="38" rx="6" fill="#ffffff" fillOpacity="0.05" />
        <rect x="256" y="210" width="60" height="38" rx="6" fill="#ffffff" fillOpacity="0.05" />
      </g>

      {/* Floating accent badge */}
      <g transform="translate(286,42)">
        <rect width="78" height="34" rx="17" fill="#3b82f6" fillOpacity="0.18" stroke="#3b82f6" strokeOpacity="0.5" />
        <circle cx="18" cy="17" r="5" fill="#3b82f6" />
        <rect x="30" y="13" width="40" height="6" rx="2" fill="#ffffff" fillOpacity="0.7" />
        <rect x="30" y="22" width="28" height="4" rx="2" fill="#ffffff" fillOpacity="0.4" />
      </g>

      <g transform="translate(36,302)">
        <rect width="120" height="40" rx="20" fill="#0f1638" stroke="#3b82f6" strokeOpacity="0.4" />
        <circle cx="22" cy="20" r="6" fill="#3b82f6" />
        <rect x="36" y="14" width="60" height="6" rx="2" fill="#ffffff" fillOpacity="0.6" />
        <rect x="36" y="24" width="40" height="5" rx="2" fill="#ffffff" fillOpacity="0.35" />
      </g>
    </svg>
  );
}

function MobileSvg() {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Back phone */}
      <g transform="translate(80,60) rotate(-6 70 130)" opacity="0.55">
        <rect width="140" height="260" rx="22" fill="#0f1638" stroke="#3b82f6" strokeOpacity="0.3" />
        <rect x="12" y="18" width="116" height="224" rx="10" fill="#1a2260" />
        <rect x="24" y="34" width="60" height="6" rx="2" fill="#3b82f6" fillOpacity="0.5" />
        <rect x="24" y="48" width="92" height="4" rx="2" fill="#ffffff" fillOpacity="0.25" />
      </g>

      {/* Front phone */}
      <g transform="translate(170,40) rotate(6 70 140)">
        <rect width="150" height="280" rx="24" fill="#0f1638" stroke="#3b82f6" strokeOpacity="0.5" />
        <rect x="12" y="20" width="126" height="240" rx="12" fill="#1a2260" />

        {/* Status row */}
        <rect x="56" y="28" width="38" height="5" rx="2" fill="#ffffff" fillOpacity="0.35" />

        {/* Header */}
        <rect x="24" y="50" width="76" height="9" rx="3" fill="#ffffff" fillOpacity="0.7" />
        <rect x="24" y="64" width="50" height="6" rx="2" fill="#3b82f6" fillOpacity="0.6" />

        {/* Card 1 */}
        <rect x="24" y="86" width="102" height="50" rx="8" fill="#3b82f6" fillOpacity="0.18" stroke="#3b82f6" strokeOpacity="0.45" />
        <rect x="34" y="98" width="58" height="6" rx="2" fill="#ffffff" fillOpacity="0.7" />
        <rect x="34" y="110" width="42" height="5" rx="2" fill="#ffffff" fillOpacity="0.4" />
        <circle cx="112" cy="111" r="6" fill="#3b82f6" fillOpacity="0.7" />

        {/* Card 2 */}
        <rect x="24" y="146" width="102" height="50" rx="8" fill="#ffffff" fillOpacity="0.06" stroke="#ffffff" strokeOpacity="0.15" />
        <rect x="34" y="158" width="48" height="6" rx="2" fill="#ffffff" fillOpacity="0.5" />
        <rect x="34" y="170" width="62" height="5" rx="2" fill="#ffffff" fillOpacity="0.3" />

        {/* Tab bar */}
        <rect x="20" y="222" width="110" height="28" rx="14" fill="#0a1234" stroke="#3b82f6" strokeOpacity="0.3" />
        <circle cx="38" cy="236" r="5" fill="#3b82f6" />
        <circle cx="64" cy="236" r="4" fill="#ffffff" fillOpacity="0.4" />
        <circle cx="86" cy="236" r="4" fill="#ffffff" fillOpacity="0.4" />
        <circle cx="108" cy="236" r="4" fill="#ffffff" fillOpacity="0.4" />
      </g>

      {/* Floating chip */}
      <g transform="translate(40,300)">
        <rect width="112" height="34" rx="17" fill="#3b82f6" fillOpacity="0.18" stroke="#3b82f6" strokeOpacity="0.5" />
        <rect x="14" y="13" width="84" height="6" rx="2" fill="#ffffff" fillOpacity="0.7" />
        <rect x="14" y="22" width="44" height="4" rx="2" fill="#ffffff" fillOpacity="0.4" />
      </g>
    </svg>
  );
}

function AiSvg() {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Central node */}
      <g transform="translate(200,200)">
        <circle r="46" fill="#3b82f6" fillOpacity="0.18" stroke="#3b82f6" strokeOpacity="0.6" />
        <circle r="28" fill="#3b82f6" fillOpacity="0.35" />
        <circle r="12" fill="#ffffff" fillOpacity="0.85" />
      </g>

      {/* Outer ring + satellite nodes */}
      <g fill="none" stroke="#3b82f6" strokeOpacity="0.35">
        <circle cx="200" cy="200" r="120" />
        <circle cx="200" cy="200" r="80" strokeDasharray="3 4" />
      </g>

      {/* Connecting lines */}
      <g stroke="#3b82f6" strokeOpacity="0.45" strokeWidth="1">
        <line x1="200" y1="200" x2="80" y2="120" />
        <line x1="200" y1="200" x2="320" y2="120" />
        <line x1="200" y1="200" x2="80" y2="280" />
        <line x1="200" y1="200" x2="320" y2="280" />
        <line x1="200" y1="200" x2="200" y2="60" />
        <line x1="200" y1="200" x2="200" y2="340" />
      </g>

      {/* Nodes with labels */}
      <NodeBadge x={66} y={104} label="VIDEO" />
      <NodeBadge x={306} y={104} label="IMAGE" />
      <NodeBadge x={66} y={266} label="VOICE" />
      <NodeBadge x={306} y={266} label="TEXT" />
      <NodeBadge x={170} y={42} label="BRAND" />
      <NodeBadge x={170} y={336} label="SOCIAL" />
    </svg>
  );
}

function NodeBadge({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect width="70" height="26" rx="13" fill="#0f1638" stroke="#3b82f6" strokeOpacity="0.5" />
      <circle cx="14" cy="13" r="4" fill="#3b82f6" />
      <text
        x="22"
        y="17"
        fontFamily="Inter, sans-serif"
        fontSize="9"
        fontWeight="700"
        letterSpacing="1.5"
        fill="#ffffff"
        fillOpacity="0.8"
      >
        {label}
      </text>
    </g>
  );
}

function DefaultSvg() {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke="#3b82f6" strokeOpacity="0.4">
        <circle cx="200" cy="200" r="60" />
        <circle cx="200" cy="200" r="110" strokeDasharray="3 5" />
        <circle cx="200" cy="200" r="160" strokeOpacity="0.18" />
      </g>
      <circle cx="200" cy="200" r="14" fill="#3b82f6" fillOpacity="0.7" />
    </svg>
  );
}
