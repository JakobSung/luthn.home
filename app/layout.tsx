import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { languageAlternates, memoryImageUrl, siteUrl } from "./site-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Luthn — Safe Context for Agents",
    template: "%s | Luthn",
  },
  description:
    "A shared memory layer for agents, with audited context and a separate encrypted vault for sensitive data.",
  keywords: [
    "Luthn",
    "AI agent memory",
    "safe context",
    "long-term memory for AI agents",
    "self-hosted memory",
    "agent memory layer",
    "AI 데이터 경계",
    "에이전트 장기기억",
  ],
  authors: [{ name: "awes" }],
  creator: "awes",
  publisher: "awes",
  category: "technology",
  alternates: { canonical: siteUrl, languages: languageAlternates },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Luthn — Safe Context for Agents",
    description:
      "Shared memory for agents, with audited context and a separate encrypted vault for sensitive data.",
    siteName: "Luthn",
    locale: "en_US",
    images: [
      {
        url: memoryImageUrl,
        width: 1672,
        height: 941,
        alt: "Luthn memory architecture with shared agents, audit, and a separate vault",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luthn — Safe Context for Agents",
    description: "Shared memory for agents, with sensitive data kept in a separate encrypted vault.",
    images: [memoryImageUrl],
  },
  icons: {
    icon: "/luthn-object-logo.png",
    shortcut: "/luthn-object-logo.png",
    apple: "/luthn-object-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
