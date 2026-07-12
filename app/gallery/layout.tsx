import type { ReactNode } from "react";
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";
import { createPageMetadata } from "@/src/lib/seo";

export const metadata = createPageMetadata({
  title: "Salon Gallery | Hair, Nails & Beauty in Dubai",
  description:
    "View the Salon Nelumbo gallery for hair, facial and nails inspiration from our Al Nahda, Dubai beauty salon, then book an appointment with our team.",
  path: "/gallery",
  keywords: ["Salon Gallery Dubai", "Hair Gallery Al Nahda", "Nail Salon Gallery"],
});

export default function GalleryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd name="Gallery" path="/gallery" />
      {children}
    </>
  );
}
