"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { navigation, salon } from "@/src/data/site-data";

type MobileNavigationProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-plum/30 backdrop-blur-sm lg:hidden">
      <div className="ml-auto flex h-full w-full max-w-sm flex-col bg-ivory px-6 py-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            onClick={onClose}
            className="font-serif text-2xl font-semibold text-plum"
          >
            Salon Nelumbo
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="rounded-full border border-plum/15 p-2 text-plum transition hover:bg-plum hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
          >
            <X aria-hidden="true" className="h-5 w-5" />
          </button>
        </div>
        <nav aria-label="Mobile navigation" className="mt-10">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block rounded-full px-4 py-3 text-lg font-medium text-text transition hover:bg-blush hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={salon.bookingWhatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-plum px-5 text-sm font-semibold text-white transition hover:bg-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-plum"
        >
          Book Appointment
        </a>
      </div>
    </div>
  );
}
