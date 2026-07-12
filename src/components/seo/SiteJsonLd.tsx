import { salon } from "@/src/data/site-data";
import { JsonLd } from "@/src/components/seo/JsonLd";
import { absoluteUrl } from "@/src/lib/seo";

const serviceNames = [
  "Hair Styling",
  "Hair Treatments",
  "Hair Spa",
  "Hair Colour",
  "Facial",
  "Waxing",
  "Threading",
  "Massage",
  "Nails",
  "Manicure",
  "Pedicure",
  "Beauty Packages",
];

export function SiteJsonLd() {
  const businessId = `${absoluteUrl("/")}#beauty-salon`;

  return (
    <JsonLd
      data={[
        {
          "@context": "https://schema.org",
          "@type": "BeautySalon",
          "@id": businessId,
          name: salon.name,
          url: absoluteUrl("/"),
          logo: absoluteUrl("/images/logo.png"),
          image: absoluteUrl("/salon-hero-banner.png"),
          telephone: salon.phoneInternational,
          priceRange: "AED 99+",
          address: {
            "@type": "PostalAddress",
            streetAddress: "4th Street, Al Nahda 1",
            addressLocality: "Dubai",
            addressRegion: "Dubai",
            addressCountry: "AE",
          },
          areaServed: {
            "@type": "Place",
            name: "Al Nahda, Dubai, UAE",
          },
          hasMap: salon.mapsUrl,
          sameAs: [salon.instagram, salon.mapsUrl, salon.whatsapp],
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: salon.phoneInternational,
              contactType: "appointments",
              areaServed: "AE",
              availableLanguage: ["English"],
            },
          ],
          potentialAction: {
            "@type": "ReserveAction",
            target: salon.bookingWhatsapp,
            name: "Book Appointment",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": `${absoluteUrl("/")}#website`,
          url: absoluteUrl("/"),
          name: salon.name,
          publisher: { "@id": businessId },
          inLanguage: "en-AE",
        },
        {
          "@context": "https://schema.org",
          "@graph": serviceNames.map((name) => ({
            "@type": "Service",
            name,
            url: absoluteUrl(name === "Beauty Packages" ? "/packages" : "/services"),
            provider: { "@id": businessId },
            areaServed: "Al Nahda, Dubai, UAE",
            serviceType: name,
          })),
        },
      ]}
    />
  );
}
