"use client";

import type { ReactNode } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { usePathname } from "next/navigation";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function MotionShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: easeOut }}
          className="flex min-h-full flex-1 flex-col"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
