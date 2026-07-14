"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import type { Variants } from "motion/react";
import { ArrowRight } from "lucide-react";
import { SiteContainer } from "../ui/SiteContainer";
import { HeroImageSequence } from "./HeroImageSequence";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: easeOut },
  }),
};

export function HeroSection() {
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  // Desktop scroll progress (target entire 220vh scroll section)
  const { scrollYProgress: desktopScrollProgress } = useScroll({
    target: desktopContainerRef,
    offset: ["start start", "end end"],
  });

  // Mobile scroll progress (target entire 145vh scroll section)
  const { scrollYProgress: mobileScrollProgress } = useScroll({
    target: mobileContainerRef,
    offset: ["start start", "end end"],
  });

  // Scroll-linked opacity for text (fades to 0.2 in the final 25% of scroll)
  const desktopTextOpacity = useTransform(
    desktopScrollProgress,
    [0, 0.75, 1],
    [1, 1, 0.2]
  );
  
  const mobileTextOpacity = useTransform(
    mobileScrollProgress,
    [0, 0.75, 1],
    [1, 1, 0.2]
  );

  return (
    <>
      {/* Mobile Hero (below 768px) */}
      <section
        ref={mobileContainerRef}
        className="relative min-h-[145vh] bg-[#F8F3FC] md:hidden"
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center pb-8 pt-16 overflow-hidden">
          <SiteContainer className="relative">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: easeOut }}
              className="space-y-5"
            >
              <motion.div style={{ opacity: mobileTextOpacity }}>
                <motion.p
                  custom={0.12}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#6E6476]"
                >
                  Beauty • Care • Relaxation
                </motion.p>
              </motion.div>

              {/* The mobile aspect ratio card displaying the scroll sequence */}
              <motion.div
                initial={{ opacity: 0, y: 22, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: easeOut, delay: 0.08 }}
                className="relative aspect-[4/5] w-full overflow-hidden rounded-[34px] border border-white/60 bg-[#EDE3F2] shadow-[0_18px_60px_rgba(84,37,104,0.12)]"
              >
                {/* Mobile version of scroll sequence (loads every 2nd frame) */}
                <HeroImageSequence
                  scrollYProgress={mobileScrollProgress}
                  isMobile={true}
                />

                {/* Overlays inside the card */}
                <div
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_20%,rgba(52,20,70,0.22)_60%,rgba(32,12,42,0.68)_100%)]"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -right-8 top-[-24px] h-32 w-32 rounded-full bg-[#EDE3F2]/55 blur-3xl"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute -bottom-10 left-6 h-24 w-24 rounded-full bg-[#D8CBE7]/45 blur-3xl"
                  aria-hidden="true"
                />

                <div className="absolute inset-x-0 top-0 p-5 text-center">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/90">
                    Your Beauty Destination
                  </p>
                </div>
                
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <motion.div
                    style={{ opacity: mobileTextOpacity }}
                    className="max-w-[85%]"
                  >
                    <h2 className="font-serif text-[40px] font-semibold leading-[0.92] text-white">
                      Beauty
                      <br />
                      that feels
                      <br />
                      like you.
                    </h2>
                    <p className="mt-4 max-w-[85%] text-[15px] leading-7 text-white/90">
                      Professional salon services designed to bring out your natural confidence.
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                custom={0.28}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="flex flex-col gap-3"
              >
                <Link
                  href="/contact"
                  className="group inline-flex h-14 items-center justify-center rounded-full bg-[#5B2C83] px-7 text-[14px] font-medium uppercase tracking-[0.08em] text-white transition duration-200 hover:bg-[#4B226E] active:scale-[0.98]"
                >
                  Book Appointment
                  <ArrowRight
                    aria-hidden="true"
                    className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
                <Link
                  href="/services"
                  className="group inline-flex h-14 items-center justify-center rounded-full border border-[rgba(84,37,104,0.18)] bg-white/80 px-7 text-[14px] font-medium uppercase tracking-[0.08em] text-[#5B2C83] transition duration-200 active:scale-[0.98]"
                >
                  <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#5B2C83] after:transition-all after:duration-300 group-hover:after:w-full">
                    Explore Services
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="ml-3 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>

              <motion.p
                custom={0.34}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="text-center text-[12px] font-medium uppercase tracking-[0.18em] text-[#6E6476]"
              >
                Swipe to explore
              </motion.p>
            </motion.div>
          </SiteContainer>
        </div>
      </section>

      {/* Desktop Hero (above 768px) */}
      <section
        ref={desktopContainerRef}
        className="relative hidden min-h-[220vh] bg-[#F8F3FC] md:block"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Canvas Scroll-driven Image Sequence background */}
          <div className="absolute inset-0 z-0" aria-hidden="true">
            <HeroImageSequence
              scrollYProgress={desktopScrollProgress}
              isMobile={false}
            />
          </div>

          {/* Readability Overlay */}
          <div
            className="absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(248,243,252,0.96)_0%,rgba(248,243,252,0.82)_35%,rgba(248,243,252,0.38)_58%,rgba(248,243,252,0)_100%)]"
            aria-hidden="true"
          />

          {/* Glow Bubbles */}
          <div
            className="absolute z-[1] right-[8%] top-[18%] h-56 w-56 rounded-full bg-[#D8CBE7]/35 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="absolute z-[1] right-[28%] bottom-[18%] h-36 w-36 rounded-full bg-[#E9DDF2]/40 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-[140px] bg-gradient-to-b from-transparent via-[#FAF7FC]/58 to-[#FAF7FC]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-[-72px] left-[12%] z-[7] h-[150px] w-[58vw] rounded-full bg-[#EDE3F2]/72 blur-3xl"
            aria-hidden="true"
          />

          <SiteContainer className="relative z-10 flex min-h-screen items-center pb-36 pt-[120px]">
            <div className="max-w-[620px]">
              {/* Text that fades slightly at the end of the scroll track */}
              <motion.div style={{ opacity: desktopTextOpacity }}>
                <motion.p
                  custom={0.18}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className="text-[12px] font-medium uppercase tracking-[0.22em] text-[#6E6476]"
                >
                  Beauty • Care • Relaxation
                </motion.p>

                <motion.h2
                  custom={0.4}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className="mt-8 font-serif text-[42px] font-semibold leading-[0.95] tracking-normal text-[#241B2F] sm:text-[58px] lg:text-[84px]"
                >
                  Beauty
                  <br />
                  that feels
                  <br />
                  <span className="text-[#9D77C2]">like you.</span>
                </motion.h2>

                <motion.p
                  custom={0.6}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className="mt-8 max-w-[520px] text-lg font-normal leading-8 text-[#6E6476] sm:text-xl"
                >
                  Professional salon services designed
                  <br className="hidden sm:block" />
                  to bring out your natural confidence.
                </motion.p>
              </motion.div>

              {/* Buttons (kept fully clickable and prominent) */}
              <motion.div
                custom={0.8}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center"
              >
                <Link
                  href="/contact"
                  className="group inline-flex h-14 items-center justify-center rounded-full bg-[#5B2C83] px-9 text-[13px] font-medium uppercase tracking-[0.08em] text-white transition duration-200 hover:bg-[#4B226E]"
                >
                  Book Appointment
                  <ArrowRight
                    aria-hidden="true"
                    className="ml-0 h-4 w-0 opacity-0 transition-all duration-200 group-hover:ml-3 group-hover:w-4 group-hover:opacity-100"
                  />
                </Link>
                <Link
                  href="/services"
                  className="group inline-flex h-14 items-center justify-center text-[13px] font-medium uppercase tracking-[0.08em] text-[#5B2C83]"
                >
                  <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[#5B2C83] after:transition-all after:duration-300 group-hover:after:w-full">
                    Explore Services
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    className="ml-3 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Link>
              </motion.div>
            </div>
          </SiteContainer>
        </div>
      </section>
    </>
  );
}
