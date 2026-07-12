"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUp,
  Camera,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { salon } from "@/src/data/site-data";
import { SiteContainer } from "@/src/components/ui/SiteContainer";
import { SalonLogo } from "@/src/components/ui/SalonLogo";

const easeOut = [0.22, 1, 0.36, 1] as const;

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const footerServices = [
  { label: "Hair Styling", href: "/services#hair" },
  { label: "Hair Treatments", href: "/services#hair" },
  { label: "Makeup", href: "/services#facial" },
  { label: "Facial", href: "/services#facial" },
  { label: "Manicure", href: "/services#nails" },
  { label: "Pedicure", href: "/services#nails" },
  { label: "Waxing", href: "/services#waxing" },
  { label: "Threading", href: "/services#threading" },
];

export function HomeFooter() {
  const year = new Date().getFullYear();
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const bannerY = useTransform(scrollYProgress, [0.82, 1], shouldReduceMotion ? [0, 0] : [22, 0]);
  const bannerScale = useTransform(scrollYProgress, [0.82, 1], shouldReduceMotion ? [1, 1] : [0.98, 1]);

  return (
    <footer className="bg-[#FAF7FC] px-0 pb-[20px] pt-[48px] md:px-[clamp(24px,5vw,80px)] md:pb-[24px] md:pt-[64px] lg:pb-[28px] lg:pt-[80px]">
      <div className="hidden md:block">
        <SiteContainer>
          <motion.div style={{ y: bannerY, scale: bannerScale }} className="relative overflow-hidden rounded-[26px] md:rounded-[34px]">
            <FooterCTA />
          </motion.div>

          <div className="mt-9 md:mt-11 lg:mt-14">
            <FooterColumns />
          </div>

          <div className="mt-11 border-t border-[rgba(84,37,104,0.10)] pt-5 md:mt-12">
            <div className="flex flex-col gap-3 text-[12px] text-[#736A76] md:flex-row md:items-center md:justify-between md:gap-5">
              <p>© {year} Salon Nelumbo. All rights reserved.</p>

              <div className="flex flex-wrap items-center gap-4 md:gap-5">
                <Link href="#" className="transition hover:text-[var(--primary)]">
                  Privacy Policy
                </Link>
                <Link href="#" className="transition hover:text-[var(--primary)]">
                  Terms of Service
                </Link>
                <a
                  href={salon.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-[var(--primary)]"
                >
                  Instagram
                </a>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="group inline-flex items-center gap-2 text-[var(--primary)] transition hover:-translate-y-0.5"
                >
                  <span>Back to Top</span>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(84,37,104,0.16)] bg-white text-[var(--primary)] shadow-[0_8px_30px_rgba(84,37,104,0.08)] transition duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:border-[rgba(84,37,104,0.28)]">
                    <ArrowUp aria-hidden="true" className="h-4 w-4" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </SiteContainer>
      </div>

      <div className="md:hidden">
        <SiteContainer className="space-y-8">
          <motion.div style={{ y: bannerY, scale: bannerScale }} className="relative overflow-hidden rounded-[26px]">
            <FooterCTA />
          </motion.div>
          <MobileFooterContent year={year} />
        </SiteContainer>
      </div>
    </footer>
  );
}

