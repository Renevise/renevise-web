"use client";

import { motion } from "motion/react";

export default function ProcessSection({ steps }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
      {steps.map((step: any, idx: number) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="relative"
        >
          <div className="text-5xl font-black text-white/10 mb-6 font-mono">
            {step.number}
          </div>
          <h3 className="text-xl font-bold mb-4">{step.title}</h3>
          <p className="text-white/60 text-sm">{step.description}</p>
        </motion.div>
      ))}
    </div>
  );
}