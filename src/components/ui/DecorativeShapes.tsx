"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function DecorativeShapes() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const floatA = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 40]);
  const floatB = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, -28]);
  const floatC = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [0, 18]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden" aria-hidden="true">
      <motion.div
        style={{ y: floatA }}
        className="absolute left-[5%] top-[14%] h-56 w-56 rounded-full bg-[#EDE3F2]/70 blur-3xl lg:h-80 lg:w-80"
        transition={{ duration: 1, ease: easeOut }}
      />
      <motion.div
        style={{ y: floatB }}
        className="absolute right-[4%] top-[30%] h-72 w-72 rounded-full bg-[#D8CBE7]/50 blur-3xl lg:h-[26rem] lg:w-[26rem]"
        transition={{ duration: 1, ease: easeOut }}
      />
      <motion.div
        style={{ y: floatC }}
        className="absolute bottom-[10%] left-[18%] h-48 w-[22rem] rounded-full bg-[#EEE4F2]/55 blur-3xl lg:w-[34rem]"
        transition={{ duration: 1, ease: easeOut }}
      />
    </div>
  );
}
