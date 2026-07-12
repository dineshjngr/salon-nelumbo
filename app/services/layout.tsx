import type { ReactNode } from "react";
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";
import { createPageMetadata } from "@/src/lib/seo";

export const metadata = createPageMetadata({
  title: "Beauty Services | Hair, Nails & Facials | Nelumbo",
  description:
    "Explore hair, facial, nails, waxing and threading at Salon Nelumbo, a beauty salon in Al Nahda, Dubai. Book an appointment for your chosen service.",
  path: "/services",
  keywords: ["Hair Colour Dubai", "Hair Cut Al Nahda", "Beauty Services Dubai"],
});

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd name="Services" path="/services" />
      {children}
    </>
  );
}
