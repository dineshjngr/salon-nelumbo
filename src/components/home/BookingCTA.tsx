"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Phone } from "lucide-react";
import { GlassPanel } from "@/src/components/ui/GlassPanel";
import { MagneticButton } from "@/src/components/ui/MagneticButton";
import { AnimatedArrow } from "@/src/components/ui/AnimatedArrow";

export function BookingCTA() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : [-18, 18]);

  return (
    <section id="booking-cta" className="bg-white px-[clamp(24px,5vw,96px)] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] overflow-hidden rounded-[38px]">
        <div className="relative min-h-[620px] overflow-hidden">
          <motion.div style={{ y }} className="absolute inset-0 scale-105">
            <Image src="/images/booking/booking-cta.jpg" alt="Luxurious salon appointment setting" fill sizes="100vw" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-[#271D2C]/62" />
          <div className="relative z-10 flex min-h-[620px] items-center px-[clamp(24px,5vw,96px)] py-16">
            <GlassPanel className="max-w-xl rounded-[30px] p-8 text-[var(--text)] md:p-10">
              <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--primary)]">Your Next Appointment</p>
              <h2 className="mt-5 font-serif text-[54px] font-semibold leading-none md:text-[78px]">
                Make time
                <br />
                for yourself.
              </h2>
              <p className="mt-6 text-base leading-8 text-[var(--muted)]">Choose your preferred treatment and contact Salon Nelumbo to reserve your appointment.</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <MagneticButton href="https://wa.me/971501201938?text=Hello%20Salon%20Nelumbo%2C%20I%20would%20like%20to%20book%20an%20appointment." target="_blank" rel="noopener noreferrer" className="relative overflow-hidden">
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition duration-700 group-hover:translate-x-full" />
                  <span className="relative inline-flex items-center">Book on WhatsApp <AnimatedArrow className="ml-2" /></span>
                </MagneticButton>
                <a href="tel:+971501201938" className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--border)] px-7 text-sm font-medium text-[var(--primary)] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]">
                  <Phone aria-hidden="true" className="mr-2 h-4 w-4" />
                  Call 050 120 1938
                </a>
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
}
