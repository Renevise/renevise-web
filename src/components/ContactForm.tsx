"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { HeroBackgroundCard } from "@/components/HeroBackgroundCard";

export default function ContactForm({ services }: { services: string[] }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const service = formData.get("service")?.toString();
    const message = formData.get("message")?.toString().trim();

    // 🔴 VALIDATION
    if (!name || name.length < 3) {
      return setError("Please enter a valid name.");
    }

    // if (!email || !email.includes("@")) {
    //   return setError("Please enter a valid email address.");
    // }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      return setError("Please enter a valid email address.");
    }

    if (!message || message.length < 10) {
      return setError("Project brief must be at least 10 characters.");
    }

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, service, message, website: formData.get("website")?.toString() ?? "" }),
      });

      if (!res.ok) throw new Error("Failed");

      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <HeroBackgroundCard noHover>
      <div className="p-8 md:p-12">

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
          >
            <div className="w-16 h-16 bg-white/10 border border-white/15 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="w-8 h-8 text-[#7aa2ff]" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">
              Inquiry Received
            </h3>

            <p className="text-white/70 mb-8 max-w-sm mx-auto">
              A consultant will contact you shortly.
            </p>

            <button
              onClick={() => setSubmitted(false)}
              className="text-[#7aa2ff] font-bold hover:underline"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Honeypot — hidden from real users, bots fill it */}
            <input
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
            />

            {/* ERROR MESSAGE */}
            {error && (
              <div className="bg-red-500/10 border border-red-400/40 text-red-200 text-sm px-4 py-3 rounded-theme">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 font-mono">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-5 py-3 rounded-theme bg-white/[0.06] border border-white/15 focus:outline-none focus:border-accent/60 focus:bg-white/[0.1] transition-all text-white placeholder-white/40 text-sm backdrop-blur-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 font-mono">
                  Work Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="john@company.com"
                  className="w-full px-5 py-3 rounded-theme bg-white/[0.06] border border-white/15 focus:outline-none focus:border-accent/60 focus:bg-white/[0.1] transition-all text-white placeholder-white/40 text-sm backdrop-blur-sm"
                />
              </div>

            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 font-mono">
                Service Required
              </label>
              <select
                name="service"
                className="w-full px-5 py-3 rounded-theme bg-white/[0.06] border border-white/15 focus:outline-none focus:border-accent/60 focus:bg-white/[0.1] transition-all text-white text-sm backdrop-blur-sm"
              >
                {services?.map((s) => (
                  <option key={s} className="bg-[#06092a] text-white">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-white/60 font-mono">
                Project Brief
              </label>
              <textarea
                name="message"
                rows={4}
                placeholder="Describe your technical requirements..."
                className="w-full px-5 py-3 rounded-theme bg-white/[0.06] border border-white/15 focus:outline-none focus:border-accent/60 focus:bg-white/[0.1] transition-all text-white placeholder-white/40 text-sm backdrop-blur-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group/btn relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1e2b7a] py-4 font-bold text-white shadow-[0_10px_30px_-10px_rgba(59,130,246,0.65)] transition-all duration-300 hover:shadow-[0_18px_40px_-10px_rgba(59,130,246,0.85)] flex items-center justify-center gap-2 mt-4 disabled:opacity-60 disabled:hover:shadow-[0_10px_30px_-10px_rgba(59,130,246,0.65)]"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full"
              />
              <span className="relative">{loading ? "Sending..." : "Send Project Inquiry"}</span>
              <ArrowRight className="relative w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
            </button>

            <p className="text-center text-white/50 text-[10px] mt-4">
              By submitting this form, you agree to our privacy policy.
            </p>

          </form>
        )}
      </div>
    </HeroBackgroundCard>
  );
}