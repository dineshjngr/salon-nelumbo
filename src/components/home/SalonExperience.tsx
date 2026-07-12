"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experienceSteps } from "@/src/data/experience";
import { GlassPanel } from "@/src/components/ui/GlassPanel";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

export function SalonExperience() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.08, 0.92], ["0%", "-48%"]);
  const progress = useTransform(scrollYProgress, [0.08, 0.92], ["0%", "100%"]);

  return (
    <section id="salon-experience" ref={ref} className="relative bg-[#F4EDF8] lg:h-[260vh]">
      <div className="sticky top-0 hidden h-screen overflow-hidden px-16 py-24 lg:block">
        <div className="mx-auto flex h-full max-w-[1440px] items-center gap-16">
          <div className="w-[36%] shrink-0">
            <SectionHeading
              label="Your Visit"
              title={<>From arrival<br /><span className="italic text-[#9B72B3]">to afterglow.</span></>}
              description="A calm, thoughtful experience designed around comfort, care and confidence."
            />
            <p className="mt-12 text-xs font-medium uppercase tracking-[0.18em] text-[var(--primary)]">Scroll to explore</p>
            <div className="mt-5 h-px w-full bg-[#542568]/15">
              <motion.div className="h-px bg-[var(--primary)]" style={{ width: progress }} />
            </div>
          </div>
          <motion.div className="flex gap-6" style={{ x: shouldReduceMotion ? "0%" : x }}>
            {experienceSteps.map((step) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="group relative h-[560px] w-[430px] shrink-0 overflow-hidden rounded-[32px] border border-white/50 bg-white/40">
                  <Image src={step.image} alt={step.alt} fill sizes="430px" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#271D2C]/78 via-[#271D2C]/20 to-transparent" />
                  <p className="absolute left-8 top-7 font-serif text-[82px] font-semibold text-white/45 transition group-hover:text-[var(--primary)]">{step.number}</p>
                  <GlassPanel className="absolute inset-x-6 bottom-6 rounded-[24px] p-6 transition duration-500 group-hover:-translate-y-2">
                    <Icon aria-hidden="true" className="mb-5 h-6 w-6 text-[var(--primary)] transition group-hover:rotate-6" />
                    <h3 className="font-serif text-4xl font-semibold text-[var(--text)]">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{step.text}</p>
                  </GlassPanel>
                </article>
              );
            })}
          </motion.div>
        </div>
      </div>

      <div className="px-[var(--site-gutter)] py-14 md:px-[clamp(24px,5vw,96px)] md:py-24 lg:hidden">
        <SectionHeading
          label="Your Visit"
          title={<>From arrival<br /><span className="italic text-[#9B72B3]">to afterglow.</span></>}
          description="A calm, thoughtful experience designed around comfort, care and confidence."
        />
        <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-4">
          {experienceSteps.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="relative h-[400px] w-[82vw] shrink-0 snap-start overflow-hidden rounded-[28px]">
                <Image src={step.image} alt={step.alt} fill sizes="82vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#271D2C]/82 to-transparent" />
                <GlassPanel className="absolute inset-x-5 bottom-5 rounded-[22px] p-5">
                  <Icon aria-hidden="true" className="mb-4 h-5 w-5 text-[var(--primary)]" />
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)]">{step.number}</p>
                  <h3 className="mt-2 font-serif text-3xl font-semibold text-[var(--text)]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{step.text}</p>
                </GlassPanel>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
