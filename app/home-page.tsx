"use client";

import { useEffect } from "react";
import { githubUrl, localeSeo, siteUrl, type Locale } from "./site-config";

const copy = {
  en: {
    languageLabel: "Choose language",
    githubLabel: "Open Luthn on GitHub",
    hero: ["Safe Context", "for Agents"],
    atlasLabel: "Luthn memory architecture: shared agents, external sources, audit, and a separate vault.",
    principlesLabel: "Luthn core",
    principles: [
      ["SHARED MEMORY", "Approved context shared across agents."],
      ["EXTERNAL SOURCES", "Collects external data from messengers, documents, and mail, then remembers it safely."],
      ["AUDIT", "Audits memory and decides whether sensitive data may be shared."],
      ["VAULT", "Stores sensitive data separately, without exposing it to agents."],
    ],
    footer: "Safe Context for Agents.",
  },
  ko: {
    languageLabel: "언어 선택",
    githubLabel: "GitHub에서 Luthn 열기",
    hero: ["Safe Context", "for Agents"],
    atlasLabel: "여러 agent, 외부 소스, 감사, 별도 vault로 구성된 Luthn 메모리 구조",
    principlesLabel: "Luthn 핵심",
    principles: [
      ["SHARED MEMORY", "여러 agent가 함께 공유하는 승인된 맥락입니다."],
      ["EXTERNAL SOURCES", "메신저, 문서, 메일 등 외부 사용 데이터를 수집해 안전하게 기억합니다."],
      ["AUDIT", "메모리를 감사하고, 민감 데이터의 공유 승인 여부를 결정합니다."],
      ["VAULT", "민감한 데이터는 agent에게 노출되지 않도록 별도로 보관합니다."],
    ],
    footer: "Safe Context for Agents.",
  },
} as const;

type HomePageProps = {
  initialLocale: Locale;
  canonicalPath: string;
};

function LuthnWordmark({ className = "", decorative = false }: { className?: string; decorative?: boolean }) {
  return (
    <img
      className={`luthn-wordmark ${className}`}
      src="/brand/luthn-wordmark-white.svg"
      alt={decorative ? "" : "Luthn"}
      width={1223}
      height={356}
    />
  );
}

function GitHubIcon({ size = 20 }: { size?: number }) {
  return <img className="github-mark" src="/github-mark.png" alt="" width={size} height={size} />;
}

export default function HomePage({ initialLocale, canonicalPath }: HomePageProps) {
  const locale = initialLocale;
  const c = copy[locale];
  const pageUrl = canonicalPath === "/" ? siteUrl : `${siteUrl}${canonicalPath}`;
  const seo = localeSeo[locale];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Luthn",
        inLanguage: locale,
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: seo.title,
        description: seo.description,
        inLanguage: locale,
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#software`,
        name: "Luthn",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "macOS, Linux, Windows",
        description: seo.description,
        url: siteUrl,
        codeRepository: githubUrl,
        license: "https://www.gnu.org/licenses/agpl-3.0.html",
        provider: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "awes",
        email: "contact@awes.it.kr",
        url: siteUrl,
        sameAs: [githubUrl],
      },
    ],
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const chooseLocale = (nextLocale: Locale) => {
    window.location.assign(nextLocale === "en" ? "/en" : "/ko");
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <a className="skip-link" href="#main-content">{locale === "ko" ? "본문으로 건너뛰기" : "Skip to content"}</a>

      <div className={`home-shell locale-${locale}`} lang={locale}>
        <header className="home-header">
          <a className="home-brand" href="#top" aria-label="Luthn home">
            <LuthnWordmark className="home-brand-wordmark" decorative />
          </a>

          <div className="home-header-actions">
            <div className="language-switcher" aria-label={c.languageLabel} role="group">
              <button className={locale === "en" ? "language-active" : ""} type="button" onClick={() => chooseLocale("en")} aria-pressed={locale === "en"}>EN</button>
              <span aria-hidden="true">/</span>
              <button className={locale === "ko" ? "language-active" : ""} type="button" onClick={() => chooseLocale("ko")} aria-pressed={locale === "ko"}>KR</button>
            </div>
            <a className="github-icon-button" href={githubUrl} target="_blank" rel="noreferrer" aria-label={c.githubLabel} title={c.githubLabel}>
              <GitHubIcon size={18} />
            </a>
          </div>
        </header>

        <main id="main-content">
          <section className="home-hero" id="top" aria-labelledby="hero-title">
            <h1 id="hero-title" aria-label={c.hero.join(" ")}>
              <span>{c.hero[0]}</span>
              <br />
              <span>{c.hero[1]}</span>
            </h1>
          </section>

          <section className="memory-atlas-section" aria-labelledby="atlas-title">
            <h2 id="atlas-title" className="sr-only">{c.principlesLabel}</h2>
            <figure className="memory-atlas-figure">
              <img src="/luthn-memory-atlas.png" alt={c.atlasLabel} width={1672} height={941} />
            </figure>

            <div className="principles-list" aria-label={c.principlesLabel}>
              {c.principles.map(([title, description]) => (
                <article className="principle" key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </section>
        </main>

        <footer className="home-footer">
          <LuthnWordmark className="home-footer-wordmark" />
          <p>{c.footer}</p>
          <a className="home-footer-contact" href="mailto:contact@awes.it.kr">contact@awes.it.kr</a>
        </footer>
      </div>
    </>
  );
}