function FooterCTA() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const orbX = useTransform(scrollYProgress, [0.82, 1], shouldReduceMotion ? [0, 0] : [0, -24]);
  const glowY = useTransform(scrollYProgress, [0.82, 1], shouldReduceMotion ? [0, 0] : [0, 18]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : 24,
        scale: shouldReduceMotion ? 1 : 0.98,
      }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.75, ease: easeOut }}
      className="relative min-h-[320px] overflow-hidden rounded-[26px] md:min-h-[260px] md:rounded-[34px] lg:min-h-[300px]"
    >
      <Image
        src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1600&auto=format&fit=crop"
        alt="Warm modern salon interior with styling stations"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(62,23,75,0.92)_0%,rgba(84,37,104,0.78)_48%,rgba(166,120,182,0.45)_100%)]" />

      <motion.div
        aria-hidden="true"
        style={{ x: orbX, y: glowY }}
        className="pointer-events-none absolute right-[-60px] top-[-44px] h-48 w-48 rounded-full bg-[#E9DDF2]/35 blur-3xl"
      />
      <motion.div
        aria-hidden="true"
        style={{ x: glowY, y: orbX }}
        className="pointer-events-none absolute bottom-[-54px] left-[-60px] h-56 w-56 rounded-full bg-[#D8CBE7]/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />

      <div className="relative z-10 flex min-h-[inherit] items-center justify-center px-5 py-10 text-center md:px-10 md:py-14 lg:px-12">
        <div className="mx-auto max-w-[700px]">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/78">
            Your Next Appointment
          </p>
          <h2 className="mt-5 font-serif text-[34px] font-semibold leading-[0.95] text-white md:text-[48px] lg:text-[64px]">
            Make time for
            <br />
            yourself.
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[15px] leading-7 text-white/84 sm:text-base sm:leading-8">
            Book your next hair, beauty, nail or relaxation service with Salon Nelumbo.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={salon.bookingWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-14 items-center justify-center rounded-full bg-[#FAF7FC] px-7 text-[13px] font-medium uppercase tracking-[0.08em] text-[var(--primary)] transition duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[3px] hover:bg-white hover:shadow-[0_18px_50px_rgba(255,255,255,0.22)]"
            >
              Book Appointment
              <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <Link
              href="/services"
              className="group inline-flex items-center justify-center text-[13px] font-medium uppercase tracking-[0.08em] text-white"
            >
              <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
                View Services
              </span>
              <ArrowRight aria-hidden="true" className="ml-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FooterColumns() {
  const shouldReduceMotion = useReducedMotion();
  const colVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, delay, ease: easeOut },
    }),
  };

  return (
    <div className="grid gap-y-10 md:grid-cols-2 md:gap-x-10 md:gap-y-11 lg:grid-cols-[minmax(260px,1.4fr)_minmax(160px,0.75fr)_minmax(200px,0.9fr)_minmax(220px,0.9fr)] lg:gap-x-[clamp(48px,6vw,88px)]">
      <motion.div
        custom={0}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={colVariants}
        className="max-w-[360px]"
      >
        <Link href="/" aria-label="Salon Nelumbo home" className="inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]">
          <SalonLogo className="block h-auto w-[190px] object-contain md:w-[210px] lg:w-[220px]" />
        </Link>
        <p className="mt-5 max-w-[330px] text-[15px] leading-[1.7] text-[#736A76]">
          Hair, beauty, nail and relaxation services in Dubai.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-[#736A76]">
          <a href={salon.phoneHref} className="inline-flex items-center gap-2 whitespace-nowrap transition hover:text-[var(--primary)]">
            <Phone className="h-4 w-4" />
            {salon.phoneDisplay}
          </a>
          <span aria-hidden="true">•</span>
          <span>{salon.location}</span>
        </div>
        <div className="mt-7 flex items-center gap-3">
          <SocialButton href={salon.instagram} label="Instagram">
            <Camera className="h-4 w-4" />
          </SocialButton>
          <SocialButton href={salon.whatsapp} label="WhatsApp">
            <MessageCircle className="h-4 w-4" />
          </SocialButton>
          <SocialButton href={salon.mapsUrl} label="Google Maps">
            <MapPin className="h-4 w-4" />
          </SocialButton>
        </div>
      </motion.div>

      <FooterLinkColumn title="Company" items={companyLinks} className="min-w-0" delay={0.08} />
      <FooterLinkColumn title="Services" items={footerServices.slice(0, 7)} className="min-w-0" delay={0.14} footerLink />

      <motion.div
        custom={0.2}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={colVariants}
        className="min-w-0 max-w-[240px]"
      >
        <h3 className="mb-[30px] text-[13px] font-medium uppercase tracking-[0.2em] leading-none text-[var(--primary)]">Visit</h3>
        <ul className="flex flex-col gap-5 text-[14px] leading-[1.35] text-[#736A76]">
          <li>Dubai, UAE</li>
          <li>
            <a href={salon.phoneHref} className="transition hover:text-[var(--primary)]">
              050 120 1938
            </a>
          </li>
          <li>
            <a href={salon.mapsUrl} target="_blank" rel="noopener noreferrer" className="transition hover:text-[var(--primary)]">
              Get Directions
            </a>
          </li>
          <li>
            <a href={salon.bookingWhatsapp} target="_blank" rel="noopener noreferrer" className="transition hover:text-[var(--primary)]">
              Book Appointment
            </a>
          </li>
          <li className="mt-2 max-w-[220px] text-[13px] leading-[1.6] text-[#736A76]">
            Contact the salon to confirm availability.
          </li>
        </ul>
      </motion.div>
    </div>
  );
}

