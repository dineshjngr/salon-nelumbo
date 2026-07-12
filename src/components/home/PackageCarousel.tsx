"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useCallback,
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
const autoplayDelay = 3500;
const desktopAutoplaySpeed = 650;

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

function getPerView(width: number, isMobile: boolean) {
  if (isMobile) {
    return 1.08;
  }

  if (width >= 1440) {
    return 2.5;
  }

  if (width >= 1280) {
    return 2;
  }

  if (width >= 1024) {
    return 2;
  }

  return 1.5;
}

function getGap(width: number, isMobile: boolean) {
  if (isMobile) {
    return 16;
  }

  return width >= 1280 ? 24 : 20;
}

export function PackageCarousel() {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [active, setActive] = useState(packages.length);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(360);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [focused, setFocused] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const viewportRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const slides = useMemo(() => [...packages, ...packages, ...packages], []);
  const cycleLength = packages.length;
  const perView = getPerView(viewportWidth, isMobile);
  const gap = getGap(viewportWidth, isMobile);
  const step = cardWidth + gap;
  const visibleCount = Math.min(cycleLength, Math.max(1, Math.ceil(perView)));
  const moveBy = useCallback(
    (delta: number) => {
      setActive((current) => {
        const next = current + delta;

        if (next >= cycleLength * 2) {
          return next - cycleLength;
        }

        if (next < cycleLength) {
          return next + cycleLength;
        }

        return next;
      });
    },
    [cycleLength]
  );

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const updateSizes = () => {
      const viewportRect = viewport.getBoundingClientRect();
      const nextWidth = viewportRect.width;
      const nextPerView = getPerView(nextWidth, isMobile);
      const nextGap = getGap(nextWidth, isMobile);
      const nextCardWidth = (nextWidth - nextGap * (nextPerView - 1)) / nextPerView;

      setViewportWidth(nextWidth);
      setCardWidth(nextCardWidth);
    };

    updateSizes();

    const observer = new ResizeObserver(updateSizes);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, [isMobile]);

  useLayoutEffect(() => {
    if (!viewportWidth || !cardWidth) {
      return;
    }

    x.set(-active * step);
  }, [active, cardWidth, step, viewportWidth, x]);

  useEffect(() => {
    const update = () => setIsHidden(document.hidden);
    update();
    document.addEventListener("visibilitychange", update);

    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  useEffect(() => {
    if (shouldReduceMotion || hovered || dragging || focused || isHidden) {
      return;
    }

    const timer = window.setInterval(() => {
      moveBy(1);
    }, autoplayDelay);

    return () => window.clearInterval(timer);
  }, [dragging, focused, hovered, isHidden, moveBy, shouldReduceMotion]);

  useEffect(() => {
    const controls = animate(x, -active * step, {
      duration: shouldReduceMotion ? 0.15 : desktopAutoplaySpeed / 1000,
      ease: easeOut,
    });

    return () => controls.stop();
  }, [active, shouldReduceMotion, step, x]);

  const movePrevious = () => {
    moveBy(-1);
  };

  const moveNext = () => {
    moveBy(1);
  };

  const onDragEnd = () => {
    const currentX = x.get();
    const targetX = -active * step;
    const delta = currentX - targetX;
    const threshold = Math.max(72, step * 0.18);

    if (Math.abs(delta) >= threshold) {
      if (delta < 0) {
        moveBy(1);
      } else {
        moveBy(-1);
      }
    }

    setDragging(false);
  };

  const currentVisibleIndex = ((active - cycleLength) % cycleLength + cycleLength) % cycleLength;
  const visibleStart = currentVisibleIndex + 1;
  const visibleEnd = ((currentVisibleIndex + visibleCount - 1) % cycleLength) + 1;
  const liveText = `Showing packages ${String(visibleStart).padStart(2, "0")} to ${String(visibleEnd).padStart(2, "0")} of ${cycleLength}`;

  const carouselViewport = (
    <div ref={viewportRef} className="w-full max-w-full overflow-hidden">
      <motion.div
        className="flex items-stretch"
        style={{
          x,
          gap: `${gap}px`,
          cursor: dragging ? "grabbing" : "grab",
          touchAction: "pan-y",
          willChange: "transform",
        }}
        drag={shouldReduceMotion ? false : "x"}
        dragElastic={0.06}
        dragMomentum={false}
        onDragStart={() => {
          setDragging(true);
        }}
        onDragEnd={onDragEnd}
      >
        {slides.map((salonPackage, index) => (
          <div
            key={`${salonPackage.id}-${index}`}
            style={{ flex: `0 0 ${cardWidth}px` }}
            className="min-w-0"
          >
            <PackageCard
              salonPackage={salonPackage}
              visual={visuals[salonPackage.id - 1]}
              active={index === active}
              mobile={isMobile}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <div
      className="relative select-none outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setFocused(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          movePrevious();
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          moveNext();
        }
      }}
    >
      <p aria-live="polite" className="sr-only">
        {liveText}
      </p>

      <div className="md:hidden">
        {carouselViewport}
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            aria-label="Previous package"
            onClick={movePrevious}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/45 bg-[rgba(255,255,255,0.66)] text-[var(--primary)] shadow-[0_18px_60px_rgba(84,37,104,0.10)] backdrop-blur-[18px] transition duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          <button
            type="button"
            aria-label="Next package"
            onClick={moveNext}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/45 bg-[rgba(255,255,255,0.66)] text-[var(--primary)] shadow-[0_18px_60px_rgba(84,37,104,0.10)] backdrop-blur-[18px] transition duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="relative hidden px-14 md:block lg:px-16">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-14 bg-[linear-gradient(to_right,rgba(250,247,252,1),rgba(250,247,252,0))]" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-14 bg-[linear-gradient(to_left,rgba(250,247,252,1),rgba(250,247,252,0))]" />

        <button
          type="button"
          aria-label="Previous package"
          onClick={movePrevious}
          className="absolute left-2 top-1/2 z-30 inline-flex h-[52px] w-[52px] -translate-y-1/2 items-center justify-center rounded-full border border-white/55 bg-[rgba(255,255,255,0.72)] text-[var(--primary)] shadow-[0_14px_40px_rgba(84,37,104,0.14)] backdrop-blur-[16px] transition duration-300 hover:-translate-x-1 hover:border-[rgba(84,37,104,0.24)] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
        >
          <ChevronLeft className="h-5 w-5 transition duration-300" aria-hidden="true" />
        </button>

        <button
          type="button"
          aria-label="Next package"
          onClick={moveNext}
          className="absolute right-2 top-1/2 z-30 inline-flex h-[52px] w-[52px] -translate-y-1/2 items-center justify-center rounded-full border border-white/55 bg-[rgba(255,255,255,0.72)] text-[var(--primary)] shadow-[0_14px_40px_rgba(84,37,104,0.14)] backdrop-blur-[16px] transition duration-300 hover:translate-x-1 hover:border-[rgba(84,37,104,0.24)] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
        >
          <ChevronRight className="h-5 w-5 transition duration-300" aria-hidden="true" />
        </button>

        {carouselViewport}
      </div>
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
  const visibleItems = salonPackage.items.slice(0, 4);
  const extraCount = salonPackage.items.length - visibleItems.length;

  return (
    <motion.article
      className={`group flex h-full flex-col overflow-hidden rounded-[28px] border border-[var(--border)] bg-white/72 shadow-[0_18px_60px_rgba(84,37,104,0.08)] ${
        mobile ? "h-[520px]" : "h-[560px]"
      }`}
      transition={{ duration: 0.45, ease: easeOut }}
      whileHover={mobile ? undefined : { y: -8 }}
    >
      <div className="relative h-[210px] flex-shrink-0 overflow-hidden md:h-[220px]">
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes="(min-width: 1440px) 26vw, (min-width: 1280px) 33vw, (min-width: 1024px) 44vw, 88vw"
          draggable={false}
          className="object-cover transition duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-transparent to-[#271D2C]/14 transition duration-500 group-hover:to-[#271D2C]/24" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.24),transparent_45%)] opacity-70 transition duration-500 group-hover:opacity-100" />
      </div>

      <div className="flex flex-1 min-w-0 flex-col p-[22px] md:p-6 lg:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
              Package {String(salonPackage.id).padStart(2, "0")}
            </p>
            <h3 className="mt-2 min-w-0 break-words font-serif text-[clamp(28px,8vw,36px)] font-semibold leading-[1.05] text-[var(--text)]">
              {salonPackage.title}
            </h3>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-serif text-[32px] font-semibold leading-none text-[var(--primary)] transition duration-500 group-hover:drop-shadow-[0_0_18px_rgba(84,37,104,0.20)]">
              99
            </p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
              AED
            </p>
          </div>
        </div>

        {salonPackage.badge ? (
          <div className="mt-4">
            <span className="inline-flex rounded-full border border-[#A678B6]/35 bg-[#F4EDF8] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--primary)]">
              {salonPackage.badge}
            </span>
          </div>
        ) : null}

        <ul className="mt-5 flex min-h-0 flex-1 min-w-0 flex-col gap-3 overflow-hidden">
          {visibleItems.map((item) => (
            <li key={item} className="flex min-w-0 gap-3 text-[14px] leading-6 text-[var(--muted)]">
              <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
              <span className="min-w-0 break-words">{item}</span>
            </li>
          ))}
          {extraCount > 0 ? (
            <li className="flex min-w-0 gap-3 text-[14px] leading-6 text-[var(--muted)]">
              <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
              <span className="min-w-0 break-words">+ {extraCount} more services</span>
            </li>
          ) : null}
        </ul>

        <Link
          href={packageBookingUrl(salonPackage.id)}
          target="_blank"
          rel="noopener noreferrer"
          className="group/cta mt-auto inline-flex h-[54px] w-full flex-shrink-0 items-center justify-center rounded-full bg-[var(--primary)] px-5 text-sm font-medium uppercase tracking-[0.08em] text-white transition duration-500 hover:bg-[var(--primary-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
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
