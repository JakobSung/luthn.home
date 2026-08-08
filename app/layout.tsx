import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: {
    default: "Luthn — Safe memory for AI agents",
    template: "%s | Luthn",
  },
  description:
    "Luthn is a self-hosted long-term memory and safe context layer for AI agents. Keep sensitive raw context behind a local boundary and return only approved context.",
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
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "Luthn — Safe memory for AI agents",
    description:
      "Give your agents a memory. Keep private data behind a clear local boundary.",
    siteName: "Luthn",
    locale: "en_US",
    images: [
      {
        url: "/luthn-sanctum-hero-redrawn.png",
        width: 1717,
        height: 916,
        alt: "Luthn protected memory object in a dark space",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luthn — Safe memory for AI agents",
    description:
      "Long-term memory for agents, with sensitive data kept behind a local boundary.",
    images: ["/luthn-sanctum-hero-redrawn.png"],
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
