"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/src/components/ui/SectionHeading";
import { PackageCarousel } from "@/src/components/home/PackageCarousel";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function SignaturePackages() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="signature-packages" className="relative overflow-hidden bg-[#FAF7FC] px-[clamp(24px,5vw,96px)] py-24 lg:py-32">
      <div className="pointer-events-none absolute -right-24 top-24 h-72 w-72 rounded-full bg-[#EDE3F2]/70 blur-3xl" aria-hidden="true" />
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <SectionHeading
            label="Weekend Special"
            title={
              <>
                Choose your
                <br />
                <span className="italic text-[#9B72B3]">signature ritual.</span>
              </>
            }
            description="Ten carefully selected combinations for hair, nails, beauty and relaxation. Each package is available for AED 99."
          />
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: easeOut }}
            className="rounded-[28px] border border-[var(--border)] bg-white/65 p-8 shadow-[0_18px_60px_rgba(84,37,104,0.08)] backdrop-blur-md lg:ml-auto lg:max-w-md"
          >
            <p className="font-serif text-[72px] font-semibold leading-none text-[var(--primary)]">AED 99</p>
            <p className="mt-3 text-sm font-medium uppercase tracking-[0.12em] text-[var(--text)]">Per selected package</p>
            <p className="mt-5 text-sm leading-7 text-[var(--muted)]">Offer availability may change. Contact the salon before visiting.</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.75, ease: easeOut }}
          className="mt-16"
        >
          <PackageCarousel />
        </motion.div>
      </div>
    </section>
  );
}
