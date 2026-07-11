"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type ImageRevealProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

export function ImageReveal({
  src,
  alt,
  sizes,
  className = "",
  imageClassName = "",
  priority = false,
}: ImageRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, clipPath: "inset(12% 0 12% 0 round 28px)" }}
      whileInView={{ opacity: 1, clipPath: "inset(0% 0 0% 0 round 28px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.85, ease: easeOut }}
      className={`relative overflow-hidden ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${imageClassName}`}
      />
    </motion.div>
  );
}
