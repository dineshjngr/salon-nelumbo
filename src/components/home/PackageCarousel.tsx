"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { animate, motion, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { packages, packageBookingUrl } from "@/src/data/packages";
import { images } from "@/src/data/images";

const easeOut = [0.22, 1, 0.36, 1] as const;
const autoplayMs = 5500;

const visuals = [
  images.hair,
  images.massage,
  images.hair,
  images.massage,
  images.nails,
  images.waxing,
  images.facial,
  images.nails,
  images.nails,
  images.massage,
];

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia(query);
      mediaQuery.addEventListener("change", callback);
      return () => mediaQuery.removeEventListener("change", callback);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

function wrapIndex(index: number) {
  return (index + packages.length) % packages.length;
}

export function PackageCarousel() {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [cardWidth, setCardWidth] = useState(430);
  const [viewportWidth, setViewportWidth] = useState(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const gap = isMobile ? 16 : 36;
  const step = cardWidth + gap;

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const card = firstCardRef.current;

    if (!viewport || !card) {
      return;
    }

    const updateSizes = () => {
      const viewportRect = viewport.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      setViewportWidth(viewportRect.width);
      setCardWidth(cardRect.width);
    };

    updateSizes();
    const observer = new ResizeObserver(updateSizes);
    observer.observe(viewport);
    observer.observe(card);

    return () => observer.disconnect();
  }, [isMobile]);

  const targetX = useMemo(() => {
    if (!viewportWidth) {
      return 0;
    }

    return viewportWidth / 2 - cardWidth / 2 - active * step;
  }, [active, cardWidth, step, viewportWidth]);

  useEffect(() => {
    const controls = animate(x, targetX, {
      duration: shouldReduceMotion ? 0.15 : 0.55,
      ease: easeOut,
    });

    return () => controls.stop();
  }, [shouldReduceMotion, targetX, x]);

  useEffect(() => {
    const update = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || paused || dragging || isMobile) {
      return;
    }

    const timer = window.setInterval(() => {
      setActive((current) => wrapIndex(current + 1));
    }, autoplayMs);

    return () => window.clearInterval(timer);
  }, [dragging, isMobile, paused, shouldReduceMotion]);

  const pause = () => setPaused(true);
  const resume = () => {
    if (!dragging) {
      setPaused(false);
    }
  };

  function goPrevious() {
    setActive((current) => wrapIndex(current - 1));
  }

  function goNext() {
    setActive((current) => wrapIndex(current + 1));
  }

  function commitDrag() {
    const currentX = x.get();
    const delta = currentX - targetX;
    const direction = Math.abs(delta) < Math.max(72, step * 0.18) ? 0 : delta > 0 ? -1 : 1;

    if (direction !== 0) {
      setActive((current) => wrapIndex(current + direction));
    }

    setDragging(false);
    setPaused(false);
  }

  return (
    <div
      tabIndex={0}
      className="relative select-none outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goPrevious();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          goNext();
        }
      }}
    >
      {!isMobile ? (
        <div className="mx-auto grid max-w-[1440px] grid-cols-[auto,minmax(0,1fr),auto] items-center gap-4 lg:gap-6">
          <button
            type="button"
            aria-label="Previous package"
            onClick={goPrevious}
            onFocus={pause}
            onBlur={resume}
            className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/45 bg-[rgba(255,255,255,0.66)] text-[var(--primary)] shadow-[0_18px_60px_rgba(84,37,104,0.10)] backdrop-blur-[18px] transition duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
          >
            <ChevronLeft className="h-5 w-5 transition duration-300 group-hover:-translate-x-0.5" aria-hidden="true" />
          </button>

          <div
            ref={viewportRef}
            className="relative overflow-hidden py-6 outline-none"
            style={{ perspective: 1800 }}
          >
            <motion.div
              className="flex items-stretch"
              style={{ x, cursor: dragging ? "grabbing" : "grab" }}
              drag={shouldReduceMotion ? false : "x"}
              dragElastic={0.08}
              dragMomentum={false}
              onDragStart={() => {
                setDragging(true);
                setPaused(true);
              }}
              onDragEnd={() => commitDrag()}
              onPointerDown={() => pause()}
              onPointerUp={() => resume()}
            >
              {packages.map((salonPackage, index) => {
                const offset = index - active;
                const visual = visuals[index % visuals.length];
                const absOffset = Math.abs(offset);
                const isActive = offset === 0;
                const isNeighbour = absOffset === 1;
                const isFar = absOffset > 2;

                return (
                  <motion.div
                    key={salonPackage.id}
                    ref={index === 0 ? firstCardRef : undefined}
                    data-cursor-card="true"
                    className="flex-[0_0_clamp(340px,30vw,430px)]"
                    animate={
                      shouldReduceMotion
                        ? {
                            opacity: isActive ? 1 : isNeighbour ? 0.66 : 0.22,
                            scale: isActive ? 1 : 0.92,
                            rotateY: 0,
                            zIndex: isActive ? 5 : 1,
                          }
                        : {
                            opacity: isActive ? 1 : isNeighbour ? 0.72 : 0.18,
                            scale: isActive ? 1 : isNeighbour ? 0.9 : 0.82,
                            rotateY: isActive ? 0 : offset < 0 ? 7 : -7,
                            zIndex: isActive ? 5 : isNeighbour ? 3 : 1,
                            filter: isFar ? "blur(2px)" : "blur(0px)",
                          }
                    }
                    transition={{ duration: shouldReduceMotion ? 0.15 : 0.55, ease: easeOut }}
                    style={{
                      transformStyle: "preserve-3d",
                      pointerEvents: isFar ? "none" : "auto",
                      marginRight: index === packages.length - 1 ? 0 : gap,
                    }}
                  >
                    <PackageCard salonPackage={salonPackage} visual={visual} active={isActive} />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          <button
            type="button"
            aria-label="Next package"
            onClick={goNext}
            onFocus={pause}
            onBlur={resume}
            className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/45 bg-[rgba(255,255,255,0.66)] text-[var(--primary)] shadow-[0_18px_60px_rgba(84,37,104,0.10)] backdrop-blur-[18px] transition duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
          >
            <ChevronRight className="h-5 w-5 transition duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div className="-mx-[clamp(20px,5vw,96px)] overflow-x-auto px-[clamp(20px,5vw,96px)] pb-3">
          <div className="flex snap-x snap-mandatory gap-4 pr-[18vw]">
            {packages.map((salonPackage, index) => (
              <div
                key={salonPackage.id}
                className="min-w-[84vw] snap-start sm:min-w-[58vw] md:min-w-[44vw]"
              >
                <PackageCard
                  salonPackage={salonPackage}
                  visual={visuals[index % visuals.length]}
                  active={index === active}
                  mobile
                />
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              type="button"
              aria-label="Previous package"
              onClick={goPrevious}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/45 bg-[rgba(255,255,255,0.66)] text-[var(--primary)] shadow-[0_18px_60px_rgba(84,37,104,0.10)] backdrop-blur-[18px] transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex flex-1 items-center justify-center gap-2">
              {packages.map((packageItem, index) => (
                <button
                  key={packageItem.id}
                  type="button"
                  onClick={() => setActive(index)}
                  aria-label={`Show package ${String(packageItem.id).padStart(2, "0")}`}
                  aria-current={index === active ? "true" : undefined}
                  className={`h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)] ${
                    index === active ? "w-8 bg-[var(--primary)]" : "w-2 bg-[var(--border)]"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Next package"
              onClick={goNext}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/45 bg-[rgba(255,255,255,0.66)] text-[var(--primary)] shadow-[0_18px_60px_rgba(84,37,104,0.10)] backdrop-blur-[18px] transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}

      {!isMobile ? (
        <div className="mx-auto mt-8 flex max-w-[1440px] items-center justify-between gap-4">
          <div className="flex flex-1 items-center justify-center gap-2">
            {packages.map((packageItem, index) => (
              <button
                key={packageItem.id}
                type="button"
                onClick={() => setActive(index)}
                onFocus={pause}
                onBlur={resume}
                aria-label={`Show package ${String(packageItem.id).padStart(2, "0")}`}
                aria-current={index === active ? "true" : undefined}
                className={`h-2 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)] ${
                  index === active ? "w-8 bg-[var(--primary)]" : "w-2 bg-[var(--border)]"
                }`}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PackageCard({
  salonPackage,
  visual,
  active,
  mobile = false,
}: {
  salonPackage: (typeof packages)[number];
  visual: { src: string; alt: string };
  active: boolean;
  mobile?: boolean;
}) {
  return (
    <motion.article
      className="group flex min-h-[590px] flex-col overflow-hidden rounded-[28px] border border-[var(--border)] bg-white/72 shadow-[0_18px_60px_rgba(84,37,104,0.08)]"
      transition={{ duration: 0.45, ease: easeOut }}
      whileHover={mobile ? undefined : { y: -8 }}
    >
      <div className="relative h-[220px] overflow-hidden">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes="(min-width: 1280px) 430px, (min-width: 768px) 60vw, 84vw"
          draggable={false}
          className="object-cover transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-transparent to-[#271D2C]/14 transition duration-500 group-hover:to-[#271D2C]/24" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.24),transparent_45%)] opacity-70 transition duration-500 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
              Package {String(salonPackage.id).padStart(2, "0")}
            </p>
            <h3 className="mt-2 font-serif text-[30px] font-semibold leading-none text-[var(--text)]">
              {salonPackage.title}
            </h3>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-serif text-[32px] font-semibold leading-none text-[var(--primary)] transition duration-500 group-hover:drop-shadow-[0_0_18px_rgba(84,37,104,0.20)]">
              99
            </p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted)]">AED</p>
          </div>
        </div>

        {salonPackage.badge ? (
          <div className="mt-4">
            <span className="inline-flex rounded-full border border-[#A678B6]/35 bg-[#F4EDF8] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--primary)]">
              {salonPackage.badge}
            </span>
          </div>
        ) : null}

        <ul className="mt-5 space-y-3">
          {salonPackage.items.map((item) => (
            <li key={item} className="flex gap-3 text-sm leading-6 text-[var(--muted)]">
              <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>

        <Link
          href={packageBookingUrl(salonPackage.id)}
          target="_blank"
          rel="noopener noreferrer"
          className="group/cta mt-auto inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--primary)] px-5 text-sm font-medium uppercase tracking-[0.08em] text-white transition duration-500 hover:bg-[var(--primary-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
        >
          Book Package
          <ArrowUpRight
            className="ml-2 h-4 w-4 transition duration-300 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1 group-hover/cta:rotate-45"
            aria-hidden="true"
          />
        </Link>

        {!active ? <span className="sr-only">Inactive package preview</span> : null}
      </div>
    </motion.article>
  );
}
