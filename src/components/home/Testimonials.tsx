"use client";

import { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { testimonials } from "@/src/data/testimonials";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

function TestimonialCard({ item, featured = false }: { item: (typeof testimonials)[number]; featured?: boolean }) {
  const shouldReduceMotion = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 120, damping: 18 });

  return (
    <motion.article
      onMouseMove={(event) => {
        if (shouldReduceMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        rotateX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 4);
        rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 4);
      }}
      onMouseLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
      style={{ rotateX, rotateY }}
      className={`group rounded-[30px] border border-[var(--border)] bg-white/75 p-6 shadow-[0_18px_55px_rgba(84,37,104,0.08)] transition hover:-translate-y-1 hover:border-[#542568]/30 md:p-7 ${featured ? "md:col-span-2 md:p-10" : ""}`}
    >
      <Quote aria-hidden="true" className="h-8 w-8 text-[#A678B6] transition group-hover:scale-110" />
      <div className="mt-6 flex gap-1 text-[#A678B6]">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star key={index} aria-hidden="true" className="h-4 w-4 fill-current" />
        ))}
      </div>
      <p className={`mt-6 leading-8 text-[var(--text)] ${featured ? "font-serif text-[28px] md:text-4xl" : "text-[15px] md:text-base"}`}>{item.review}</p>
      <div className="mt-7 text-sm text-[var(--muted)]">{item.name} · {item.service}</div>
    </motion.article>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials" className="bg-[#FAF7FC] px-[var(--site-gutter)] py-14 md:px-[clamp(24px,5vw,96px)] md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading
          label="Client Love"
          title={<>Kind words,<br /><span className="italic text-[#9B72B3]">beautiful visits.</span></>}
          align="center"
        />
        <div className="mt-14 hidden grid-cols-2 gap-6 lg:grid">
          <TestimonialCard item={testimonials[0]} featured />
          {testimonials.slice(1).map((item) => <TestimonialCard key={item.name} item={item} />)}
        </div>
        <div className="mt-12 lg:hidden">
          <TestimonialCard item={testimonials[active]} />
          <div className="mt-5 flex justify-center gap-3">
            <button type="button" aria-label="Previous testimonial" onClick={() => setActive((active - 1 + testimonials.length) % testimonials.length)} className="rounded-full border border-[var(--border)] p-4 text-[var(--primary)] md:p-3">
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button type="button" aria-label="Next testimonial" onClick={() => setActive((active + 1) % testimonials.length)} className="rounded-full border border-[var(--border)] p-4 text-[var(--primary)] md:p-3">
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
