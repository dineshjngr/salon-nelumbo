import Image from "next/image";
import type { ReactNode } from "react";
import { SiteContainer } from "@/src/components/ui/SiteContainer";

type PageHeroProps = {
  label: string;
  title: ReactNode;
  description: string;
  image?: string;
  imageAlt?: string;
};

export function PageHero({
  label,
  title,
  description,
  image = "/images/gallery/salon-interior.jpg",
  imageAlt = "Salon Nelumbo interior",
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#FAF7FC] pb-20 pt-32 md:pb-24 md:pt-40">
      <div className="pointer-events-none absolute right-[8%] top-24 h-72 w-72 rounded-full bg-[#EDE3F2]/80 blur-3xl" aria-hidden="true" />
      <SiteContainer className="relative grid items-end gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="mb-5 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
            <span className="h-px w-8 bg-[var(--primary)]/45" />
            {label}
          </p>
          <h1 className="font-serif text-[52px] font-semibold leading-[0.96] text-[var(--text)] md:text-[78px]">
            {title}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
            {description}
          </p>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[34px] border border-white/60 bg-[#EDE3F2] shadow-[0_18px_55px_rgba(84,37,104,0.12)]">
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="(min-width: 1024px) 48vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#271D2C]/20 to-transparent" />
        </div>
      </SiteContainer>
    </section>
  );
}
