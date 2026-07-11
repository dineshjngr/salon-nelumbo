import { ArrowRight } from "lucide-react";

type AnimatedArrowProps = {
  className?: string;
};

export function AnimatedArrow({ className = "" }: AnimatedArrowProps) {
  return (
    <ArrowRight
      aria-hidden="true"
      className={`h-4 w-4 transition duration-300 group-hover:translate-x-1 ${className}`}
    />
  );
}
