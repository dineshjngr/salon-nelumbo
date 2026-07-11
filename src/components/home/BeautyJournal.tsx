"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { journalPosts } from "@/src/data/journal";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

export function BeautyJournal() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="beauty-journal" className="bg-white px-[clamp(24px,5vw,96px)] py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <SectionHeading
          label="The Beauty Journal"
          title={<>Simple care,<br /><span className="italic text-[#9B72B3]">thoughtfully shared.</span></>}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {journalPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 60, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <Link href={post.href} className="block rounded-[30px] outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[30px] bg-[#F4EDF8]">
                  <Image src={post.image} alt={post.alt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:-translate-y-3 group-hover:scale-105" />
                </div>
                <div className="pt-6">
                  <span className="rounded-full border border-[var(--border)] px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[var(--primary)] transition group-hover:bg-[var(--primary)] group-hover:text-white">{post.category}</span>
                  <h3 className="mt-6 font-serif text-4xl font-semibold leading-tight text-[var(--text)] transition group-hover:translate-x-1">{post.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{post.excerpt}</p>
                  <span className="mt-5 inline-flex items-center text-sm font-medium text-[var(--primary)]">
                    Read article <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
