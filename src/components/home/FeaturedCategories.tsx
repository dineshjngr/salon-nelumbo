"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CategoryCard } from "@/src/components/home/CategoryCard";
import { serviceCategories } from "@/src/data/service-categories";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function FeaturedCategories() {
  const shouldReduceMotion = useReducedMotion();
  const move = shouldReduceMotion ? 0 : 24;

  return (
    <section
      id="featured-categories"
      className="relative z-10 bg-[#FAF7FC] px-[var(--site-gutter)] pb-[72px] pt-16 md:-mt-[50px] md:px-8 md:pb-[116px] md:pt-[120px] lg:px-12 lg:pb-[130px] xl:px-16"
    >
      <div className="mx-auto max-w-[1280px] xl:max-w-[1360px]">
        <div className="grid gap-6 md:gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-end lg:gap-[72px]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, ease: easeOut }}
              className="text-[12px] font-medium uppercase tracking-[0.18em] text-[#746B78]"
            >
              Our Services
            </motion.p>
            <h2 className="mt-5 font-serif text-[46px] font-semibold leading-[0.98] text-[#271D2C] sm:text-[58px] lg:text-[72px]">
              <motion.span
                className="block"
                initial={{ opacity: 0, y: move }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.65, delay: 0.12, ease: easeOut }}
              >
                Find your perfect
              </motion.span>
              <motion.span
                className="block italic text-[#9B72B3]"
                initial={{ opacity: 0, y: move }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.65, delay: 0.22, ease: easeOut }}
              >
                beauty ritual.
              </motion.span>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, delay: 0.34, ease: easeOut }}
            className="max-w-[560px] lg:ml-auto"
          >
            <p className="text-base leading-8 text-[#746B78] md:text-lg">
              From polished nails to restorative hair and beauty treatments,
              explore services designed around how you want to look and feel.
            </p>
            <Link
              href="/services"
              className="group mt-7 inline-flex items-center text-[13px] font-medium uppercase tracking-[0.08em] text-[#542568] outline-none focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-[#542568] focus-visible:ring-offset-4 focus-visible:ring-offset-[#FAF7FC]"
            >
              <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#542568] after:transition-transform after:duration-300 group-hover:after:scale-x-100">
                Explore All Services
              </span>
              <ArrowRight
                aria-hidden="true"
                className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-[18px] lg:grid-cols-12 lg:auto-rows-[150px] lg:gap-[18px] xl:gap-5">
          {serviceCategories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
