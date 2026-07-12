"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { getOpeningStatus, type OpeningStatus as OpeningStatusValue } from "@/src/lib/opening-hours";

type OpeningStatusProps = {
  variant?: "default" | "compact";
  className?: string;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

export function OpeningStatus({ variant = "default", className = "" }: OpeningStatusProps) {
  const shouldReduceMotion = useReducedMotion();
  const [status, setStatus] = useState<OpeningStatusValue>(() => getOpeningStatus());

  useEffect(() => {
    const update = () => setStatus(getOpeningStatus());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const pulseClassName = useMemo(() => (status.isOpen && !shouldReduceMotion ? "animate-pulse" : ""), [shouldReduceMotion, status.isOpen]);

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.45, ease: easeOut }}
      className={`inline-flex items-center gap-3 rounded-full border border-white/55 bg-white/62 text-left shadow-[0_18px_60px_rgba(84,37,104,0.10)] backdrop-blur-[18px] supports-[not(backdrop-filter:blur(1px))]:bg-white ${
        variant === "compact" ? "px-3 py-2" : "px-4 py-3"
      } ${className}`}
    >
      <span
        className={`relative inline-flex h-3 w-3 shrink-0 rounded-full ${status.isOpen ? "bg-emerald-500" : "bg-rose-500"}`}
      >
        {status.isOpen ? (
          <span className={`absolute inset-0 rounded-full bg-emerald-500/50 ${pulseClassName}`} />
        ) : null}
      </span>
      <span className="min-w-0">
        <span className={`block font-medium uppercase tracking-[0.18em] text-[var(--muted)] ${variant === "compact" ? "text-[10px]" : "text-[11px]"}`}>
          {status.statusLabel}
        </span>
        <span className={`mt-0.5 block font-medium text-[var(--text)] ${variant === "compact" ? "text-[12px]" : "text-sm"}`}>
          {status.detailLabel}
        </span>
      </span>
      {variant === "compact" ? (
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--primary)]">{status.nextChangeLabel}</span>
      ) : (
        <>
          <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--primary)]">
            {status.isOpen ? "Closes" : "Opens"}
          </span>
          <span className="text-sm font-semibold text-[var(--primary)]">{status.nextChangeLabel}</span>
        </>
      )}
    </motion.div>
  );
}
