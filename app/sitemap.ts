import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/src/lib/seo";

const routes = [
  { path: "/", priority: 1, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/packages", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/gallery", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: absoluteUrl(path),
    lastModified: new Date("2026-07-12"),
    changeFrequency,
    priority,
  }));
}
