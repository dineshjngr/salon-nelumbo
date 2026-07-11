"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ServiceCategory } from "@/src/data/service-categories";

type CategoryCardProps = {
  category: ServiceCategory;
  index: number;
};

const easeOut = [0.22, 1, 0.36, 1] as const;

export function CategoryCard({ category, index }: CategoryCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : { opacity: 0, y: 70, filter: "blur(10px)" }
      }
      whileInView={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: shouldReduceMotion ? 0.2 : 0.75,
        delay: shouldReduceMotion ? 0 : index * 0.09,
        ease: easeOut,
      }}
      className={`${category.spanClassName} ${category.heightClassName} w-full min-h-0`}
    >
      <Link
        href={category.href}
        aria-label={`Explore ${category.name} services`}
        className="group relative flex h-full min-h-0 w-full overflow-hidden rounded-[24px] border border-transparent bg-[#EDE3F2] outline-none transition-[border-color,box-shadow] duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[rgba(84,37,104,0.22)] hover:shadow-[0_18px_55px_rgba(84,37,104,0.16)] focus-visible:border-[#542568] focus-visible:ring-2 focus-visible:ring-[#542568] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAF7FC]"
      >
        <Image
          src={category.image.src}
          alt={category.image.alt}
          fill
          sizes="(min-width: 1280px) 50vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:scale-[1.07]"
        />
        <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#160d1d]/90 via-[#160d1d]/42 to-transparent transition-opacity duration-[550ms] group-hover:opacity-95" />
        <div className="absolute right-6 top-6 font-serif text-[64px] font-semibold leading-none text-white/25 transition duration-[550ms] group-hover:text-white/45 md:right-8 md:top-8">
          {category.number}
        </div>
        <div className="relative z-10 mt-auto flex w-full items-end justify-between gap-6 p-6 md:p-8">
          <div className={`${category.contentWidthClassName} text-white`}>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.14em] text-white/72">
              {category.label}
            </p>
            <h3 className="font-serif text-[40px] font-semibold leading-none transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[10px] md:text-[48px]">
              {category.name}
            </h3>
            <p className="mt-4 max-w-[330px] text-sm leading-6 text-white/82 transition duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:lg:translate-y-2 motion-safe:lg:opacity-85 group-hover:-translate-y-[10px] group-hover:text-white group-hover:opacity-100 md:text-[15px]">
              {category.description}
            </p>
          </div>
          <span className="mb-1 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/45 text-white transition duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-45 group-hover:bg-white group-hover:text-[#542568]">
            <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
