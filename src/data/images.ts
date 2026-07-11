export type ImageKey =
  | "hero"
  | "about"
  | "hair"
  | "facial"
  | "nails"
  | "waxing"
  | "threading"
  | "massage"
  | "pedicure"
  | "interior"
  | "team"
  | "hygiene";

export const images: Record<ImageKey, { src: string; alt: string }> = {
  hero: {
    src: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1400&auto=format&fit=crop",
    alt: "Premium beauty salon styling chair with soft warm lighting",
  },
  about: {
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop",
    alt: "Salon professional preparing a beauty appointment",
  },
  hair: {
    src: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=1000&auto=format&fit=crop",
    alt: "Hair styling service in a modern salon",
  },
  facial: {
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop",
    alt: "Relaxing facial treatment with clean white towels",
  },
  nails: {
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=1000&auto=format&fit=crop",
    alt: "Elegant manicure with soft polish",
  },
  waxing: {
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop",
    alt: "Calm spa treatment room for beauty services",
  },
  threading: {
    src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1000&auto=format&fit=crop",
    alt: "Beauty tools and makeup brushes arranged neatly",
  },
  massage: {
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000&auto=format&fit=crop",
    alt: "Relaxing massage treatment setup",
  },
  pedicure: {
    src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=1000&auto=format&fit=crop",
    alt: "Pedicure and nail care tools in a salon",
  },
  interior: {
    src: "https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=1200&auto=format&fit=crop",
    alt: "Warm modern salon interior with styling stations",
  },
  team: {
    src: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop",
    alt: "Professional salon team consultation",
  },
  hygiene: {
    src: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?q=80&w=1200&auto=format&fit=crop",
    alt: "Clean salon treatment products and towels",
  },
};

export const galleryImages = [
  { ...images.hair, category: "Hair", title: "Hair styling" },
  { ...images.nails, category: "Nails", title: "Manicure" },
  { ...images.pedicure, category: "Nails", title: "Pedicure" },
  { ...images.facial, category: "Facial", title: "Facial treatment" },
  { ...images.massage, category: "Relaxation", title: "Massage" },
  { ...images.interior, category: "Salon", title: "Salon interior" },
  { ...images.about, category: "Hair", title: "Salon care" },
  { ...images.waxing, category: "Relaxation", title: "Treatment room" },
  { ...images.threading, category: "Facial", title: "Beauty details" },
];
