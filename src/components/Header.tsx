"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { MobileNavigation } from "@/src/components/MobileNavigation";
import { navigation, salon } from "@/src/data/site-data";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-300 motion-reduce:transition-none ${
          isScrolled
            ? "border-b border-plum/10 bg-ivory/90 shadow-sm backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            className="font-serif text-2xl font-semibold text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum"
          >
            Salon Nelumbo
          </Link>
          <nav aria-label="Primary navigation" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navigation.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <Link
                    href={item.href}
                    className="text-sm font-semibold text-text/80 transition hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="hidden lg:block">
            <a
              href={salon.bookingWhatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-full bg-plum px-5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              Book Appointment
            </a>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
            className="rounded-full border border-plum/15 bg-white/60 p-2.5 text-plum shadow-sm transition hover:bg-plum hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum lg:hidden"
          >
            <Menu aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
      </header>
      <MobileNavigation isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
