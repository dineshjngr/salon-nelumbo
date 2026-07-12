/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DecorativeShapes } from "@/src/components/ui/DecorativeShapes";
import { FloatingContactDock } from "@/src/components/ui/FloatingContactDock";
import { LuxuryCursor } from "@/src/components/ui/LuxuryCursor";
import { MotionShell } from "@/src/components/layout/MotionShell";
import { SiteJsonLd } from "@/src/components/seo/SiteJsonLd";
import { createPageMetadata, siteUrl } from "@/src/lib/seo";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  ...createPageMetadata({
    title: "Salon Nelumbo | Beauty Salon in Al Nahda Dubai",
    description:
      "Discover Salon Nelumbo, a beauty salon in Al Nahda, Dubai, for hair, facial and nail services. Call or WhatsApp our team to book an appointment today.",
    path: "/",
    keywords: ["Salon Near Me", "Hair Salon Dubai"],
  }),
  authors: [{ name: "Salon Nelumbo", url: "/" }],
  creator: "Salon Nelumbo",
  publisher: "Salon Nelumbo",
  applicationName: "Salon Nelumbo",
  category: "Beauty Salon",
  manifest: "/manifest.webmanifest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#542568",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <head>
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative isolate flex min-h-full flex-col">
        <SiteJsonLd />
        <DecorativeShapes />
        <LuxuryCursor />
        <MotionShell>{children}</MotionShell>
        <FloatingContactDock />
      </body>
    </html>
  );
}
