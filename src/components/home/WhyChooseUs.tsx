"use client";

import { useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ImageReveal } from "@/src/components/ui/ImageReveal";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

const benefits = [
  ["Personal attention", "Beauty care shaped around your preferred finish.", "/images/why-us/personal-care.jpg"],
  ["Professional beauty care", "Focused services for hair, nails, skin and relaxation.", "/images/why-us/quality-products.jpg"],
  ["Clean and comfortable environment", "A calm space prepared with hygiene in mind.", "/images/why-us/clean-space.jpg"],
  ["Quality products", "Products selected to support polished salon results.", "/images/why-us/quality-products.jpg"],
  ["Relaxed appointment experience", "A quieter rhythm for everyday self-care.", "/images/why-us/main-salon.jpg"],
  ["Easy WhatsApp booking", "Book or ask questions directly from your phone.", "/images/why-us/personal-care.jpg"],
];

export function WhyChooseUs() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const yMain = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-18, 18]);
  const yFloat = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [24, -24]);

  return (
    <section id="why-us" className="overflow-hidden bg-white px-[var(--site-gutter)] py-14 md:px-[clamp(24px,5vw,96px)] md:py-24 lg:py-32">
      <div className="mx-auto grid max-w-[1440px] gap-14 lg:grid-cols-[1fr_0.95fr] lg:items-center">
        <div className="relative">
          <motion.div style={{ y: yMain }}>
            <ImageReveal src="/images/why-us/main-salon.jpg" alt="Elegant Salon Nelumbo-inspired salon interior" sizes="(min-width:1024px) 50vw, 100vw" className="aspect-[4/5] rounded-[34px]" />
          </motion.div>
          <motion.div style={{ y: yFloat }} className="absolute -bottom-8 right-4 w-[45%] overflow-hidden rounded-[28px] border-8 border-white shadow-[0_18px_55px_rgba(84,37,104,0.16)]">
            <ImageReveal src={benefits[active][2]} alt={`${benefits[active][0]} preview`} sizes="28vw" className="aspect-[4/5]" />
          </motion.div>
        </div>
        <div>
          <SectionHeading
            label="Why Salon Nelumbo"
            title={<>Care you can<br /><span className="italic text-[#9B72B3]">feel in every detail.</span></>}
          />
          <div className="mt-10 divide-y divide-[var(--border)]">
            {benefits.map(([title, description], index) => (
              <button
                key={title}
                type="button"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="group relative flex w-full items-center gap-5 py-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
              >
                <span className="absolute left-0 top-0 h-px w-0 bg-[var(--primary)] transition-all duration-500 group-hover:w-full" />
                <span className="font-serif text-3xl font-semibold text-[var(--primary)]/35 transition group-hover:text-[var(--primary)]">{String(index + 1).padStart(2, "0")}</span>
                <span className="transition duration-300 group-hover:translate-x-2">
                  <span className="block font-serif text-[26px] font-semibold text-[var(--text)] md:text-3xl">{title}</span>
                  <span className="mt-1 block text-[13px] leading-6 text-[var(--muted)] md:text-sm">{description}</span>
                </span>
                <ArrowUpRight aria-hidden="true" className="ml-auto h-5 w-5 text-[var(--primary)] transition group-hover:rotate-45" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
