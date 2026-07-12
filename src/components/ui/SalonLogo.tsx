import Image from "next/image";

type SalonLogoProps = {
  className?: string;
  priority?: boolean;
};

export function SalonLogo({ className = "", priority = false }: SalonLogoProps) {
  return (
    <Image
      src="/images/logo.png"
      alt="Salon Nelumbo"
      width={858}
      height={291}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      className={className}
      style={{ width: "auto", objectFit: "contain", backgroundColor: "transparent" }}
    />
  );
}
