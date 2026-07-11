export interface ServiceCategory {
  id: string;
  number: string;
  name: string;
  description: string;
  label: string;
  href: string;
  image: {
    src: string;
    alt: string;
  };
  spanClassName: string;
  heightClassName: string;
  contentWidthClassName: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "hair",
    number: "01",
    name: "Hair",
    description: "Hair styling and restorative treatments for soft, luminous hair.",
    label: "8 Treatments",
    href: "/services#hair",
    image: {
      src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=85&w=1400&auto=format&fit=crop",
      alt: "Professional salon hairstyling for healthy glossy hair",
    },
    spanClassName: "md:col-span-1 lg:[grid-column:1/span_4] lg:[grid-row:1/span_4]",
    heightClassName: "h-[420px] md:h-[420px] lg:h-full",
    contentWidthClassName: "max-w-full lg:max-w-[72%]",
  },
  {
    id: "facial",
    number: "02",
    name: "Facial",
    description: "Makeup and facial rituals for a radiant glow.",
    label: "5 Treatments",
    href: "/services#facial",
    image: {
      src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=85&w=1000&auto=format&fit=crop",
      alt: "Premium facial skincare treatment in a clean salon room",
    },
    spanClassName: "md:col-span-1 lg:[grid-column:5/span_8] lg:[grid-row:1/span_2]",
    heightClassName: "h-[360px] md:h-[360px] lg:h-full",
    contentWidthClassName: "max-w-full lg:max-w-[42%]",
  },
  {
    id: "nails",
    number: "03",
    name: "Nails",
    description: "Manicure, pedicure and polish treatments for hands and feet.",
    label: "6 Treatments",
    href: "/services#nails",
    image: {
      src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?q=85&w=1000&auto=format&fit=crop",
      alt: "Elegant soft neutral manicure in a premium salon style",
    },
    spanClassName: "md:col-span-1 lg:[grid-column:5/span_4] lg:[grid-row:3/span_2]",
    heightClassName: "h-[420px] md:h-[420px] lg:h-full",
    contentWidthClassName: "max-w-full lg:max-w-[78%]",
  },
  {
    id: "waxing",
    number: "04",
    name: "Waxing",
    description: "Waxing services for smooth skin and refined brows.",
    label: "5 Treatments",
    href: "/services#waxing",
    image: {
      src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=85&w=1400&auto=format&fit=crop",
      alt: "Tasteful professional beauty treatment room for waxing services",
    },
    spanClassName: "md:col-span-1 lg:[grid-column:9/span_4] lg:[grid-row:3/span_2]",
    heightClassName: "h-[420px] md:h-[420px] lg:h-full",
    contentWidthClassName: "max-w-full lg:max-w-[78%]",
  },
  {
    id: "threading",
    number: "05",
    name: "Threading",
    description: "Precise threading for defined brows and facial details.",
    label: "4 Treatments",
    href: "/services#threading",
    image: {
      src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=85&w=1000&auto=format&fit=crop",
      alt: "Professional eyebrow threading and brow shaping",
    },
    spanClassName: "md:col-span-2 lg:[grid-column:1/span_8] lg:[grid-row:5/span_2]",
    heightClassName: "h-[360px] md:h-[360px] lg:h-full",
    contentWidthClassName: "max-w-full lg:max-w-[42%]",
  },
  {
    id: "massage",
    number: "06",
    name: "Massage",
    description: "Relaxing therapies for the head, shoulders, hands and legs.",
    label: "4 Treatments",
    href: "/services#massage",
    image: {
      src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=85&w=1000&auto=format&fit=crop",
      alt: "Relaxing spa massage setup with soft towels and warm light",
    },
    spanClassName: "md:col-span-2 lg:[grid-column:9/span_4] lg:[grid-row:5/span_2]",
    heightClassName: "h-[420px] md:h-[420px] lg:h-full",
    contentWidthClassName: "max-w-full lg:max-w-[78%]",
  },
];
