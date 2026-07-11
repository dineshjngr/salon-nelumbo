"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress, scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[55] h-[2px] origin-left bg-[var(--primary)]"
      style={{ scaleX: scrollYProgress, opacity, width: "100%" }}
    />
  );
}
