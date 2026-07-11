"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/src/data/faqs";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

export function HomeFAQ() {
  const [active, setActive] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-[#FAF7FC] px-[clamp(24px,5vw,96px)] py-24 lg:py-32">
      <div className="absolute right-[10%] top-40 h-72 w-72 rounded-full bg-[#EDE3F2]/80 blur-3xl" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          label="Before You Visit"
          title={<>A few helpful<br /><span className="italic text-[#9B72B3]">answers.</span></>}
        />
        <div className="space-y-3">
          {faqs.map((item, index) => {
            const isActive = active === index;
            return (
              <div key={item.question} className={`relative overflow-hidden rounded-[24px] border border-[var(--border)] transition ${isActive ? "bg-[#EDE3F2]/70" : "bg-white/60"}`}>
                {isActive ? <div className="absolute -left-10 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-[#A678B6]/20 blur-2xl" /> : null}
                <button
                  type="button"
                  aria-expanded={isActive}
                  onClick={() => setActive(isActive ? -1 : index)}
                  className="relative flex w-full items-center gap-5 p-6 text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                >
                  <span className="font-serif text-3xl font-semibold text-[var(--primary)]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-2xl font-semibold text-[var(--text)]">{item.question}</span>
                  <Plus aria-hidden="true" className={`ml-auto h-5 w-5 shrink-0 text-[var(--primary)] transition ${isActive ? "rotate-45" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isActive ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0, y: -8 }}
                      animate={{ height: "auto", opacity: 1, y: 0 }}
                      exit={{ height: 0, opacity: 0, y: -8 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 pl-[88px] text-sm leading-7 text-[var(--muted)]">{item.answer}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
