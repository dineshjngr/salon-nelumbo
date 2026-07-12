"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

const comparisons = [
  { label: "Hair Colour", before: "/images/before-after/hair-before.jpg", after: "/images/before-after/hair-after.jpg" },
  { label: "Hair Styling", before: "/images/before-after/styling-before.jpg", after: "/images/before-after/styling-after.jpg" },
  { label: "Facial Glow", before: "/images/before-after/facial-before.jpg", after: "/images/before-after/facial-after.jpg" },
];

export function BeforeAfter() {
  const [active, setActive] = useState(0);
  const [value, setValue] = useState(52);
  const shouldReduceMotion = useReducedMotion();
  const item = comparisons[active];

  return (
    <section id="before-after" className="relative overflow-hidden bg-[#FAF7FC] px-[var(--site-gutter)] py-14 md:px-[clamp(24px,5vw,96px)] md:py-24 lg:py-32">
      <div className="absolute left-[8%] top-32 h-72 w-72 rounded-full bg-[#EDE3F2]/75 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div>
          <SectionHeading
            label="Real Transformation"
            title={<>Slide to see<br /><span className="italic text-[#9B72B3]">the difference.</span></>}
            description="Explore a visual preview of selected hair and beauty transformations."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            {comparisons.map((comparison, index) => (
              <button
                key={comparison.label}
                type="button"
                onClick={() => setActive(index)}
                className={`min-h-11 rounded-full border px-5 text-sm font-medium transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)] ${
                  active === index ? "border-[var(--primary)] bg-[var(--primary)] text-white shadow-[0_12px_35px_rgba(84,37,104,0.18)]" : "border-[var(--border)] bg-white/70 text-[var(--primary)] hover:-translate-y-1"
                }`}
              >
                {comparison.label}
              </button>
            ))}
          </div>
          <p className="mt-8 text-sm leading-7 text-[var(--muted)]">Images are illustrative. Individual results may vary.</p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[34px] border border-white/60 bg-white/60 p-3 shadow-[0_22px_70px_rgba(84,37,104,0.12)]"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] select-none">
            <Image src={item.before} alt={`${item.label} before illustrative preview`} fill sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" draggable={false} />
            <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
              <Image src={item.after} alt={`${item.label} after illustrative preview`} fill sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" draggable={false} />
            </div>
            <span className="absolute left-5 top-5 rounded-full bg-white/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--text)] backdrop-blur">After</span>
            <span className="absolute right-5 top-5 rounded-full bg-white/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--text)] backdrop-blur">Before</span>
            <div className="absolute inset-y-0 w-0.5 bg-[var(--primary)]" style={{ left: `${value}%` }} />
            <div className="absolute top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/80 font-serif text-lg font-semibold text-[var(--primary)] shadow-lg backdrop-blur" style={{ left: `${value}%` }}>
              {value}
            </div>
            <input
              aria-label={`Compare ${item.label} before and after`}
              type="range"
              min="8"
              max="92"
              value={value}
              onChange={(event) => setValue(Number(event.target.value))}
              className="absolute inset-x-4 bottom-5 h-2 cursor-ew-resize accent-[var(--primary)]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
