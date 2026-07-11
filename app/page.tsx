"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Header } from "@/src/components/layout/Header";
import { FeaturedCategories } from "@/src/components/home/FeaturedCategories";
import { SignaturePackages } from "@/src/components/home/SignaturePackages";
import { SalonExperience } from "@/src/components/home/SalonExperience";
import { BeforeAfter } from "@/src/components/home/BeforeAfter";
import { WhyChooseUs } from "@/src/components/home/WhyChooseUs";
import { SalonAtAGlance } from "@/src/components/home/SalonAtAGlance";
import { InstagramFeed } from "@/src/components/home/InstagramFeed";
import { OurSpace } from "@/src/components/home/OurSpace";
import { ProductsMarquee } from "@/src/components/home/ProductsMarquee";
import { TeamSection } from "@/src/components/home/TeamSection";
import { Testimonials } from "@/src/components/home/Testimonials";
import { BeautyJournal } from "@/src/components/home/BeautyJournal";
import { HomeFAQ } from "@/src/components/home/HomeFAQ";
import { HomeFooter } from "@/src/components/home/HomeFooter";
import { ScrollProgress } from "@/src/components/ui/ScrollProgress";
import { SiteContainer } from "@/src/components/ui/SiteContainer";

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: easeOut },
  }),
};

export default function Home() {
  return (
      <main className="min-h-screen bg-[#F8F3FC] text-[#241B2F]">
        <ScrollProgress />
        <Header />

      <section className="relative min-h-screen overflow-hidden">
        <motion.div
          initial={{ scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.25, ease: easeOut }}
          className="absolute inset-0 bg-[url('/salon-hero-banner.png')] bg-cover bg-[center_right] max-sm:bg-[70%_top]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(248,243,252,0.96)_0%,rgba(248,243,252,0.82)_35%,rgba(248,243,252,0.38)_58%,rgba(248,243,252,0)_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute right-[8%] top-[18%] h-56 w-56 rounded-full bg-[#D8CBE7]/35 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute right-[28%] bottom-[18%] h-36 w-36 rounded-full bg-[#E9DDF2]/40 blur-3xl"
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
            <motion.p
              custom={0.18}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-[12px] font-medium uppercase tracking-[0.22em] text-[#6E6476]"
            >
              Beauty • Care • Relaxation
            </motion.p>

            <motion.h1
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
            </motion.h1>

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

      </section>
      <FeaturedCategories />
      <SignaturePackages />
      <SalonExperience />
      <BeforeAfter />
      <WhyChooseUs />
      <SalonAtAGlance />
      <InstagramFeed />
      <OurSpace />
      <ProductsMarquee />
      <TeamSection />
      <Testimonials />
      <BeautyJournal />
      <HomeFAQ />
      <HomeFooter />
    </main>
  );
}
