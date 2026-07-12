"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Camera } from "lucide-react";
import { galleryImages } from "@/src/data/images";
import { salon } from "@/src/data/site-data";
import { SiteContainer } from "@/src/components/ui/SiteContainer";

const feedItems = galleryImages.slice(0, 6);
const easeOut = [0.22, 1, 0.36, 1] as const;

export function InstagramFeed() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="instagram" className="section-space bg-[#FAF7FC]">
      <SiteContainer>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="mb-5 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
              <span className="h-px w-8 bg-[var(--primary)]/45" />
              Follow Our Beauty Journey
            </p>
            <h2 className="font-serif text-[32px] font-semibold leading-[0.98] text-[var(--text)] md:text-[58px] lg:text-[72px]">
              See our latest salon moments
              <br />
              and client transformations.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-[var(--muted)] md:mt-6 md:text-base md:leading-8 lg:text-lg">
              See our latest work, salon moments, client transformations and daily updates on Instagram.
              Enjoy a luxury editorial gallery of curated beauty imagery.
            </p>
          </div>
          <div className="flex items-center justify-start">
            <Link
              href={salon.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center rounded-full border border-[var(--border)] bg-white px-8 text-sm font-medium uppercase tracking-[0.12em] text-[var(--primary)] transition hover:-translate-y-0.5 hover:bg-[var(--primary)] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
            >
              Follow us on Instagram
            </Link>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:mt-12 xl:grid-cols-3">
          {feedItems.map((item, index) => (
            <motion.a
              key={item.src}
              href={salon.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View Instagram post about ${item.title}`}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: easeOut }}
              className="group relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-white shadow-[var(--shadow-sm)]"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1280px) 22vw, (min-width: 640px) 45vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-[var(--primary)]/0 transition duration-500 group-hover:bg-[var(--primary)]/28" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-500 group-hover:opacity-100">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-[var(--primary)] shadow-[var(--shadow-sm)]">
                    <Camera aria-hidden="true" className="h-6 w-6" />
                  </span>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
                  Salon Nelumbo
                </p>
                <h3 className="mt-3 font-serif text-2xl font-semibold text-[var(--text)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  Discover beauty, style and salon details from our latest Instagram feed.
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
