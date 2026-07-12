import type { ReactNode } from "react";
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";
import { createPageMetadata } from "@/src/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact Salon Nelumbo | Book Your Appointment",
  description:
    "Contact Salon Nelumbo beauty salon in Al Nahda, Dubai for hair, facial and nails. Call or WhatsApp our team to book an appointment or ask a question.",
  path: "/contact",
  keywords: ["Contact Salon Nelumbo", "Book Beauty Salon Dubai"],
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd name="Contact" path="/contact" />
      {children}
    </>
  );
}
