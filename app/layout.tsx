/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";
import { DecorativeShapes } from "@/src/components/ui/DecorativeShapes";
import { FloatingContactDock } from "@/src/components/ui/FloatingContactDock";
import { LuxuryCursor } from "@/src/components/ui/LuxuryCursor";

export const metadata: Metadata = {
  title: "Salon Nelumbo | Beauty Salon in Dubai",
  description:
    "Salon Nelumbo offers hair care, nails, facial treatments, waxing, threading and massage services in Dubai.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Inter:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="relative isolate flex min-h-full flex-col">
        <DecorativeShapes />
        <LuxuryCursor />
        {children}
        <FloatingContactDock />
      </body>
    </html>
  );
}
