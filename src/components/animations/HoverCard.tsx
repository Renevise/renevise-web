export default function HoverCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${className}`}
    >
      {children}
    </div>
  );
}