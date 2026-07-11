"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

type CursorMode = "default" | "button" | "image" | "link" | "card";

const modeStyles: Record<
  CursorMode,
  { size: number; height?: number; bg: string; border: string; opacity: number; icon: boolean; blur: number; shadow: string }
> = {
  default: {
    size: 24,
    bg: "rgba(201,174,212,0.20)",
    border: "1px solid rgba(84,37,104,0.45)",
    opacity: 0.95,
    icon: false,
    blur: 10,
    shadow: "0 0 24px rgba(168,118,182,0.20)",
  },
  button: {
    size: 26,
    bg: "rgba(84,37,104,1)",
    border: "1px solid rgba(255,255,255,0.30)",
    opacity: 1,
    icon: true,
    blur: 0,
    shadow: "0 0 28px rgba(84,37,104,0.28)",
  },
  image: {
    size: 70,
    bg: "rgba(201,174,212,0.12)",
    border: "1px solid rgba(84,37,104,0.20)",
    opacity: 1,
    icon: false,
    blur: 16,
    shadow: "0 0 34px rgba(168,118,182,0.16)",
  },
  link: {
    size: 18,
    bg: "rgba(84,37,104,0.95)",
    border: "1px solid rgba(255,255,255,0.20)",
    opacity: 1,
    icon: false,
    blur: 0,
    shadow: "0 0 24px rgba(84,37,104,0.18)",
  },
  card: {
    size: 28,
    height: 20,
    bg: "rgba(201,174,212,0.16)",
    border: "1px solid rgba(84,37,104,0.35)",
    opacity: 0.98,
    icon: false,
    blur: 8,
    shadow: "0 0 20px rgba(168,118,182,0.14)",
  },
};

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

function detectMode(target: EventTarget | null): CursorMode {
  if (!(target instanceof Element)) {
    return "default";
  }

  if (target.closest("button, [role='button'], .cursor-button")) {
    return "button";
  }

  if (target.closest("img, picture, video, [data-cursor-image='true']")) {
    return "image";
  }

  if (target.closest("a")) {
    return "link";
  }

  if (target.closest("article, [data-cursor-card='true']")) {
    return "card";
  }

  return "default";
}

export function LuxuryCursor() {
  const [mode, setMode] = useState<CursorMode>("default");
  const shouldReduceMotion = useReducedMotion();
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const modeRef = useRef(mode);
  const finePointer = useMediaQuery("(pointer: fine)");
  const largeScreen = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    const shouldEnable = finePointer && largeScreen && !shouldReduceMotion;
    if (!shouldEnable) {
      return;
    }

    document.body.classList.add("luxury-cursor");

    const updateMode = (nextMode: CursorMode) => {
      if (modeRef.current !== nextMode) {
        modeRef.current = nextMode;
        setMode(nextMode);
      }
    };

    const onMove = (event: MouseEvent) => {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
      updateMode(detectMode(event.target));
    };

    const onLeave = () => {
      updateMode("default");
    };

    const onFocusIn = (event: FocusEvent) => {
      updateMode(detectMode(event.target));
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("focusin", onFocusIn);

    const animate = () => {
      const cursor = cursorRef.current;
      if (cursor) {
        currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.18;
        currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.18;

        const config = modeStyles[modeRef.current];
        const scaleX = modeRef.current === "card" ? 1.38 : modeRef.current === "image" ? 1 : modeRef.current === "button" ? 1.8 : 1;
        const scaleY = modeRef.current === "card" ? 0.75 : modeRef.current === "image" ? 1 : modeRef.current === "button" ? 1.8 : 1;
        cursor.style.transform = `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0) translate(-50%, -50%) scale(${scaleX}, ${scaleY})`;
        cursor.style.width = `${config.size}px`;
        cursor.style.height = `${config.height ?? config.size}px`;
      }
      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("luxury-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("focusin", onFocusIn);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [finePointer, largeScreen, shouldReduceMotion]);

  const config = useMemo(() => modeStyles[mode], [mode]);

  if (!finePointer || !largeScreen || shouldReduceMotion) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden rounded-full opacity-0 mix-blend-normal transition-[width,height,opacity,background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block"
      style={{
        width: config.size,
        height: config.height ?? config.size,
        opacity: config.opacity,
        background: config.bg,
        border: config.border,
        boxShadow: config.shadow,
        backdropFilter: config.blur > 0 ? `blur(${config.blur}px)` : undefined,
      }}
    >
      <span
        className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
          config.blur > 0 ? "bg-[#C9AED4]/10" : "bg-transparent"
        }`}
      />
      {config.icon ? (
        <span className="absolute inset-0 grid place-items-center text-white">
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      ) : null}
    </div>
  );
}
