type SectionTransitionProps = {
  variant?: "light-to-lavender" | "lavender-to-white" | "dark-to-light" | "transparent-blur";
  className?: string;
};

const variants = {
  "light-to-lavender": "from-white/0 via-[#FAF7FC]/80 to-[#FAF7FC]",
  "lavender-to-white": "from-[#FAF7FC]/0 via-white/80 to-white",
  "dark-to-light": "from-[#271D2C]/0 via-[#FAF7FC]/70 to-[#FAF7FC]",
  "transparent-blur": "from-transparent via-[#EDE3F2]/50 to-transparent",
};

export function SectionTransition({
  variant = "transparent-blur",
  className = "",
}: SectionTransitionProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-0 h-40 bg-gradient-to-b blur-sm ${variants[variant]} ${className}`}
    />
  );
}
