import { JsonLd } from "@/src/components/seo/JsonLd";
import { absoluteUrl } from "@/src/lib/seo";

export function BreadcrumbJsonLd({ name, path }: { name: string; path: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name,
            item: absoluteUrl(path),
          },
        ],
      }}
    />
  );
}
