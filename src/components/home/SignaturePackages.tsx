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
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { packages, packageBookingUrl } from "@/src/data/packages";
import { images } from "@/src/data/images";

const easeOut = [0.22, 1, 0.36, 1] as const;
const autoplayDelay = 3500;
const autoplaySpeed = 650;

const packageVisuals = [
  images.hair,
  images.massage,
  images.hair,
  images.massage,
  images.nails,
  images.waxing,
  images.facial,
  images.pedicure,
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
    return 3;
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

  return width >= 1280 ? 24 : width >= 1024 ? 22 : 18;
}

export function SignaturePackages() {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [active, setActive] = useState(packages.length);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(360);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [focused, setFocused] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [expandedMore, setExpandedMore] = useState<string | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const slides = useMemo(() => [...packages, ...packages, ...packages], []);
  const cycleLength = packages.length;
  const perView = getPerView(viewportWidth, isMobile);
  const gap = getGap(viewportWidth, isMobile);
  const step = cardWidth + gap;
  const visibleCount = Math.min(cycleLength, Math.max(1, Math.ceil(perView)));
  const liveStart = ((active - cycleLength) % cycleLength + cycleLength) % cycleLength + 1;
  const liveEnd = ((liveStart - 1 + visibleCount - 1) % cycleLength) + 1;

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

  const movePrevious = useCallback(() => moveBy(-1), [moveBy]);
  const moveNext = useCallback(() => moveBy(1), [moveBy]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) {
      return;
    }

    const updateSizes = () => {
      const viewportWidthNext = viewport.getBoundingClientRect().width;
      const perViewNext = getPerView(viewportWidthNext, isMobile);
      const gapNext = getGap(viewportWidthNext, isMobile);
      const cardWidthNext = (viewportWidthNext - gapNext * (perViewNext - 1)) / perViewNext;

      setViewportWidth(viewportWidthNext);
      setCardWidth(cardWidthNext);
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
      duration: shouldReduceMotion ? 0.15 : autoplaySpeed / 1000,
      ease: easeOut,
    });

    return () => controls.stop();
  }, [active, shouldReduceMotion, step, x]);

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

  const carouselTracks = (
    <div
      ref={viewportRef}
      className="w-full max-w-full overflow-hidden"
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
        Showing packages {String(liveStart).padStart(2, "0")} to {String(liveEnd).padStart(2, "0")} of {cycleLength}
      </p>
      <motion.div
        className="flex items-stretch"
        style={{ x, gap: `${gap}px`, cursor: dragging ? "grabbing" : "grab", touchAction: "pan-y" }}
        drag={shouldReduceMotion ? false : "x"}
        dragElastic={0.08}
        dragMomentum={false}
        onDragStart={() => {
          setDragging(true);
          setExpandedMore(null);
        }}
        onDragEnd={onDragEnd}
      >
        {slides.map((salonPackage, index) => (
          <div key={`${salonPackage.id}-${index}`} style={{ flex: `0 0 ${cardWidth}px` }} className="min-w-0">
            <PackageCard
              salonPackage={salonPackage}
              visual={packageVisuals[salonPackage.id - 1]}
              mobile={isMobile}
              reduceMotion={Boolean(shouldReduceMotion)}
              slideKey={`${salonPackage.id}-${index}`}
              expandedMore={expandedMore === `${salonPackage.id}-${index}`}
              onToggleMore={(slideKey) => {
                setExpandedMore((current) => (current === slideKey ? null : slideKey));
              }}
              onCloseMore={() => setExpandedMore(null)}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <section
      id="signature-packages"
      className="relative overflow-hidden bg-[#FAF7FC] px-[var(--site-gutter)] py-16 md:px-[clamp(24px,5vw,96px)] md:py-[110px]"
    >
      <div className="pointer-events-none absolute left-1/2 top-8 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(237,227,242,0.55),rgba(237,227,242,0)_70%)] blur-3xl" aria-hidden="true" />
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-[minmax(300px,0.7fr)_minmax(0,1.8fr)] lg:items-start lg:gap-[clamp(48px,6vw,88px)]">
          <div className="lg:sticky lg:top-[130px]">
            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: easeOut }}
              className="mb-5 flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]"
            >
              <span className="h-px w-8 bg-[var(--primary)]/45" />
              Weekend Special
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28, filter: shouldReduceMotion ? "none" : "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.75, delay: 0.08, ease: easeOut }}
              className="font-serif text-[32px] font-semibold leading-[1] text-[var(--text)] md:text-[58px] lg:text-[70px]"
            >
              Choose your
              <br />
              <span className="italic text-[#9B72B3]">signature ritual.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.2, ease: easeOut }}
              className="mt-6 max-w-xl text-[15px] leading-7 text-[var(--muted)] md:text-base md:leading-8"
            >
              Ten carefully selected combinations for hair, nails, beauty and relaxation. Each package is available for AED 99.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: 0.28, ease: easeOut }}
              className="mt-7 inline-flex max-w-[220px] items-center gap-4 rounded-full bg-[#EDE3F2]/90 px-5 py-4 text-[var(--primary)]"
            >
              <span className="font-serif text-[28px] leading-none md:text-[30px]">AED 99</span>
              <span className="text-[12px] font-medium uppercase tracking-[0.14em] text-[var(--primary)]/80">
                Per package
              </span>
            </motion.div>

            <div className="mt-8 hidden items-center gap-3 lg:flex">
              <ArrowButton ariaLabel="Previous package" onClick={movePrevious}>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </ArrowButton>
              <ArrowButton ariaLabel="Next package" onClick={moveNext}>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </ArrowButton>
            </div>
          </div>

          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 40, filter: shouldReduceMotion ? "none" : "blur(6px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="lg:hidden"
            >
              {carouselTracks}

              <div className="mt-5 flex items-center justify-between gap-3">
                <ArrowButton ariaLabel="Previous package" onClick={movePrevious} size="mobile">
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </ArrowButton>
                <ArrowButton ariaLabel="Next package" onClick={moveNext} size="mobile">
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </ArrowButton>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 40, filter: shouldReduceMotion ? "none" : "blur(6px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: easeOut }}
              className="hidden lg:block"
            >
              {carouselTracks}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArrowButton({
  ariaLabel,
  onClick,
  children,
  size = "desktop",
}: {
  ariaLabel: string;
  onClick: () => void;
  children: React.ReactNode;
  size?: "desktop" | "mobile";
}) {
  const buttonSize = size === "mobile" ? "h-12 w-12" : "h-[50px] w-[50px]";

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      className={`inline-flex ${buttonSize} items-center justify-center rounded-full border border-white/55 bg-[rgba(255,255,255,0.72)] text-[var(--primary)] shadow-[0_14px_40px_rgba(84,37,104,0.14)] backdrop-blur-[16px] transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:border-[rgba(84,37,104,0.24)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]`}
    >
      {children}
    </button>
  );
}

