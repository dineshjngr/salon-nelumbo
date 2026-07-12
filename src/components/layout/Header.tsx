"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { navigation, salon } from "@/src/data/site-data";
import { SiteContainer } from "@/src/components/ui/SiteContainer";

const easeOut = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: easeOut }}
        className={`fixed inset-x-0 z-50 transition-[top] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isScrolled ? "top-2 md:top-2.5" : "top-3 md:top-3.5"
        }`}
      >
        <SiteContainer>
          <div
            className={`flex items-center justify-between rounded-full px-4 transition-[height,padding,transform,background-color,box-shadow,backdrop-filter,border-color] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-5 ${
              isScrolled
                ? "h-[58px] border border-[rgba(84,37,104,0.10)] bg-[rgba(255,255,255,0.82)] shadow-[0_12px_36px_rgba(84,37,104,0.10)] backdrop-blur-[20px] md:h-[62px] lg:h-[64px] lg:px-6"
                : "h-[62px] border border-transparent bg-transparent md:h-[68px] lg:h-[72px] lg:px-7"
            }`}
          >
            <Link
              href="/"
              aria-label="Salon Nelumbo home"
              className={`origin-left font-serif text-[26px] font-semibold leading-none text-[var(--primary)] transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)] md:text-[27px] lg:text-[28px] ${
                isScrolled ? "scale-[0.92]" : "scale-100"
              }`}
            >
              Nelumbo
            </Link>

            <nav aria-label="Primary navigation" className="hidden lg:block">
              <ul className="flex items-center gap-8 xl:gap-9">
                {navigation.map((item) => (
                  <li key={`${item.href}-${item.label}`}>
                    <Link
                      href={item.href}
                      className="group relative text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--text)] transition hover:text-[var(--primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
                    >
                      {item.label}
                      <span className="absolute -bottom-2 left-0 h-px w-0 bg-[var(--primary)] transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <a
              href={salon.bookingWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={`group hidden items-center rounded-full bg-[var(--primary)] px-6 text-[12px] font-medium uppercase tracking-[0.08em] text-white whitespace-nowrap transition-[height,padding,transform,background-color,box-shadow] duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)] lg:inline-flex ${
                isScrolled ? "min-h-11 px-5 lg:min-h-[46px]" : "min-h-12 lg:min-h-[50px]"
              }`}
            >
              Book Appointment
              <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
            </a>

            <button
              type="button"
              aria-label="Open navigation menu"
              onClick={() => setIsOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-white/55 text-[var(--primary)] backdrop-blur transition duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden md:h-12 md:w-12"
            >
              <Menu aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </SiteContainer>
      </motion.header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-[#271D2C]/28 p-4 backdrop-blur-md lg:hidden"
          >
            <motion.div
              initial={{ y: -18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.35, ease: easeOut }}
              className="flex max-h-[calc(100vh-2rem)] flex-col overflow-y-auto rounded-[34px] border border-white/60 bg-[#FAF7FC] p-6 shadow-[0_28px_80px_rgba(84,37,104,0.16)]"
            >
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="font-serif text-[30px] font-semibold text-[var(--primary)]"
                >
                  Nelumbo
                </Link>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--border)] text-[var(--primary)]"
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </button>
              </div>
              <nav aria-label="Mobile navigation" className="mt-12">
                <ul className="space-y-5">
                  {navigation.map((item) => (
                    <li key={`${item.href}-${item.label}`}>
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-2xl px-2 py-2 font-serif text-[34px] font-semibold text-[var(--text)] transition hover:text-[var(--primary)] md:text-4xl"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <a
                href={salon.bookingWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-10 inline-flex min-h-14 items-center justify-center rounded-full bg-[var(--primary)] px-8 text-sm font-medium uppercase tracking-[0.08em] text-white"
              >
                Book Appointment
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
