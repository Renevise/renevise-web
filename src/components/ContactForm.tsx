"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

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

    if (!email || !email.includes("@")) {
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
    <div className="bg-white p-8 md:p-12 rounded-card shadow-xl shadow-primary/5 border border-border relative">

      {submitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10"
        >
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-8 h-8 text-accent" />
          </div>

          <h3 className="text-2xl font-bold text-primary mb-4">
            Inquiry Received
          </h3>

          <p className="text-text-muted mb-8 max-w-sm mx-auto">
            A consultant will contact you shortly.
          </p>

          <button
            onClick={() => setSubmitted(false)}
            className="text-accent font-bold hover:underline"
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
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-theme">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted font-mono">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                placeholder="John Doe"
                className="w-full px-5 py-3 rounded-theme bg-surface border border-border focus:outline-none focus:border-accent/40 focus:bg-white transition-all text-primary text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted font-mono">
                Work Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="john@company.com"
                className="w-full px-5 py-3 rounded-theme bg-surface border border-border focus:outline-none focus:border-accent/40 focus:bg-white transition-all text-primary text-sm"
              />
            </div>

          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted font-mono">
              Service Required
            </label>
            <select
              name="service"
              className="w-full px-5 py-3 rounded-theme bg-surface border border-border focus:outline-none focus:border-accent/40 focus:bg-white transition-all text-primary text-sm"
            >
              {services?.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted font-mono">
              Project Brief
            </label>
            <textarea
              name="message"
              rows={4}
              placeholder="Describe your technical requirements..."
              className="w-full px-5 py-3 rounded-theme bg-surface border border-border focus:outline-none focus:border-accent/40 focus:bg-white transition-all text-primary text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-accent text-white rounded-theme font-bold transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 mt-4 disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Project Inquiry"}
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-center text-text-muted text-[10px] mt-4">
            By submitting this form, you agree to our privacy policy.
          </p>

        </form>
      )}
    </div>
  );
}