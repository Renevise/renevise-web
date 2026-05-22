/**
 * Minimal premium card wrapper — applies the shared `rv-card` hover
 * interaction (lift, layered shadow, border highlight) without altering
 * the consumer's layout. Pass any layout/visual classes through `className`.
 */
export default function HoverCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`group rv-card ${className}`}>
      {children}
    </div>
  );
}
