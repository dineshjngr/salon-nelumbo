import Link from "next/link";
import { Camera, MapPin, MessageCircle, Phone } from "lucide-react";
import { navigation, salon } from "@/src/data/site-data";

const footerServices = [
  { label: "Hair Styling", href: "/services#hair" },
  { label: "Hair Treatments", href: "/services#hair" },
  { label: "Makeup", href: "/services#facial" },
  { label: "Facial", href: "/services#facial" },
  { label: "Manicure", href: "/services#nails" },
  { label: "Pedicure", href: "/services#nails" },
  { label: "Waxing", href: "/services#waxing" },
  { label: "Threading", href: "/services#threading" },
  { label: "Massage", href: "/services#massage" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-plum/10 bg-plum text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.4fr_0.8fr_0.8fr_1fr]">
        <div>
          <Link href="/" className="font-serif text-3xl font-semibold">
            Salon Nelumbo
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/75">
            A Dubai-based women&apos;s beauty salon for hair care, nails,
            facial treatments, waxing, threading and relaxing massage services.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href={salon.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Salon Nelumbo Instagram"
              className="rounded-full border border-white/20 p-2.5 transition hover:bg-white hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Camera aria-hidden="true" className="h-5 w-5" />
            </a>
            <a
              href={salon.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Salon Nelumbo WhatsApp"
              className="rounded-full border border-white/20 p-2.5 transition hover:bg-white hover:text-plum focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            Quick Links
          </h2>
          <ul className="mt-5 space-y-3">
            {navigation.map((item) => (
              <li key={`${item.href}-${item.label}`}>
                <Link className="text-sm text-white/75 hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            Services
          </h2>
          <ul className="mt-5 space-y-3">
            {footerServices.map((service) => (
              <li key={`${service.href}-${service.label}`}>
                <Link className="text-sm text-white/75 hover:text-white" href={service.href}>
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
            Contact
          </h2>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-white/75">
            <li>
              <a className="inline-flex items-center gap-2 hover:text-white" href={salon.phoneHref}>
                <Phone aria-hidden="true" className="h-4 w-4" />
                {salon.phoneDisplay}
              </a>
            </li>
            <li>{salon.location}</li>
            <li>
              <a className="inline-flex items-center gap-2 hover:text-white" href={salon.mapsUrl} target="_blank" rel="noopener noreferrer">
                <MapPin aria-hidden="true" className="h-4 w-4" />
                Directions
              </a>
            </li>
            <li>Opening hours: {salon.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-sm text-white/65">
        Copyright {year} Salon Nelumbo. All rights reserved.
      </div>
    </footer>
  );
}
