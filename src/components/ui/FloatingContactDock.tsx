"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { MutableRefObject } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Calendar, MapPin, MessageCircle, Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { salon } from "@/src/data/site-data";

const easeOut = [0.22, 1, 0.36, 1] as const;
const INTERACTED_KEY = "salon-contact-widget-interacted";
const AUTO_OPENED_KEY = "salon-contact-widget-auto-opened";
const HOVER_CLOSE_DELAY = 400;
const AUTO_OPEN_DELAY = 60_000;
const AUTO_CLOSE_DELAY = 30_000;

const actions = [
  { label: "Call", href: salon.phoneHref, icon: Phone, short: "Call" },
  { label: "WhatsApp", href: salon.whatsapp, icon: MessageCircle, short: "Chat" },
  { label: "Directions", href: salon.mapsUrl, icon: MapPin, short: "Map" },
  { label: "Book Appointment", href: salon.bookingWhatsapp, icon: Calendar, short: "Book" },
] as const;

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

function readSessionFlag(key: string) {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.sessionStorage.getItem(key) === "true";
  } catch {
    return false;
  }
}

function writeSessionFlag(key: string) {
  try {
    window.sessionStorage.setItem(key, "true");
  } catch {
    // Ignore storage errors in private mode / restricted environments.
  }
}

function pageIsBusy() {
  if (typeof window === "undefined") {
    return false;
  }

  const activeElement = document.activeElement as HTMLElement | null;
  const isFormField =
    activeElement?.matches("input, textarea, select, [contenteditable='true']") ?? false;
  const hasModal = Boolean(document.querySelector("[aria-modal='true']"));
  const mobileMenuOpen = document.body.style.overflow === "hidden";

  return isFormField || hasModal || mobileMenuOpen;
}

