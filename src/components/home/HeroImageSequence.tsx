"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { useMotionValueEvent, type MotionValue } from "motion/react";
import { heroFrames, FRAME_COUNT } from "../../data/hero-frames";
import { drawImageCover } from "../../lib/hero-sequence";

interface HeroImageSequenceProps {
  scrollYProgress: MotionValue<number>;
  isMobile?: boolean;
  desktopFocalPointX?: number;
  desktopFocalPointY?: number;
  mobileFocalPointX?: number;
  mobileFocalPointY?: number;
}

export function HeroImageSequence({
  scrollYProgress,
  isMobile = false,
  desktopFocalPointX = 0.8, // center-right to match original design
  desktopFocalPointY = 0.5,
  mobileFocalPointX = 0.8, // center-right to match original design
  mobileFocalPointY = 0.5,
}: HeroImageSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  // Keep references for animation loop and cache
  const loadedImagesRef = useRef<(HTMLImageElement | null)[]>(
    Array(FRAME_COUNT).fill(null)
  );
  const currentFrameIndexRef = useRef<number>(0);
  const lastRenderedIndexRef = useRef<number>(-1);
  const animationFrameIdRef = useRef<number | null>(null);
  const isTabVisibleRef = useRef<boolean>(true);

  // 1. Detect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // 2. Detect tab visibility to pause rendering when backgrounded
  useEffect(() => {
    const handleVisibility = () => {
      isTabVisibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // 3. Helper to draw frame (wrapped in useCallback to satisfy dependency rules)
  const drawFrame = useCallback(
    (index: number, force = false) => {
      if (!isTabVisibleRef.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      let imgToDraw: HTMLImageElement | null = null;
      let actualIndex = index;

      // Find the closest loaded frame to prevent blank screen/flicker
      for (let offset = 0; offset < FRAME_COUNT; offset++) {
        const left = index - offset;
        const right = index + offset;

        if (left >= 0 && loadedImagesRef.current[left]) {
          imgToDraw = loadedImagesRef.current[left];
          actualIndex = left;
          break;
        }
        if (right < FRAME_COUNT && loadedImagesRef.current[right]) {
          imgToDraw = loadedImagesRef.current[right];
          actualIndex = right;
          break;
        }
      }

      if (imgToDraw && (force || actualIndex !== lastRenderedIndexRef.current)) {
        drawImageCover({
          canvas,
          image: imgToDraw,
          focalPointX: isMobile ? mobileFocalPointX : desktopFocalPointX,
          focalPointY: isMobile ? mobileFocalPointY : desktopFocalPointY,
        });
        lastRenderedIndexRef.current = actualIndex;
      }
    },
    [isMobile, desktopFocalPointX, desktopFocalPointY, mobileFocalPointX, mobileFocalPointY]
  );

  // Keep a mutable ref of drawFrame for preloader to prevent re-running preload sequence
  const drawFrameRef = useRef(drawFrame);
  useEffect(() => {
    drawFrameRef.current = drawFrame;
  }, [drawFrame]);

  // 4. Update frame debounced with requestAnimationFrame
  const updateFrame = useCallback(
    (index: number) => {
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      animationFrameIdRef.current = requestAnimationFrame(() => {
        animationFrameIdRef.current = null;
        drawFrame(index);
      });
    },
    [drawFrame]
  );

  // 5. Canvas Resize Handler
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    // Adjust width and height considering device pixel ratio for sharp rendering
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    drawFrame(currentFrameIndexRef.current, true);
  }, [drawFrame]);

  useEffect(() => {
    window.addEventListener("resize", resizeCanvas);

    const observer = new ResizeObserver(() => {
      resizeCanvas();
    });
    
    const canvas = canvasRef.current;
    if (canvas) {
      observer.observe(canvas);
    }

    // Initial resize call
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (canvas) {
        observer.unobserve(canvas);
      }
      observer.disconnect();
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [resizeCanvas]);

  // 6. Progressive Preloader
  useEffect(() => {
    let isMounted = true;
    const images = loadedImagesRef.current;

    const preloadSequence = async () => {
      // Step 1: Load the first frame immediately
      const firstImg = new Image();
      firstImg.src = heroFrames[0];
      await new Promise<void>((resolve) => {
        firstImg.onload = () => {
          if (isMounted) {
            images[0] = firstImg;
            setIsFirstFrameLoaded(true);
            drawFrameRef.current(0, true);
          }
          resolve();
        };
        firstImg.onerror = () => {
          resolve();
        };
      });

      // If user prefers reduced motion, stop loading other frames
      if (prefersReducedMotion) return;

      // Step 2: Load priority frames (first 15 frames)
      const priorityFrames = Array.from({ length: 15 }, (_, i) => i + 1).filter(
        (i) => i < FRAME_COUNT
      );

      // On mobile, skip odd frames to save resources
      const filteredPriority = isMobile
        ? priorityFrames.filter((i) => i % 2 === 0)
        : priorityFrames;

      await Promise.all(
        filteredPriority.map((i) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = heroFrames[i];
            img.onload = () => {
              if (isMounted) {
                images[i] = img;
                if (currentFrameIndexRef.current === i) {
                  drawFrameRef.current(i);
                }
              }
              resolve();
            };
            img.onerror = () => resolve();
          });
        })
      );

      if (!isMounted) return;

      // Step 3: Progressive loading of the remaining frames in chunks
      const remainingFrames = Array.from(
        { length: FRAME_COUNT - 16 },
        (_, i) => i + 16
      );
      
      const filteredRemaining = isMobile
        ? remainingFrames.filter((i) => i % 2 === 0)
        : remainingFrames;

      const chunkSize = 15;
      for (let c = 0; c < filteredRemaining.length; c += chunkSize) {
        if (!isMounted) break;

        const chunk = filteredRemaining.slice(c, c + chunkSize);
        await Promise.all(
          chunk.map((i) => {
            return new Promise<void>((resolve) => {
              const img = new Image();
              img.src = heroFrames[i];
              img.onload = () => {
                if (isMounted) {
                  images[i] = img;
                  if (currentFrameIndexRef.current === i) {
                    drawFrameRef.current(i);
                  }
                }
                resolve();
              };
              img.onerror = () => resolve();
            });
          })
        );

        // Delay slightly between batches to keep the main thread idle
        await new Promise((resolve) => setTimeout(resolve, 60));
      }
    };

    preloadSequence();

    return () => {
      isMounted = false;
    };
  }, [prefersReducedMotion, isMobile]);

  // 7. Framer Motion Scroll Trigger
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (prefersReducedMotion) return;

    // Map scroll progress (0-1) to frames (0 to FRAME_COUNT - 1)
    const index = Math.min(
      FRAME_COUNT - 1,
      Math.max(0, Math.round(latest * (FRAME_COUNT - 1)))
    );

    if (currentFrameIndexRef.current === index) return;
    currentFrameIndexRef.current = index;

    updateFrame(index);
  });

  return (
    <div className="relative w-full h-full bg-[#FAF7FC]">
      {/* Fallback frame that loads via native browser cache/rendering immediately */}
      <div
        className="absolute inset-0 bg-cover transition-opacity duration-700 bg-[center_right]"
        style={{
          backgroundImage: `url(${heroFrames[0]})`,
          opacity: isFirstFrameLoaded ? 0 : 1,
        }}
        aria-hidden="true"
      />

      {/* Canvas Layer */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        style={{ opacity: isFirstFrameLoaded ? 1 : 0 }}
      />
    </div>
  );
}
