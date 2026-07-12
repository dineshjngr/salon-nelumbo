"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type SectionHeadingProps = {
  label: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      <motion.p
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease: easeOut }}
        className={`mb-5 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--muted)] ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="h-px w-8 bg-[var(--primary)]/45" />
        {label}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28, filter: shouldReduceMotion ? "none" : "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75, delay: 0.08, ease: easeOut }}
        className="font-serif text-[32px] font-semibold leading-[1] text-[var(--text)] md:text-[58px] lg:text-[70px]"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.65, delay: 0.2, ease: easeOut }}
          className={`mt-6 max-w-xl text-[15px] leading-7 text-[var(--muted)] md:text-base md:leading-8 ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