export function FloatingContactDock() {
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const isTouch = useMediaQuery("(pointer: coarse)");
  const [expanded, setExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(() => readSessionFlag(INTERACTED_KEY));
  const [autoOpenArmed, setAutoOpenArmed] = useState(() => !readSessionFlag(AUTO_OPENED_KEY));
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstActionRef = useRef<HTMLAnchorElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hoverCloseTimerRef = useRef<number | null>(null);
  const autoOpenTimerRef = useRef<number | null>(null);
  const autoCloseTimerRef = useRef<number | null>(null);
  const hoverOpenedRef = useRef(false);
  const keyboardOpenRef = useRef(false);
  const armAutoCloseRef = useRef<() => void>(() => {});
  const openSnapshotRef = useRef(expanded);

  const dockWidthClass = useMemo(
    () =>
      isTouch
        ? "right-[var(--site-gutter)] w-[min(320px,calc(100vw-40px))] bottom-[calc(env(safe-area-inset-bottom)+76px)]"
        : "right-7 w-[340px] bottom-7",
    [isTouch]
  );

  useEffect(() => {
    openSnapshotRef.current = expanded;
  }, [expanded]);

  const clearTimer = useCallback((ref: MutableRefObject<number | null>) => {
    if (ref.current !== null) {
      window.clearTimeout(ref.current);
      ref.current = null;
    }
  }, []);

  const clearAllTimers = useCallback(() => {
    clearTimer(hoverCloseTimerRef);
    clearTimer(autoOpenTimerRef);
    clearTimer(autoCloseTimerRef);
  }, [clearTimer]);

  const markInteracted = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
      writeSessionFlag(INTERACTED_KEY);
    }
  }, [hasInteracted]);

  const closeMenu = useCallback((returnFocus = false) => {
    clearTimer(autoCloseTimerRef);
    clearTimer(hoverCloseTimerRef);
    setExpanded(false);
    hoverOpenedRef.current = false;
    keyboardOpenRef.current = false;
    if (returnFocus) {
      triggerRef.current?.focus();
    }
  }, [clearTimer]);

  const armAutoClose = useCallback(() => {
    clearTimer(autoCloseTimerRef);
    autoCloseTimerRef.current = window.setTimeout(() => {
      if (!openSnapshotRef.current) {
        return;
      }

      if (wrapperRef.current?.contains(document.activeElement)) {
        armAutoCloseRef.current();
        return;
      }

      closeMenu();
    }, AUTO_CLOSE_DELAY);
  }, [clearTimer, closeMenu]);

  useEffect(() => {
    armAutoCloseRef.current = armAutoClose;
  }, [armAutoClose]);

  const openMenu = useCallback((source: "click" | "hover" | "auto" | "keyboard") => {
    clearTimer(hoverCloseTimerRef);
    setExpanded(true);
    armAutoClose();

    if (source === "click" || source === "keyboard") {
      markInteracted();
    }

    if (source === "auto") {
      setAutoOpenArmed(false);
      writeSessionFlag(AUTO_OPENED_KEY);
    }

    if (source === "hover") {
      hoverOpenedRef.current = true;
    }

    if (source === "keyboard") {
      keyboardOpenRef.current = true;
    }
  }, [armAutoClose, clearTimer, markInteracted]);

  const toggleMenu = useCallback((source: "click" | "keyboard") => {
    if (source === "click" || source === "keyboard") {
      markInteracted();
    }

    if (expanded) {
      closeMenu(source === "keyboard");
      return;
    }

    openMenu(source);
  }, [closeMenu, expanded, markInteracted, openMenu]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!expanded) {
        return;
      }

      const target = event.target as Node | null;
      if (wrapperRef.current && target && !wrapperRef.current.contains(target)) {
        closeMenu();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && expanded) {
        event.preventDefault();
        closeMenu(true);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeMenu, expanded]);

  useEffect(() => {
    if (!autoOpenArmed || hasInteracted || expanded || isTouch) {
      return;
    }

    autoOpenTimerRef.current = window.setTimeout(() => {
      if (hasInteracted || readSessionFlag(INTERACTED_KEY) || readSessionFlag(AUTO_OPENED_KEY)) {
        return;
      }

      if (pageIsBusy() || openSnapshotRef.current) {
        autoOpenTimerRef.current = window.setTimeout(() => {
          if (!pageIsBusy() && !openSnapshotRef.current && !readSessionFlag(INTERACTED_KEY)) {
            openMenu("auto");
          }
        }, 15_000);
        return;
      }

      openMenu("auto");
    }, AUTO_OPEN_DELAY);

    return () => clearTimer(autoOpenTimerRef);
  }, [autoOpenArmed, clearTimer, expanded, hasInteracted, isTouch, openMenu]);

  useEffect(() => {
    if (!expanded) {
      clearTimer(autoCloseTimerRef);
      clearTimer(hoverCloseTimerRef);
      return;
    }

    armAutoClose();
    return () => clearTimer(autoCloseTimerRef);
  }, [armAutoClose, clearTimer, expanded]);

  useEffect(() => {
    if (keyboardOpenRef.current && expanded) {
      firstActionRef.current?.focus();
      keyboardOpenRef.current = false;
    }
  }, [expanded]);

  useEffect(() => {
    if (!pathname) {
      return;
    }

    const raf = window.requestAnimationFrame(() => {
      closeMenu();
      clearAllTimers();
    });

    return () => window.cancelAnimationFrame(raf);
  }, [clearAllTimers, closeMenu, pathname]);

  useEffect(() => {
    return () => {
      clearAllTimers();
    };
  }, [clearAllTimers]);

  const handleHoverEnter = () => {
    if (isTouch || hasInteracted) {
      return;
    }

    openMenu("hover");
  };

  const handleHoverLeave = () => {
    if (isTouch || hasInteracted || !hoverOpenedRef.current) {
      return;
    }

    clearTimer(hoverCloseTimerRef);
    hoverCloseTimerRef.current = window.setTimeout(() => {
      closeMenu();
      markInteracted();
    }, HOVER_CLOSE_DELAY);
  };

  const handleWidgetActivity = () => {
    if (!expanded) {
      return;
    }

    armAutoClose();
  };

  return (
    <div
      ref={wrapperRef}
      data-floating-contact-dock
      className={`fixed z-[80] flex flex-col items-end ${dockWidthClass} pointer-events-auto`}
      onMouseEnter={handleHoverEnter}
      onMouseLeave={handleHoverLeave}
      onPointerMove={handleWidgetActivity}
      onFocusCapture={handleWidgetActivity}
      onKeyDown={handleWidgetActivity}
      onPointerDown={handleWidgetActivity}
    >
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            id="floating-contact-menu"
            role="menu"
            aria-label="Quick contact actions"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12, scale: shouldReduceMotion ? 1 : 0.96, filter: shouldReduceMotion ? "none" : "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 12, scale: shouldReduceMotion ? 1 : 0.96, filter: shouldReduceMotion ? "none" : "blur(6px)" }}
            transition={{ duration: 0.35, ease: easeOut }}
            className={`absolute right-0 bottom-[calc(100%+14px)] overflow-hidden rounded-[26px] border border-white/45 bg-[rgba(255,255,255,0.62)] shadow-[0_18px_60px_rgba(84,37,104,0.14)] backdrop-blur-[18px] supports-[not(backdrop-filter:blur(1px))]:bg-white ${
              isTouch ? "w-[min(320px,calc(100vw-40px))]" : "min-w-[320px]"
            }`}
            onMouseMove={handleWidgetActivity}
            onTouchStart={handleWidgetActivity}
            onFocusCapture={handleWidgetActivity}
          >
            <div className={isTouch ? "grid grid-cols-2 gap-2 p-2" : "grid min-w-[320px] gap-2 p-2"}>
              {actions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.label}
                    ref={index === 0 ? firstActionRef : undefined}
                    href={action.href}
                    role="menuitem"
                    tabIndex={0}
                    target={action.href.startsWith("http") ? "_blank" : undefined}
                    rel={action.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={action.label}
                    onClick={() => {
                      markInteracted();
                      closeMenu();
                    }}
                    onFocus={handleWidgetActivity}
                    className="group flex items-center justify-between gap-4 rounded-[20px] px-4 py-3 text-left transition duration-300 hover:translate-x-1 hover:bg-[#F4EDF8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--primary)]"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[var(--primary)] shadow-[0_8px_28px_rgba(84,37,104,0.10)] transition duration-300 group-hover:bg-[var(--primary)] group-hover:text-white">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-[var(--text)]">{action.label}</span>
                        <span className="block text-xs text-[var(--muted)]">
                          {action.label === "Call"
                            ? salon.phoneDisplay
                            : action.label === "Directions"
                              ? "Open Google Maps"
                              : action.label === "Book Appointment"
                                ? "Reserve your visit"
                                : "Chat instantly"}
                        </span>
                      </span>
                    </span>
                    <span className="text-[var(--primary)] transition duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        ref={triggerRef}
        aria-label="Open quick contact actions"
        aria-expanded={expanded}
        aria-controls="floating-contact-menu"
        onClick={() => toggleMenu("click")}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            keyboardOpenRef.current = !expanded;
          }
        }}
        className="group relative flex h-14 w-14 flex-shrink-0 self-end items-center justify-center rounded-full bg-[var(--primary)] text-white shadow-[0_18px_60px_rgba(84,37,104,0.22)] transition duration-300 hover:scale-[1.08] hover:shadow-[0_0_0_8px_rgba(201,174,212,0.18),0_18px_60px_rgba(84,37,104,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--primary)] md:h-[68px] md:w-[68px]"
      >
        <MessageCircle className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
      </motion.button>
    </div>
  );
}
