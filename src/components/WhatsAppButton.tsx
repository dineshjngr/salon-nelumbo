"use client";

import { MessageCircle } from "lucide-react";
import { salon } from "@/src/data/site-data";

export function WhatsAppButton() {
  return (
    <a
      href={salon.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Salon Nelumbo on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plum motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <MessageCircle aria-hidden="true" className="h-7 w-7" />
    </a>
  );
}
