import type { Metadata } from "next";

export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://salonnelumbo.com",
);

export const siteName = "Salon Nelumbo";
export const defaultOgImage = "/salon-hero-banner.png";

export const localKeywords = [
  "Beauty Salon Al Nahda",
  "Beauty Salon Dubai",
  "Hair Salon Al Nahda",
  "Hair Spa Dubai",
  "Facial Dubai",
  "Waxing Dubai",
  "Threading Dubai",
  "Manicure Dubai",
  "Pedicure Dubai",
  "Nail Salon Dubai",
  "Massage Dubai",
  "Beauty Packages Dubai",
  "Beauty Services Al Nahda",
];

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: PageMetadataOptions): Metadata {
  const canonical = path === "/" ? "/" : path;

  return {
    title,
    description,
    keywords: [...new Set([...keywords, ...localKeywords])],
    alternates: { canonical },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_AE",
      url: canonical,
      siteName,
      title,
      description,
      images: [
        {
          url: defaultOgImage,
          alt: "Salon Nelumbo beauty salon in Al Nahda, Dubai",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [defaultOgImage],
    },
  };
}

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
