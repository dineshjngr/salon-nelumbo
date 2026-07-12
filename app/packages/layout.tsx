import type { ReactNode } from "react";
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";
import { createPageMetadata } from "@/src/lib/seo";

export const metadata = createPageMetadata({
  title: "Beauty Packages from AED 99 | Salon Nelumbo",
  description:
    "Explore AED 99 hair, facial and nails packages at Salon Nelumbo beauty salon in Al Nahda, Dubai. Book an appointment for your preferred beauty package.",
  path: "/packages",
  keywords: ["AED 99 Beauty Packages", "Salon Packages Al Nahda"],
});

export default function PackagesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd name="Beauty Packages" path="/packages" />
      {children}
    </>
  );
}
