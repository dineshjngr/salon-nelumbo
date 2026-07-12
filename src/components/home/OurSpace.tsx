"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

const gallery = [
  { title: "Salon interior", src: "/images/gallery/salon-interior.jpg", alt: "Warm modern salon interior", className: "lg:row-span-2 lg:h-[620px]" },
  { title: "Hair station", src: "/images/gallery/hair-station.jpg", alt: "Professional salon hair styling station", className: "lg:h-[298px]" },
  { title: "Nail station", src: "/images/gallery/nail-station.jpg", alt: "Elegant nail care station", className: "lg:h-[298px]" },
  { title: "Facial room", src: "/images/gallery/facial-room.jpg", alt: "Clean facial treatment room", className: "lg:h-[298px]" },
  { title: "Beauty products", src: "/images/gallery/products.jpg", alt: "Salon beauty products and tools", className: "lg:h-[298px]" },
  { title: "Relaxation corner", src: "/images/gallery/relaxation-corner.jpg", alt: "Relaxing spa treatment corner", className: "lg:col-span-2 lg:h-[330px]" },
];

export function OurSpace() {
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (active === null) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((current) => (current === null ? current : (current + 1) % gallery.length));
      if (event.key === "ArrowLeft") setActive((current) => (current === null ? current : (current - 1 + gallery.length) % gallery.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="our-space" className="relative overflow-hidden bg-white px-[var(--site-gutter)] py-14 md:px-[clamp(24px,5vw,96px)] md:py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <SectionHeading
            label="Inside The Salon"
            title={<>A space made<br /><span className="italic text-[#9B72B3]">for your pause.</span></>}
          />
          <p className="max-w-xl text-base leading-8 text-[var(--muted)] lg:ml-auto">
            Soft light, thoughtful details and a calm setting for every appointment.
          </p>
        </div>
        <div className="mt-14 flex snap-x gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4 lg:gap-6">
          {gallery.map((item, index) => (
            <motion.button
              key={item.title}
              type="button"
              onClick={() => setActive(index)}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, clipPath: "inset(18% 0 18% 0 round 28px)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0% 0 0% 0 round 28px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative h-[420px] w-[82vw] shrink-0 snap-start overflow-hidden rounded-[28px] text-left outline-none transition duration-500 hover:rounded-[20px] focus-visible:ring-2 focus-visible:ring-[var(--primary)] md:w-auto ${item.className}`}
            >
              <Image src={item.src} alt={item.alt} fill sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 84vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-[var(--primary)]/0 transition group-hover:bg-[var(--primary)]/28" />
              <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-full bg-white/0 p-3 text-white opacity-0 transition group-hover:bg-white/18 group-hover:opacity-100">
                <span className="font-medium">{item.title}</span>
                <Maximize2 aria-hidden="true" className="h-5 w-5" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${gallery[active].title} image`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-[#271D2C]/82 p-4 backdrop-blur-md"
          >
            <motion.button
              ref={closeRef}
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close gallery"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="absolute right-5 top-5 rounded-full bg-white p-3 text-[var(--primary)] focus-visible:ring-2 focus-visible:ring-white"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setActive((active - 1 + gallery.length) % gallery.length)}
              aria-label="Previous image"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -10, opacity: 0 }}
              className="absolute left-5 top-1/2 rounded-full bg-white/85 p-3 text-[var(--primary)]"
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </motion.button>
            <motion.figure
              initial={{ y: 16, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 12, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-5xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-white">
                <Image src={gallery[active].src} alt={gallery[active].alt} fill sizes="90vw" className="object-cover" />
              </div>
              <figcaption className="mt-4 text-center font-serif text-3xl font-semibold text-white">{gallery[active].title}</figcaption>
            </motion.figure>
            <motion.button
              type="button"
              onClick={() => setActive((active + 1) % gallery.length)}
              aria-label="Next image"
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 10, opacity: 0 }}
              className="absolute right-5 top-1/2 rounded-full bg-white/85 p-3 text-[var(--primary)]"
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </motion.button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
