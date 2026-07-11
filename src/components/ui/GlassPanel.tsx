import type { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
};

export function GlassPanel({ children, className = "" }: GlassPanelProps) {
  return (
    <div
      className={`border border-white/50 bg-white/70 shadow-[0_18px_60px_rgba(84,37,104,0.10)] backdrop-blur-[18px] supports-[not(backdrop-filter:blur(1px))]:bg-white ${className}`}
    >
      {children}
    </div>
  );
}
