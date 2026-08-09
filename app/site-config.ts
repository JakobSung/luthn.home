import type { Metadata } from "next";

export const siteUrl = "https://luthn.com";
export const githubUrl = "https://github.com/JakobSung/Luthn";
export const memoryImageUrl = `${siteUrl}/luthn-memory-atlas.png`;
export const locales = ["en", "ko"] as const;
export type Locale = (typeof locales)[number];

export const languageAlternates = {
  en: siteUrl,
  ko: `${siteUrl}/ko`,
  "x-default": siteUrl,
} as const;

export const localeSeo = {
  en: {
    title: "Luthn — Safe Context for Agents",
    description: "A shared memory layer for agents, with audited context and a separate encrypted vault for sensitive data.",
    openGraphDescription: "Shared memory for agents, with audited context and a separate encrypted vault for sensitive data.",
    openGraphLocale: "en_US",
    imageAlt: "Luthn memory architecture with shared agents, audit, and a separate vault",
  },
  ko: {
    title: "Luthn — 에이전트를 위한 안전한 맥락",
    description: "여러 agent가 공유하는 승인된 맥락, 외부 데이터 수집, 민감 데이터를 분리 보관하는 암호화 vault.",
    openGraphDescription: "여러 agent가 공유하는 승인된 맥락과 민감 데이터를 분리 보관하는 Luthn 메모리.",
    openGraphLocale: "ko_KR",
    imageAlt: "여러 agent와 감사, 별도 vault로 구성된 Luthn 메모리 구조",
  },
} as const;

export function createLocaleMetadata(locale: Locale, path: string): Metadata {
  const seo = localeSeo[locale];
  const pageUrl = path === "/" ? siteUrl : `${siteUrl}${path}`;

  return {
    title: { absolute: seo.title },
    description: seo.description,
    alternates: {
      canonical: pageUrl,
      languages: languageAlternates,
    },
    openGraph: {
      type: "website",
      url: pageUrl,
      title: seo.title,
      description: seo.openGraphDescription,
      siteName: "Luthn",
      locale: seo.openGraphLocale,
      images: [
        {
          url: memoryImageUrl,
          width: 1672,
          height: 941,
          alt: seo.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.openGraphDescription,
      images: [memoryImageUrl],
    },
  };
}
