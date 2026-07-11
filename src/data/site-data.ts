import {
  Flower2,
  Heart,
  MapPin,
  MessageCircle,
  Sparkles,
  Star,
} from "lucide-react";

export const salon = {
  name: "Salon Nelumbo",
  phoneDisplay: "050 120 1938",
  phoneInternational: "+971 50 120 1938",
  phoneHref: "tel:+971501201938",
  whatsapp: "https://wa.me/971501201938",
  bookingWhatsapp:
    "https://wa.me/971501201938?text=Hello%20Salon%20Nelumbo%2C%20I%20would%20like%20to%20book%20an%20appointment.",
  location: "Dubai, United Arab Emirates",
  mapsUrl: "https://maps.app.goo.gl/MMfNtLRVAvomaKdd9",
  hours: "Contact salon to confirm",
  instagram: "https://www.instagram.com/nelumboalnahda/",
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

export const serviceCards = [
  {
    title: "Hair Styling",
    description: "Precision blow-dry, styling and polished finishes for every look.",
    imageKey: "hair",
    href: "/services#hair",
  },
  {
    title: "Hair Treatments",
    description: "Nourishing treatments to restore shine, softness and strength.",
    imageKey: "hair",
    href: "/services#hair",
  },
  {
    title: "Makeup",
    description: "Fresh makeup looks for polished, elegant occasions.",
    imageKey: "facial",
    href: "/services#facial",
  },
  {
    title: "Facial",
    description: "Facial renewal and glow-enhancing beauty services.",
    imageKey: "facial",
    href: "/services#facial",
  },
  {
    title: "Manicure",
    description: "Careful nail finishing for clean, refined hands.",
    imageKey: "nails",
    href: "/services#nails",
  },
  {
    title: "Pedicure",
    description: "Relaxing foot care and polished finishing for feet.",
    imageKey: "nails",
    href: "/services#nails",
  },
  {
    title: "Nails",
    description: "Manicure, pedicure and nail rituals for polished hands and feet.",
    imageKey: "nails",
    href: "/services#nails",
  },
  {
    title: "Waxing",
    description: "Expert waxing for smooth skin and long-lasting care.",
    imageKey: "waxing",
    href: "/services#waxing",
  },
  {
    title: "Threading",
    description: "Precise threading for defined brows and facial details.",
    imageKey: "waxing",
    href: "/services#threading",
  },
  {
    title: "Massage",
    description: "Relaxing massage care for the head, neck, hands and legs.",
    imageKey: "massage",
    href: "/services#massage",
  },
];

export const benefits = [
  {
    title: "Experienced Beauty Professionals",
    description:
      "Attentive service from a team focused on careful, personal beauty care.",
    icon: Sparkles,
  },
  {
    title: "Hygienic Tools and Treatment Areas",
    description:
      "Treatment spaces are maintained with cleanliness and guest comfort in mind.",
    icon: Heart,
  },
  {
    title: "Quality Beauty Products",
    description:
      "Salon services are supported by products chosen for a polished finish.",
    icon: Star,
  },
  {
    title: "Comfortable and Relaxing Environment",
    description:
      "A calm setting designed to make every appointment feel considered.",
    icon: Flower2,
  },
];

export const testimonials = [
  {
    name: "Aisha M.",
    service: "Hair Spa and Blow-Dry",
    review:
      "The team was gentle, attentive and made my hair feel refreshed. The salon has a calm, elegant feeling.",
  },
  {
    name: "Priya R.",
    service: "Manicure and Pedicure",
    review:
      "Beautiful nail finish and a relaxing visit from start to end. I appreciated the care and neat work.",
  },
  {
    name: "Noura A.",
    service: "Threading and Massage",
    review:
      "Quick, precise threading and a lovely massage. It is a comfortable place for a self-care appointment.",
  },
];

export const contactCards = [
  {
    title: "Call",
    detail: salon.phoneDisplay,
    href: salon.phoneHref,
    icon: Heart,
  },
  {
    title: "WhatsApp",
    detail: salon.phoneInternational,
    href: salon.whatsapp,
    icon: MessageCircle,
  },
  {
    title: "Location",
    detail: salon.location,
    href: "/contact",
    icon: MapPin,
  },
  {
    title: "Opening Hours",
    detail: salon.hours,
    href: "/contact",
    icon: Star,
  },
];

export const galleryFilters = ["All", "Hair", "Nails", "Facial", "Relaxation", "Salon"] as const;

export type GalleryFilter = (typeof galleryFilters)[number];
