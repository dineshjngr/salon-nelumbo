"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experienceSteps } from "@/src/data/experience";
import { GlassPanel } from "@/src/components/ui/GlassPanel";
import { SectionHeading } from "@/src/components/ui/SectionHeading";

gsap.registerPlugin(ScrollTrigger);

export function SalonExperience() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useLayoutEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const section = ref.current;
    const track = trackRef.current;
    if (!section || !track) {
      return;
    }

    const ctx = gsap.context(() => {
      const travel = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const progressBar = section.querySelector<HTMLElement>("[data-progress]");

      gsap.to(track, {
        x: () => -travel(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${travel()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      if (progressBar) {
        gsap.fromTo(
          progressBar,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: () => `+=${travel()}`,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, [shouldReduceMotion]);

  return (
    <section id="salon-experience" ref={ref} className="relative bg-[#F4EDF8] lg:min-h-screen">
      <div className="hidden overflow-hidden px-16 py-24 lg:block">
        <div className="mx-auto flex h-full max-w-[1440px] items-center gap-16">
          <div className="w-[36%] shrink-0">
            <SectionHeading
              label="Your Visit"
              title={<>From arrival<br /><span className="italic text-[#9B72B3]">to afterglow.</span></>}
              description="A calm, thoughtful experience designed around comfort, care and confidence."
            />
            <p className="mt-12 text-xs font-medium uppercase tracking-[0.18em] text-[var(--primary)]">Scroll to explore</p>
            <div className="mt-5 h-px w-full bg-[#542568]/15">
              <div data-progress className="h-px origin-left scale-x-0 bg-[var(--primary)]" />
            </div>
          </div>
          <div ref={trackRef} className="flex gap-6 will-change-transform">
            {experienceSteps.map((step) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="group relative h-[560px] w-[430px] shrink-0 overflow-hidden rounded-[32px] border border-white/50 bg-white/40">
                  <Image src={step.image} alt={step.alt} fill sizes="430px" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#271D2C]/78 via-[#271D2C]/20 to-transparent" />
                  <p className="absolute left-8 top-7 font-serif text-[82px] font-semibold text-white/45 transition group-hover:text-[var(--primary)]">{step.number}</p>
                  <GlassPanel className="absolute inset-x-6 bottom-6 rounded-[24px] p-6 transition duration-500 group-hover:-translate-y-2">
                    <Icon aria-hidden="true" className="mb-5 h-6 w-6 text-[var(--primary)] transition group-hover:rotate-6" />
                    <h3 className="font-serif text-4xl font-semibold text-[var(--text)]">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{step.text}</p>
                  </GlassPanel>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="px-[var(--site-gutter)] py-14 md:px-[clamp(24px,5vw,96px)] md:py-24 lg:hidden">
        <SectionHeading
          label="Your Visit"
          title={<>From arrival<br /><span className="italic text-[#9B72B3]">to afterglow.</span></>}
          description="A calm, thoughtful experience designed around comfort, care and confidence."
        />
        <div className="mt-10 flex snap-x gap-4 overflow-x-auto pb-4">
          {experienceSteps.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.title} className="relative h-[400px] w-[82vw] shrink-0 snap-start overflow-hidden rounded-[28px]">
                <Image src={step.image} alt={step.alt} fill sizes="82vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#271D2C]/82 to-transparent" />
                <GlassPanel className="absolute inset-x-5 bottom-5 rounded-[22px] p-5">
                  <Icon aria-hidden="true" className="mb-4 h-5 w-5 text-[var(--primary)]" />
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--muted)]">{step.number}</p>
                  <h3 className="mt-2 font-serif text-3xl font-semibold text-[var(--text)]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{step.text}</p>
                </GlassPanel>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
