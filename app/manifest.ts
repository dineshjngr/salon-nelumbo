import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Salon Nelumbo",
    short_name: "Nelumbo",
    description: "Beauty salon in Al Nahda, Dubai for hair, facial, nails and beauty packages.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#F8F3FC",
    theme_color: "#542568",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon.png",
        sizes: "248x111",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "248x111",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
