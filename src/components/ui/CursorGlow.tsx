"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CursorGlow() {
  const shouldReduceMotion = useReducedMotion();
  const x = useSpring(useMotionValue(-100), { stiffness: 90, damping: 22 });
  const y = useSpring(useMotionValue(-100), { stiffness: 90, damping: 22 });

  useEffect(() => {
    if (shouldReduceMotion || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX - 80);
      y.set(event.clientY - 80);
    };

    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [shouldReduceMotion, x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed z-[1] hidden h-40 w-40 rounded-full bg-[#A678B6]/16 blur-3xl lg:block"
      style={{ x, y }}
    />
  );
}
