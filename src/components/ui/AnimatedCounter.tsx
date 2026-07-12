"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  label: string;
  description: string;
  duration?: number;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

export function AnimatedCounter({
  value,
  suffix = "",
  label,
  description,
  duration = 2000,
}: AnimatedCounterProps) {
  const shouldReduceMotion = useReducedMotion();
  const [current, setCurrent] = useState(() => (shouldReduceMotion ? value : 0));
  const frameRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const target = useMemo(() => value, [value]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    const tick = (timestamp: number) => {
      if (startRef.current === null) {
        startRef.current = timestamp;
      }

      const elapsed = timestamp - startRef.current;
      const progress = Math.min(1, elapsed / duration);
      const nextValue = Math.round(target * progress);
      setCurrent(nextValue);

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(tick);
      }
    };

    frameRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [duration, shouldReduceMotion, target]);

  return (
    <motion.article
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 34, filter: shouldReduceMotion ? "none" : "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.75, ease: easeOut }}
      className="group rounded-[28px] border border-[var(--border)] bg-white/66 p-6 shadow-[0_18px_60px_rgba(84,37,104,0.10)] backdrop-blur-[18px] transition duration-500 hover:-translate-y-1 hover:border-[rgba(84,37,104,0.28)] hover:shadow-[0_24px_65px_rgba(84,37,104,0.14)] md:p-7"
    >
      <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">{label}</p>
      <div className="mt-5 font-serif text-[48px] font-semibold leading-none text-[var(--primary)] sm:text-[56px] lg:text-[72px]">
        {current}
        {suffix}
      </div>
      <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{description}</p>
    </motion.article>
  );
}