function PackageCard({
  salonPackage,
  visual,
  mobile,
  reduceMotion,
  slideKey,
  expandedMore,
  onToggleMore,
  onCloseMore,
}: {
  salonPackage: (typeof packages)[number];
  visual: { src: string; alt: string };
  mobile: boolean;
  reduceMotion: boolean;
  expandedMore: boolean;
  slideKey: string;
  onToggleMore: (slideKey: string) => void;
  onCloseMore: () => void;
}) {
  const visibleItems = salonPackage.items.slice(0, 3);
  const extraItems = salonPackage.items.slice(3);
  const extraCount = extraItems.length;
  const showMoreButton = extraCount > 0;

  return (
    <motion.article
      whileHover={reduceMotion || mobile ? undefined : { y: -6 }}
      transition={{ duration: 0.45, ease: easeOut }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-[rgba(84,37,104,0.10)] bg-[rgba(255,255,255,0.96)] shadow-[0_18px_52px_rgba(84,37,104,0.10)] ${
        mobile ? "h-[500px]" : "h-[560px]"
      }`}
    >
      <div className={`relative flex-shrink-0 overflow-hidden ${mobile ? "h-[190px]" : "h-[210px]"}`}>
        <Image
          src={visual.src}
          alt={visual.alt}
          fill
          sizes="(min-width: 1440px) 28vw, (min-width: 1024px) 40vw, (min-width: 768px) 48vw, 100vw"
          draggable={false}
          className="object-cover transition duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-transparent to-[#271D2C]/14 transition duration-500 group-hover:to-[#271D2C]/24" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_45%)] opacity-80 transition duration-500 group-hover:opacity-100" />

        {salonPackage.badge ? (
          <span className="absolute left-4 top-4 inline-flex rounded-full border border-white/55 bg-[rgba(255,255,255,0.74)] px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--primary)] shadow-[0_8px_24px_rgba(84,37,104,0.08)] transition duration-300 group-hover:-translate-y-0.5">
            {salonPackage.badge}
          </span>
        ) : null}
      </div>

      <div className={`flex min-h-0 flex-1 flex-col ${mobile ? "p-5" : "p-6"}`}>
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">
              PACKAGE {String(salonPackage.id).padStart(2, "0")}
            </p>
            <h3 className="mt-2 min-w-0 break-words font-serif text-[clamp(28px,6vw,32px)] font-semibold leading-[1.05] text-[var(--text)]">
              {salonPackage.title}
            </h3>
          </div>
          <div className="shrink-0 text-right">
            <p className="font-serif text-[30px] font-semibold leading-none text-[var(--primary)] md:text-[32px]">
              99
            </p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--muted)]">
              AED
            </p>
          </div>
        </div>

        <ul className="mt-5 flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
          {visibleItems.map((item) => (
            <li key={item} className="flex min-w-0 gap-3 text-[15px] leading-[1.55] text-[var(--muted)]">
              <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--accent)]" aria-hidden="true" />
              <span className="min-w-0 break-words">{item}</span>
            </li>
          ))}

          {showMoreButton ? (
            <li className="mt-1">
              <button
                type="button"
                aria-expanded={expandedMore}
                aria-controls={`package-more-${slideKey}`}
                onClick={() => onToggleMore(slideKey)}
                className="text-left text-[13px] font-medium uppercase tracking-[0.12em] text-[var(--primary)] underline-offset-4 transition duration-300 hover:translate-x-0.5 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)]"
              >
                {expandedMore ? "Hide extra services" : `+ ${extraCount} more services`}
              </button>
            </li>
          ) : null}
        </ul>

        <AnimatePresence initial={false}>
          {expandedMore ? (
            <motion.div
              id={`package-more-${slideKey}`}
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              transition={{ duration: 0.28, ease: easeOut }}
              className="absolute inset-x-4 bottom-[84px] z-20 rounded-[22px] border border-[rgba(84,37,104,0.10)] bg-white/96 p-4 shadow-[0_16px_40px_rgba(84,37,104,0.10)] backdrop-blur-[10px]"
            >
              <div className="mb-3 flex items-center justify-between gap-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-[var(--muted)]">More services</p>
                <button
                  type="button"
                  onClick={onCloseMore}
                  className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--primary)]"
                >
                  Close
                </button>
              </div>
              <ul className="flex flex-col gap-2">
                {extraItems.map((item) => (
                  <li key={item} className="flex min-w-0 gap-2 text-[13px] leading-5 text-[var(--muted)]">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--accent)]" aria-hidden="true" />
                    <span className="min-w-0 break-words">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <Link
          href={packageBookingUrl(salonPackage.id)}
          target="_blank"
          rel="noopener noreferrer"
          className="group/cta mt-auto inline-flex h-[52px] w-full flex-shrink-0 items-center justify-center rounded-full bg-[var(--primary)] px-5 text-sm font-medium uppercase tracking-[0.08em] text-white transition duration-500 hover:-translate-y-0.5 hover:bg-[var(--primary-dark)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)] active:scale-[0.98]"
        >
          Book Package
          <ArrowUpRight
            className="ml-2 h-4 w-4 transition duration-300 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
    </motion.article>
  );
}
