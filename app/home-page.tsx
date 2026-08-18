"use client";

import { useEffect } from "react";
import { githubUrl, localeSeo, siteUrl, type Locale } from "./site-config";

const copy = {
  en: {
    languageLabel: "Choose language",
    githubLabel: "Open Luthn on GitHub",
    hero: ["Safe Context", "for Agents"],
    atlasLabel:
      "Luthn secure shared memory architecture for AI agents: approved context, external sources, audit, and a separate encrypted vault.",
    principlesLabel: "Why Luthn",
    answerKicker: "WHY LUTHN",
    answerTitle: "A secure shared memory layer for AI agents.",
    answerDescription:
      "Luthn keeps approved context available across agents, while audit and an encrypted vault protect what should stay private.",
    principles: [
      ["SHARED MEMORY", "Stop repeating yourself. Approved context stays available across agents."],
      ["EXTERNAL SOURCES", "Context is scattered. Luthn gathers useful signals from messengers, documents, and mail."],
      ["AUDIT", "Sharing needs a check. Audit decides what may cross into shared memory."],
      ["VAULT", "Sensitive data stays out of agent memory. It is encrypted and stored separately."],
    ],
    quickStart: {
      eyebrow: "[HOW TO]",
      heroCta: "How to",
      title: "Run Luthn.",
      description: "Install. Check. Connect.",
      installLabel: "INSTALL",
      installTitle: "Install Luthn.",
      installCommand: "curl -fsSL https://raw.githubusercontent.com/JakobSung/Luthn/main/scripts/install.sh | bash -s -- --channel stable",
      installNote: "macOS / Linux · Docker required",
      verifyLabel: "CHECK",
      verifyTitle: "Make sure it is ready.",
      verifyCommand: "luthn status",
      verifyNote: "Open the console at http://127.0.0.1:8080",
      extraLabel: "CONNECT",
      extraTitle: "Add agent.",
      extraCommand: "luthn connect codex\nluthn connection status codex\n\nluthn connect claude\nluthn connection status claude",
      extraNote: "Run after Luthn is ready. Agent connection is a separate step.",
      windowsLabel: "WINDOWS",
      windowsTitle: "Install with PowerShell",
      windowsCommand: "$installer = Join-Path ([IO.Path]::GetTempPath()) \"luthn-install.ps1\"\nirm https://raw.githubusercontent.com/JakobSung/Luthn/main/scripts/install.ps1 -OutFile $installer\npwsh -NoProfile -File $installer -Channel stable\nRemove-Item -LiteralPath $installer",
      windowsNote: "Requires PowerShell 7.4+ and Docker Desktop in Linux container mode.",
    },
    footer: "Safe Context for Agents.",
  },
  ko: {
    languageLabel: "언어 선택",
    githubLabel: "GitHub에서 Luthn 열기",
    hero: ["AI 에이전트를 위한", "안전한 공유 메모리"],
    atlasLabel: "여러 AI agent, 외부 소스, 감사, 별도 암호화 vault로 구성된 Luthn 공유 메모리 구조",
    principlesLabel: "Luthn이 필요한 이유",
    answerKicker: "WHY LUTHN",
    answerTitle: "AI 에이전트를 위한 안전한 공유 메모리.",
    answerDescription:
      "Luthn은 승인된 맥락만 여러 agent에 공유하고, 감사와 암호화 vault로 민감한 데이터는 분리합니다.",
    principles: [
      ["SHARED MEMORY", "같은 맥락을 반복해서 설명하지 않아도 됩니다. 승인된 맥락을 여러 agent가 공유합니다."],
      ["EXTERNAL SOURCES", "정보가 여러 도구에 흩어져도 됩니다. 메신저·문서·메일의 필요한 맥락을 안전하게 모읍니다."],
      ["AUDIT", "공유 전에 판단합니다. 어떤 메모리가 shared memory로 넘어갈지 감사하고 결정합니다."],
      ["VAULT", "민감한 데이터는 agent memory가 되지 않습니다. 별도로 암호화해 보관합니다."],
    ],
    quickStart: {
      eyebrow: "[HOW TO]",
      heroCta: "How to",
      title: "Luthn 실행하기.",
      description: "설치. 확인. 연결.",
      installLabel: "설치",
      installTitle: "Luthn 설치하기.",
      installCommand: "curl -fsSL https://raw.githubusercontent.com/JakobSung/Luthn/main/scripts/install.sh | bash -s -- --channel stable",
      installNote: "macOS / Linux · Docker 필요",
      verifyLabel: "확인",
      verifyTitle: "준비 상태 확인하기.",
      verifyCommand: "luthn status",
      verifyNote: "http://127.0.0.1:8080에서 console을 엽니다.",
      extraLabel: "연결",
      extraTitle: "Agent 연결하기.",
      extraCommand: "luthn connect codex\nluthn connection status codex\n\nluthn connect claude\nluthn connection status claude",
      extraNote: "Luthn이 준비된 다음 실행합니다. Agent 연결은 별도 단계입니다.",
      windowsLabel: "WINDOWS",
      windowsTitle: "PowerShell로 설치하기",
      windowsCommand: "$installer = Join-Path ([IO.Path]::GetTempPath()) \"luthn-install.ps1\"\nirm https://raw.githubusercontent.com/JakobSung/Luthn/main/scripts/install.ps1 -OutFile $installer\npwsh -NoProfile -File $installer -Channel stable\nRemove-Item -LiteralPath $installer",
      windowsNote: "PowerShell 7.4 이상과 Linux container mode의 Docker Desktop이 필요합니다.",
    },
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
        mainEntity: { "@id": `${siteUrl}/#software` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#software`,
        name: "Luthn",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "macOS, Linux, Windows",
        description: seo.description,
        featureList: c.principles.map(([title, description]) => `${title}: ${description}`),
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
    window.location.assign(nextLocale === "en" ? "/" : "/ko");
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
            <a className="home-hero-quick-start" href="#quick-start">
              <span>{c.quickStart.heroCta}</span>
              <span aria-hidden="true">↓</span>
            </a>
          </section>

          <section className="memory-atlas-section" aria-labelledby="atlas-title">
            <figure className="memory-atlas-figure">
              <img src="/luthn-memory-atlas.png" alt={c.atlasLabel} width={1672} height={941} />
            </figure>

            <div className="memory-answer-intro">
              <p className="memory-answer-kicker">{c.answerKicker}</p>
              <div>
                <h2 id="atlas-title">{c.answerTitle}</h2>
                <p>{c.answerDescription}</p>
              </div>
            </div>

            <div className="principles-list" aria-label={c.principlesLabel}>
              {c.principles.map(([title, description]) => (
                <article className="principle" key={title}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="quick-start-section" id="quick-start" aria-labelledby="quick-start-title">
            <div className="quick-start-intro">
              <p className="quick-start-kicker">{c.quickStart.eyebrow}</p>
              <h2 id="quick-start-title">{c.quickStart.title}</h2>
              <p>{c.quickStart.description}</p>
            </div>

            <div className="quick-start-steps">
              <article className="quick-start-step-row">
                <div className="quick-start-card-heading">
                  <span className="quick-start-step">01.</span>
                  <div>
                    <p className="quick-start-card-label">{c.quickStart.installLabel}</p>
                    <h3>{c.quickStart.installTitle}</h3>
                  </div>
                </div>
                <pre><code>{c.quickStart.installCommand}</code></pre>
                <p className="quick-start-card-note">{c.quickStart.installNote}</p>
              </article>

              <article className="quick-start-step-row">
                <div className="quick-start-card-heading">
                  <span className="quick-start-step">02.</span>
                  <div>
                    <p className="quick-start-card-label">{c.quickStart.verifyLabel}</p>
                    <h3>{c.quickStart.verifyTitle}</h3>
                  </div>
                </div>
                <pre><code>{c.quickStart.verifyCommand}</code></pre>
                <p className="quick-start-card-note">{c.quickStart.verifyNote}</p>
              </article>

              <article className="quick-start-step-row">
                <div className="quick-start-card-heading">
                  <span className="quick-start-step">03.</span>
                  <div>
                    <p className="quick-start-card-label">{c.quickStart.extraLabel}</p>
                    <h3>{c.quickStart.extraTitle}</h3>
                  </div>
                </div>
                <pre><code>{c.quickStart.extraCommand}</code></pre>
                <p className="quick-start-card-note">{c.quickStart.extraNote}</p>
              </article>
            </div>

            <details className="quick-start-details">
              <summary>
                <span className="quick-start-card-label">{c.quickStart.windowsLabel}</span>
                <span className="quick-start-details-title">{c.quickStart.windowsTitle}</span>
                <span className="quick-start-details-icon" aria-hidden="true">+</span>
              </summary>
              <pre><code>{c.quickStart.windowsCommand}</code></pre>
              <p className="quick-start-card-note">{c.quickStart.windowsNote}</p>
            </details>
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
