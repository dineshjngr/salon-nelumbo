import Image from "next/image";

type SalonLogoProps = {
  className?: string;
  priority?: boolean;
};

export function SalonLogo({ className = "", priority = false }: SalonLogoProps) {
  return (
    <Image
      src="/images/nelumbo-logo.png"
      alt="Nelumbo Beauty Salon"
      width={858}
      height={291}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      className={className}
      style={{ backgroundColor: "transparent" }}
    />
  );
}
