"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";
import { PageHero } from "@/src/components/layout/PageHero";
import { SiteContainer } from "@/src/components/ui/SiteContainer";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

const filters = ["All", "Hair", "Nails", "Facial", "Relaxation", "Salon"] as const;

const images = [
  { title: "Salon interior", category: "Salon", src: "/images/gallery/salon-interior.jpg", alt: "Salon interior with warm soft light", className: "lg:row-span-2 lg:h-[620px]" },
  { title: "Hair station", category: "Hair", src: "/images/gallery/hair-station.jpg", alt: "Hair styling station in a salon", className: "lg:h-[300px]" },
  { title: "Nail station", category: "Nails", src: "/images/gallery/nail-station.jpg", alt: "Nail station with manicure tools", className: "lg:h-[300px]" },
  { title: "Facial room", category: "Facial", src: "/images/gallery/facial-room.jpg", alt: "Facial treatment room with towels", className: "lg:h-[300px]" },
  { title: "Beauty products", category: "Salon", src: "/images/gallery/products.jpg", alt: "Beauty products and salon tools", className: "lg:h-[300px]" },
  { title: "Relaxation corner", category: "Relaxation", src: "/images/gallery/relaxation-corner.jpg", alt: "Relaxing spa treatment corner", className: "lg:col-span-2 lg:h-[360px]" },
];

export default function GalleryPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [active, setActive] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const visible = filter === "All" ? images : images.filter((image) => image.category === filter);

  useEffect(() => {
    if (active === null) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((current) => (current === null ? current : (current + 1) % visible.length));
      if (event.key === "ArrowLeft") setActive((current) => (current === null ? current : (current - 1 + visible.length) % visible.length));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, visible.length]);

  return (
    <>
      <Header />
      <main className="bg-[var(--background)]">
        <PageHero
          label="Gallery"
          title={<>Salon moments,<br /><span className="italic text-[#9B72B3]">softly framed.</span></>}
          description="Explore treatment spaces, beauty details and salon atmosphere in the same refined visual language as the Salon Nelumbo experience."
          image="/images/gallery/salon-interior.jpg"
          imageAlt="Salon interior preview"
        />

        <section className="section-space">
          <SiteContainer>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {filters.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={`shrink-0 rounded-full border px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)] ${
                    filter === item ? "border-[var(--primary)] bg-[var(--primary)] text-white" : "border-[var(--border)] bg-white/70 text-[var(--primary)] hover:bg-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <motion.div layout className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
              {visible.map((item, index) => (
                <motion.button
                  layout
                  key={item.title}
                  type="button"
                  onClick={() => setActive(index)}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35 }}
                  className={`group relative h-[420px] overflow-hidden rounded-[28px] text-left outline-none transition duration-500 hover:rounded-[20px] focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${item.className}`}
                >
                  <Image src={item.src} alt={item.alt} fill sizes="(min-width:1024px) 25vw, (min-width:768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[var(--primary)]/0 transition group-hover:bg-[var(--primary)]/28" />
                  <div className="absolute inset-x-5 bottom-5 flex items-center justify-between rounded-full bg-white/18 p-4 text-white opacity-100 backdrop-blur-md transition md:opacity-0 md:group-hover:opacity-100">
                    <span className="font-medium">{item.title}</span>
                    <Maximize2 aria-hidden="true" className="h-5 w-5" />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </SiteContainer>
        </section>

        <section className="section-space bg-white">
          <SiteContainer>
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <SectionHeading
                label="Salon Atmosphere"
                title={<>A setting made<br /><span className="italic text-[#9B72B3]">for quiet care.</span></>}
                description="Soft light, clean details and a calm pace shape every appointment."
              />
              <div className="relative aspect-[16/10] overflow-hidden rounded-[34px]">
                <Image src="/images/gallery/relaxation-corner.jpg" alt="Relaxation corner in salon setting" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
              </div>
            </div>
          </SiteContainer>
        </section>
      </main>
      <Footer />

      {active !== null && visible[active] ? (
        <div role="dialog" aria-modal="true" aria-label={`${visible[active].title} image`} className="fixed inset-0 z-[80] grid place-items-center bg-[#271D2C]/82 p-4 backdrop-blur-md">
          <button ref={closeRef} type="button" onClick={() => setActive(null)} aria-label="Close gallery" className="absolute right-5 top-5 rounded-full bg-white p-3 text-[var(--primary)] focus-visible:ring-2 focus-visible:ring-white">
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => setActive((active - 1 + visible.length) % visible.length)} aria-label="Previous image" className="absolute left-5 top-1/2 rounded-full bg-white/85 p-3 text-[var(--primary)]">
            <ChevronLeft aria-hidden="true" className="h-5 w-5" />
          </button>
          <figure className="w-full max-w-5xl">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-white">
              <Image src={visible[active].src} alt={visible[active].alt} fill sizes="90vw" className="object-cover" />
            </div>
            <figcaption className="mt-4 text-center font-serif text-3xl font-semibold text-white">{visible[active].title}</figcaption>
          </figure>
          <button type="button" onClick={() => setActive((active + 1) % visible.length)} aria-label="Next image" className="absolute right-5 top-1/2 rounded-full bg-white/85 p-3 text-[var(--primary)]">
            <ChevronRight aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      ) : null}
    </>
  );
}
