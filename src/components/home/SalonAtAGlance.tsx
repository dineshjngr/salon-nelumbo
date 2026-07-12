"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MapPin } from "lucide-react";
import { AnimatedCounter } from "@/src/components/ui/AnimatedCounter";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function SalonAtAGlance() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="bg-[#FAF7FC] px-[var(--site-gutter)] py-14 md:px-[clamp(24px,5vw,96px)] md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <SectionHeading
            label="Salon At A Glance"
            title={<>A quick look<br /><span className="italic text-[#9B72B3]">at the essentials.</span></>}
            description="Selected numbers that reflect the salon's packages, treatments and Dubai location."
          />
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, ease: easeOut }}
            className="max-w-xl text-sm leading-7 text-[var(--muted)] lg:ml-auto"
          >
            A simple visual summary of the salon&apos;s offerings and the calm, considered experience throughout the website.
          </motion.div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <AnimatedCounter value={10} suffix="+" label="Packages" description="Carefully selected appointment combinations." />
          <AnimatedCounter value={150} suffix="+" label="Treatments" description="A broad service mix across hair, beauty and relaxation." />
          <AnimatedCounter value={100} suffix="%" label="Care" description="Attentive service and considered salon details." />
          <motion.article
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 34, filter: shouldReduceMotion ? "none" : "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: easeOut }}
            className="group rounded-[28px] border border-[var(--border)] bg-white/66 p-7 shadow-[0_18px_60px_rgba(84,37,104,0.10)] backdrop-blur-[18px] transition duration-500 hover:-translate-y-1 hover:border-[rgba(84,37,104,0.28)] hover:shadow-[0_24px_65px_rgba(84,37,104,0.14)]"
          >
            <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">Location</p>
            <div className="mt-5 flex items-end gap-3">
              <MapPin className="h-6 w-6 text-[var(--primary)]" aria-hidden="true" />
              <span className="font-serif text-[48px] font-semibold leading-none text-[var(--primary)] sm:text-[56px] lg:text-[72px]">
                Dubai
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-[var(--muted)]">Salon Nelumbo welcomes guests in Dubai, United Arab Emirates.</p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
