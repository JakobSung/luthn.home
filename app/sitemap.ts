import type { MetadataRoute } from "next";
import { locales, siteUrl } from "./site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    ...locales.map((locale) => ({
      url: `${siteUrl}/${locale}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
