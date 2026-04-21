import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

export { SectionTitle } from "./SectionTitle";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
  dark?: boolean;
}

export function Section({
  children,
  className,
  id,
  containerClassName,
  dark,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-24 px-6 md:py-32",
        dark ? "bg-primary text-white" : "bg-white text-slate-900 font-sans",
        className
      )}
    >
      <div className={cn("max-w-7xl mx-auto", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