function MobileFooterContent({ year }: { year: number }) {
  return (
    <div className="space-y-8 text-left">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: easeOut }}
        className="max-w-none"
      >
        <Link href="/" aria-label="Salon Nelumbo home" className="inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]">
          <SalonLogo className="block h-auto w-[190px] object-contain" />
        </Link>
        <p className="mt-4 max-w-sm text-[15px] leading-7 text-[#736A76]">
          Hair, beauty, nail and relaxation services in Dubai.
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-[#736A76]">
          <a href={salon.phoneHref} className="inline-flex items-center gap-2 whitespace-nowrap transition hover:text-[var(--primary)]">
            <Phone className="h-4 w-4" />
            {salon.phoneDisplay}
          </a>
          <span aria-hidden="true">•</span>
          <span>{salon.location}</span>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <SocialButton href={salon.instagram} label="Instagram">
            <Camera className="h-4 w-4" />
          </SocialButton>
          <SocialButton href={salon.whatsapp} label="WhatsApp">
            <MessageCircle className="h-4 w-4" />
          </SocialButton>
          <SocialButton href={salon.mapsUrl} label="Google Maps">
            <MapPin className="h-4 w-4" />
          </SocialButton>
        </div>
      </motion.div>

      <div className="space-y-8">
        <FooterLinkColumn title="Company" items={companyLinks} className="w-full" delay={0.04} />
        <FooterLinkColumn title="Services" items={footerServices.slice(0, 7)} className="w-full" delay={0.08} footerLink />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: easeOut }}
          className="space-y-4"
        >
          <h3 className="text-[13px] font-medium uppercase tracking-[0.2em] leading-none text-[var(--primary)]">
            Visit
          </h3>
          <ul className="flex flex-col gap-4 text-[14px] leading-[1.5] text-[#736A76]">
            <li>Dubai, UAE</li>
            <li>
              <a href={salon.phoneHref} className="transition hover:text-[var(--primary)]">
                050 120 1938
              </a>
            </li>
            <li>
              <a href={salon.mapsUrl} target="_blank" rel="noopener noreferrer" className="transition hover:text-[var(--primary)]">
                Get Directions
              </a>
            </li>
            <li>
              <a href={salon.bookingWhatsapp} target="_blank" rel="noopener noreferrer" className="transition hover:text-[var(--primary)]">
                Book Appointment
              </a>
            </li>
            <li className="max-w-[220px] text-[13px] leading-[1.6] text-[#736A76]">
              Contact the salon to confirm availability.
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="border-t border-[rgba(84,37,104,0.10)] pt-5">
        <div className="flex flex-col gap-3 text-[12px] text-[#736A76]">
          <p>© {year} Salon Nelumbo. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="#" className="transition hover:text-[var(--primary)]">
              Privacy Policy
            </Link>
            <Link href="#" className="transition hover:text-[var(--primary)]">
              Terms of Service
            </Link>
            <a href={salon.instagram} target="_blank" rel="noopener noreferrer" className="transition hover:text-[var(--primary)]">
              Instagram
            </a>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group inline-flex items-center gap-2 text-[var(--primary)] transition hover:-translate-y-0.5"
            >
              <span>Back to Top</span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(84,37,104,0.16)] bg-white text-[var(--primary)] shadow-[0_8px_30px_rgba(84,37,104,0.08)] transition duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1 group-hover:border-[rgba(84,37,104,0.28)]">
                <ArrowUp aria-hidden="true" className="h-4 w-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterLinkColumn({
  title,
  items,
  className,
  delay,
  footerLink = false,
}: {
  title: string;
  items: { label: string; href: string }[];
  className: string;
  delay: number;
  footerLink?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <motion.div
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        visible: (d: number) => ({
          opacity: 1,
          y: 0,
          transition: { duration: 0.65, delay: d, ease: easeOut },
        }),
      }}
      className={className}
    >
      <h3 className="mb-[30px] text-[13px] font-medium uppercase tracking-[0.2em] leading-none text-[var(--primary)]">
        {title}
      </h3>
      <ul className="flex flex-col gap-5 text-[14px] leading-[1.35] text-[#736A76]">
        {items.map((item) => (
          <li key={`${item.href}-${item.label}`}>
            <Link
              href={item.href}
              className="group inline-flex items-center transition hover:translate-x-1 hover:text-[var(--primary)]"
            >
              <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[var(--primary)] after:transition-all after:duration-300 group-hover:after:w-full">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {footerLink ? (
        <Link
          href="/services"
          className="group mt-2 inline-flex items-center text-[14px] font-medium text-[var(--primary)]"
        >
          <span className="relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-[var(--primary)] after:transition-all after:duration-300 group-hover:after:w-full">
            View All Services
          </span>
          <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      ) : null}
    </motion.div>
  );
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(84,37,104,0.16)] bg-white/40 text-[var(--primary)] transition duration-[300ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:bg-white hover:shadow-[0_8px_30px_rgba(84,37,104,0.10)]"
    >
      {children}
    </a>
  );
}
