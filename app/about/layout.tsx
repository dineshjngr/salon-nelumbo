import type { ReactNode } from "react";
import { BreadcrumbJsonLd } from "@/src/components/seo/BreadcrumbJsonLd";
import { createPageMetadata } from "@/src/lib/seo";

export const metadata = createPageMetadata({
  title: "About Salon Nelumbo | Beauty Salon in Dubai",
  description:
    "Meet Salon Nelumbo, an Al Nahda beauty salon in Dubai offering thoughtful hair, facial and nail care. Book an appointment for personal beauty care.",
  path: "/about",
  keywords: ["About Salon Nelumbo", "Al Nahda Beauty Salon"],
});

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BreadcrumbJsonLd name="About" path="/about" />
      {children}
    </>
  );
}
