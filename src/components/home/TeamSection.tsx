"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { teamMembers } from "@/src/data/team";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

export function TeamSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="team" className="bg-white px-[var(--site-gutter)] py-14 md:px-[clamp(24px,5vw,96px)] md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            label="Our Team"
            title={<>The people behind<br /><span className="italic text-[#9B72B3]">your salon experience.</span></>}
          />
          <p className="max-w-xl text-base leading-8 text-[var(--muted)] lg:ml-auto">
            Meet the professionals who bring care, precision and attention to every appointment.
          </p>
        </div>
        <div className="mt-12 flex snap-x gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4 lg:gap-6">
          {teamMembers.map((member, index) => (
            <motion.article
              key={member.name}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 60, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative h-[500px] w-[80vw] shrink-0 snap-start overflow-hidden rounded-[30px] border border-[var(--border)] bg-[#F4EDF8] md:h-[520px] md:w-auto"
            >
              <Image src={member.image} alt={member.alt} fill sizes="(min-width:1024px) 25vw, (min-width:768px) 50vw, 80vw" className="object-cover grayscale-[35%] transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
              <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#271D2C]/80 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 rounded-[24px] border border-white/40 bg-white/16 p-5 text-white backdrop-blur-md transition duration-500 group-hover:-translate-y-3">
                <h3 className="font-serif text-[28px] font-semibold md:text-3xl">{member.name}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.14em] text-white/75">{member.role}</p>
                <Link href="/contact" className="mt-5 inline-flex items-center text-sm font-medium opacity-100 transition md:opacity-0 md:group-hover:opacity-100">
                  Book with team <ArrowUpRight aria-hidden="true" className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
