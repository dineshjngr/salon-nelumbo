import type { ReactNode } from "react";

type SiteContainerProps = {
  children: ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow" | "text";
};

const sizes = {
  default: "max-w-[1440px]",
  wide: "max-w-[1600px]",
  narrow: "max-w-[1280px]",
  text: "max-w-[860px]",
};

export function SiteContainer({
  children,
  className = "",
  size = "default",
}: SiteContainerProps) {
  return (
    <div className={`container-site ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
}
