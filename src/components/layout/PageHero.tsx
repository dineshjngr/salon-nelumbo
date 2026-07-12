 "use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SiteContainer } from "@/src/components/ui/SiteContainer";

const easeOut = [0.22, 1, 0.36, 1] as const;

type PageHeroProps = {
  label: string;
  title: ReactNode;
  description: string;
  image?: string;
  imageAlt?: string;
};

export function PageHero({
  label,
  title,
  description,
  image = "/images/gallery/salon-interior.jpg",
  imageAlt = "Salon Nelumbo interior",
}: PageHeroProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#FAF7FC] pb-16 pt-24 md:pb-24 md:pt-40">
      <div className="pointer-events-none absolute right-[8%] top-24 h-72 w-72 rounded-full bg-[#EDE3F2]/80 blur-3xl" aria-hidden="true" />
      <SiteContainer className="relative max-md:grid max-md:gap-8 md:grid md:items-end lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeOut }}
          className="max-md:order-1"
        >
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="mb-4 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--muted)] md:mb-5"
          >
            <span className="h-px w-8 bg-[var(--primary)]/45" />
            {label}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18, filter: shouldReduceMotion ? "none" : "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.05, ease: easeOut }}
            className="font-serif text-[38px] font-semibold leading-[0.94] text-[var(--text)] sm:text-[44px] md:text-[52px] md:leading-[0.96] lg:text-[78px]"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.12, ease: easeOut }}
            className="mt-5 max-w-2xl text-[15px] leading-7 text-[var(--muted)] sm:mt-6 md:mt-7 md:text-base md:leading-8 lg:text-lg"
          >
            {description}
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20, scale: shouldReduceMotion ? 1 : 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.08, ease: easeOut }}
          className="relative order-2 aspect-[4/5] overflow-hidden rounded-[32px] border border-white/60 bg-[#EDE3F2] shadow-[0_18px_55px_rgba(84,37,104,0.12)] md:aspect-[16/10] md:rounded-[34px]"
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#271D2C]/20 to-transparent" />
        </motion.div>
      </SiteContainer>
    </section>
  );
}
