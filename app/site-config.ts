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
    title: "Luthn — Secure Shared Memory for AI Agents",
    description:
      "Luthn is a self-hosted memory layer for AI agents. Share approved context, audit what crosses the boundary, and keep sensitive data in an encrypted vault.",
    openGraphDescription:
      "Secure shared memory for AI agents, with audited context and a separate encrypted vault for sensitive data.",
    openGraphLocale: "en_US",
    imageAlt: "Luthn secure shared memory architecture for AI agents with audit and an encrypted vault",
  },
  ko: {
    title: "Luthn — AI 에이전트를 위한 안전한 공유 메모리",
    description:
      "Luthn은 AI 에이전트를 위한 셀프 호스팅 메모리입니다. 승인된 맥락만 공유하고, 민감한 데이터는 암호화 vault에 분리 보관합니다.",
    openGraphDescription:
      "여러 AI agent가 공유하는 승인된 맥락과 감사, 민감한 데이터를 분리 보관하는 암호화 vault.",
    openGraphLocale: "ko_KR",
    imageAlt: "여러 AI agent가 공유하는 Luthn 메모리와 감사, 별도 암호화 vault 구조",
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
