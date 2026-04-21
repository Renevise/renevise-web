"use client";

import dynamic from "next/dynamic";
import { processSteps } from "@/data";

const ProcessSection = dynamic(() => import("@/components/ProcessSection"), {
  ssr: false,
  loading: () => <div className="h-48" />,
});

export default function ProcessSectionWrapper() {
  return <ProcessSection steps={processSteps} />;
}
