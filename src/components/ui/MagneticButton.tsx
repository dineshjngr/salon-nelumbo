"use client";

import Link from "next/link";
import type { ReactNode, MouseEvent } from "react";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

type MagneticButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

export function MagneticButton({
  href,
  children,
  className = "",
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });

  function onMove(event: MouseEvent<HTMLAnchorElement>) {
    if (shouldReduceMotion || !ref.current || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * 8);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * 8);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div style={{ x, y }} onMouseLeave={onLeave}>
      <Link
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        onMouseMove={onMove}
        className={`group inline-flex min-h-14 items-center justify-center rounded-full bg-[var(--primary)] px-7 text-sm font-medium uppercase tracking-[0.08em] text-white transition duration-300 hover:bg-[var(--primary-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)] md:min-h-12 ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
