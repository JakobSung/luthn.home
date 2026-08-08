"use client";

import { useEffect, useState } from "react";

const githubUrl = "https://github.com/JakobSung/Luthn";
const localePreferenceKey = "luthn-locale-preference";
type Locale = "ko" | "en";

const copy = {
  ko: {
    languageLabel: "언어 선택",
    nav: { sanctum: "Luthn", memory: "Memory", features: "Principles", roadmap: "Path" },
    githubLabel: "GitHub에서 Luthn 시작하기",
    hero: {
      titleBefore: "기억은 Luthn에 두고,",
      titleAccent: "원문은 경계 안에 둡니다.",
    },
    strip: [
      ["THE MEMORY", "보호된 기억"],
      ["THE BOUNDARY", "원문은 로컬에"],
      ["THE PATH", "필요한 만큼만"],
    ],
    memory: {
      index: "01 / THE MEMORY LAYER",
      titleOne: "Luthn은 열리지 않고,",
      titleTwo: "필요한 기억만 건너갑니다.",
      body: "한 번의 작업이 다음 작업의 맥락이 되도록. Luthn은 원문을 로컬 경계 안에 보관하고, 정책이 허용한 작은 context pack만 다음 에이전트에게 돌려줍니다.",
      localLabel: "로컬 경계 안에 남는 것",
      localItems: ["민감한 원문", "비공개 메시지", "자격증명", "운영 데이터"],
      safeLabel: "경계를 넘어가는 것",
      safeItems: ["검토된 요약", "비식별 참조", "승인된 맥락", "bounded recall"],
    },
    connectors: {
      index: "CONNECTORS / DATA INTAKE",
      titleOne: "데이터는 익숙한 곳에서,",
      titleTwo: "기억은 경계 안으로.",
      body: "Messenger, document, mail에서 필요한 맥락을 연결해 가져옵니다. Luthn은 원문 전체를 열어두지 않고 다음 작업에 필요한 context만 남깁니다.",
      items: [
        ["MESSENGER", "대화에서 이어지는 맥락", "메신저 대화의 흐름과 결정사항을 프로젝트 기억으로 연결합니다."],
        ["DOCUMENT", "문서에 남은 기준", "문서와 파일 속 규칙, 결정, 참고자료를 다시 쓸 수 있는 맥락으로 정리합니다."],
        ["MAIL", "메일의 중요한 흐름", "메일 스레드의 요청과 합의처럼 다음 작업에 필요한 정보만 이어갑니다."],
      ],
    },
    features: {
      index: "02 / THE PROTECTIVE FIELD",
      titleOne: "기억을 지키는 힘까지,",
      titleTwo: "조용하게 설계합니다.",
      asideOne: "A quiet layer between",
      asideTwo: "agents and sensitive context.",
      items: [
        ["CLASSIFY / REDACT", "원문을 봉인하고 안전한 기억만", "대화 캡슐과 프로젝트 맥락을 먼저 분류하고 비식별화합니다. 에이전트에는 정책이 허용한 요약과 참조만 노출됩니다."],
        ["SHARED MEMORY", "여러 에이전트가 같은 맥락으로", "연결된 에이전트가 같은 프로젝트 기억을 재사용합니다. 각 에이전트의 연결 상태와 훅은 독립적으로 관리됩니다."],
        ["AUTO-RECALL", "필요할 때만, 필요한 만큼", "새 작업이나 주제가 시작될 때 작은 context pack을 가져옵니다. 흐름을 방해하지 않도록 bounded recall로 동작합니다."],
        ["AUDIT / APPROVAL", "모든 경계를 기록하고 승인으로 엽니다", "무엇이 저장되고 공유되고 조회됐는지 추적합니다. 외부 공개는 별도의 명시적 승인 경로입니다."],
      ],
    },
    roadmap: {
      index: "03 / THE PATH FORWARD",
      titleOne: "하나의 Luthn,",
      titleTwo: "세 가지로 이어지는 길.",
      oss: ["NOW · OPEN SOURCE", "Luthn OSS", "Docker와 PostgreSQL 위에서 직접 운영하는 self-hosted shared memory.", "SELF-HOSTED · DOCKER + POSTGRESQL"],
      cloud: ["NEXT LAYER", "Luthn Cloud", "팀 전용으로 연결된 에이전트들이 같은 safe context를 쓰는 managed memory layer.", "TEAM MEMORY · NEXT"],
      ontology: ["FAR HORIZON", "Luthn Ontology", "엔터프라이즈 지식 구조와 정책을 agent-safe context로 연결하는 ontology layer.", "ORG CONTEXT · LATER"],
    },
    faq: {
      index: "04 / QUIET QUESTIONS",
      titleOne: "경계가 분명하면,",
      titleTwo: "기억은 오래 남습니다.",
      items: [
        ["Luthn은 무엇인가요?", "Luthn은 AI 에이전트를 위한 self-hosted shared memory와 safe context layer입니다. 여러 에이전트가 재사용할 프로젝트 기억을 만들면서도, 민감한 원문은 기본 컨텍스트에서 분리합니다."],
        ["민감한 데이터가 에이전트에 전달되나요?", "원문 전체를 전달하지 않습니다. 로컬의 private boundary 안에 원문을 두고, 정책에 따라 검토된 요약·비식별 참조·승인된 프로젝트 맥락만 제공합니다."],
        ["팀과 엔터프라이즈는 어떻게 확장하나요?", "Luthn Cloud는 팀 전용 shared memory 경험을, Luthn Ontology는 엔터프라이즈의 지식 구조·정책·도메인 맥락을 위한 다음 레이어를 목표로 합니다."],
      ],
    },
    cta: {
      index: "ENTER THE BOUNDARY",
      titleOne: "다음 task를 위해,",
      titleTwo: "기억을 지키세요.",
      body: "Luthn은 에이전트의 장기기억을 더 유용하게, 데이터 경계를 더 분명하게 만듭니다.",
      button: "Luthn GitHub 열기",
    },
    footer: "Safe context for AI agents.",
  },
  en: {
    languageLabel: "Choose language",
    nav: { sanctum: "Luthn", memory: "Memory", features: "Principles", roadmap: "Path" },
    githubLabel: "Start Luthn on GitHub",
    hero: {
      titleBefore: "Keep memory in Luthn.",
      titleAccent: "Keep raw context behind the boundary.",
    },
    strip: [
      ["THE MEMORY", "Protected memory"],
      ["THE BOUNDARY", "Raw stays local"],
      ["THE PATH", "Only what is needed"],
    ],
    memory: {
      index: "01 / THE MEMORY LAYER",
      titleOne: "Luthn stays sealed,",
      titleTwo: "only needed memory crosses.",
      body: "Let one task become context for the next. Luthn keeps raw context inside a local boundary and returns only a small policy-approved context pack to the next agent.",
      localLabel: "Stays inside the local boundary",
      localItems: ["Sensitive records", "Private messages", "Credentials", "Operational data"],
      safeLabel: "Crosses the boundary",
      safeItems: ["Reviewed summaries", "Redacted references", "Approved context", "Bounded recall"],
    },
    connectors: {
      index: "CONNECTORS / DATA INTAKE",
      titleOne: "Bring context from where work happens,",
      titleTwo: "keep memory inside the boundary.",
      body: "Connect Messenger, Document, and Mail where work already happens. Luthn keeps the full source closed and carries only the context needed for the next task.",
      items: [
        ["MESSENGER", "Context from the conversation", "Carry message threads and decisions into reusable project memory."],
        ["DOCUMENT", "Standards kept in documents", "Turn rules, decisions, and references in files into usable context."],
        ["MAIL", "The important thread", "Continue only the requests and agreements needed for the next task."],
      ],
    },
    features: {
      index: "02 / THE PROTECTIVE FIELD",
      titleOne: "Make the force that guards memory,",
      titleTwo: "quiet by design.",
      asideOne: "A quiet layer between",
      asideTwo: "agents and sensitive context.",
      items: [
        ["CLASSIFY / REDACT", "Seal the raw context. Keep safe memory.", "Classify and redact turn capsules and project context first. Agents see only policy-approved summaries and references."],
        ["SHARED MEMORY", "Give every agent the same context.", "Connected agents can reuse the same project memory while their hooks and connection state remain independent."],
        ["AUTO-RECALL", "Only when needed, only what is needed.", "Fetch a small context pack when a new task or topic begins. Bounded recall keeps the flow quiet and focused."],
        ["AUDIT / APPROVAL", "Record every boundary. Open by approval.", "Track what was stored, shared, and retrieved. External publication stays behind a separate explicit approval path."],
      ],
    },
    roadmap: {
      index: "03 / THE PATH FORWARD",
      titleOne: "One Luthn,",
      titleTwo: "three paths ahead.",
      oss: ["NOW · OPEN SOURCE", "Luthn OSS", "Run your own self-hosted shared memory on Docker and PostgreSQL.", "SELF-HOSTED · DOCKER + POSTGRESQL"],
      cloud: ["NEXT LAYER", "Luthn Cloud", "A managed memory layer where connected agents share the same safe context for your team.", "TEAM MEMORY · NEXT"],
      ontology: ["FAR HORIZON", "Luthn Ontology", "An ontology layer that connects enterprise knowledge structures and policies to agent-safe context.", "ORG CONTEXT · LATER"],
    },
    faq: {
      index: "04 / QUIET QUESTIONS",
      titleOne: "When the boundary is clear,",
      titleTwo: "memory can remain.",
      items: [
        ["What is Luthn?", "Luthn is a self-hosted shared memory and safe context layer for AI agents. It gives multiple agents reusable project memory while separating sensitive raw data from their default context."],
        ["Does sensitive data reach the agent?", "Not as raw records. Keep the source inside a local private boundary and expose only reviewed summaries, redacted references, and approved project context."],
        ["How does it scale for teams and enterprise?", "Luthn Cloud is planned for team-only shared memory, while Luthn Ontology is the next enterprise layer for knowledge structures, policy, and domain context."],
      ],
    },
    cta: {
      index: "ENTER THE BOUNDARY",
      titleOne: "For the next task,",
      titleTwo: "protect the memory.",
      body: "Luthn makes long-term agent memory more useful and the data boundary more explicit.",
      button: "Open Luthn on GitHub",
    },
    footer: "Safe context for AI agents.",
  },
} as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Luthn",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "macOS, Linux, Windows",
      description: "Self-hosted long-term memory and safe context layer for AI agents, with a clear boundary for sensitive data.",
      url: githubUrl,
      codeRepository: githubUrl,
      license: "https://www.gnu.org/licenses/agpl-3.0.html",
      provider: { "@type": "Organization", name: "awes" },
    },
    {
      "@type": "Organization",
      name: "awes",
      email: "jakob@awes.it.kr",
      url: githubUrl,
    },
    {
      "@type": "FAQPage",
      mainEntity: copy.en.faq.items.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
  ],
};

function LuthnWordmark({ className = "", decorative = false }: { className?: string; decorative?: boolean }) {
  return <img className={`luthn-wordmark ${className}`} src="/brand/luthn-wordmark-white.svg?v=2" alt={decorative ? "" : "Luthn"} width={1223} height={356} />;
}

function GitHubIcon({ size = 20 }: { size?: number }) {
  return <img className="github-mark" src="/github-mark.png" alt="" width={size} height={size} />;
}

function MemoryStage({ locale, memory }: { locale: Locale; memory: { localLabel: string; localItems: string[]; safeLabel: string; safeItems: string[] } }) {
  const label = locale === "ko" ? "어두운 로컬 경계에서 안전한 맥락으로 흐르는 메모리 필드" : "A memory field where safe context flows across a quiet local boundary";

  return (
    <div className="memory-stage reveal" aria-label={label}>
      <div className="memory-field-art" aria-hidden="true"><span className="memory-field-flow memory-field-flow-a" /><span className="memory-field-flow memory-field-flow-b" /><span className="memory-field-flow memory-field-flow-c" /></div>
      <div className="memory-overlay">
        <div className="memory-overlay-column memory-overlay-local">
          <strong className="memory-overlay-label">{memory.localLabel}</strong>
          <ul className="memory-overlay-list">{memory.localItems.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="memory-overlay-column memory-overlay-safe">
          <strong className="memory-overlay-label">{memory.safeLabel}</strong>
          <ul className="memory-overlay-list">{memory.safeItems.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
    </div>
  );
}

function FeatureVisual({ index }: { index: number }) {
  return <div className={`feature-visual feature-visual-${index + 1}`} aria-hidden="true"><span /><span /><span /><span /></div>;
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const [localeReady, setLocaleReady] = useState(false);
  const c = copy[locale];

  useEffect(() => {
    const savedLocale = window.localStorage.getItem(localePreferenceKey);
    const browserLocale: Locale = window.navigator.language.toLowerCase().startsWith("ko") ? "ko" : "en";
    const nextLocale = savedLocale === "ko" || savedLocale === "en" ? savedLocale : browserLocale;
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      setLocale(nextLocale);
      setLocaleReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (window.location.hash === "" || window.location.hash === "#top") {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, []);

  useEffect(() => {
    if (!localeReady) return;
    document.documentElement.lang = locale;

    const revealItems = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [locale, localeReady]);

  const chooseLocale = (nextLocale: Locale) => {
    window.localStorage.setItem(localePreferenceKey, nextLocale);
    setLocale(nextLocale);
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <a className="skip-link" href="#main-content">{locale === "ko" ? "본문으로 건너뛰기" : "Skip to content"}</a>

      <div className={`site-shell locale-${locale}`}>
        <div className="ambient-grain" aria-hidden="true" />
        <header className="site-header">
          <a className="brand" href="#top" aria-label="Luthn home"><LuthnWordmark className="brand-wordmark" decorative /></a>

          <nav className="site-nav" aria-label={locale === "ko" ? "주요 메뉴" : "Main navigation"}>
            <a href="#top">{c.nav.sanctum}</a>
            <a href="#memory">{c.nav.memory}</a>
            <a href="#features">{c.nav.features}</a>
            <a href="#roadmap">{c.nav.roadmap}</a>
          </nav>

          <div className="header-actions">
            <div className="language-switcher" aria-label={c.languageLabel} role="group">
              <button className={locale === "ko" ? "language-active" : ""} type="button" onClick={() => chooseLocale("ko")} aria-pressed={locale === "ko"}>KO</button>
              <span aria-hidden="true">/</span>
              <button className={locale === "en" ? "language-active" : ""} type="button" onClick={() => chooseLocale("en")} aria-pressed={locale === "en"}>EN</button>
            </div>
            <a className="github-icon-button" href={githubUrl} target="_blank" rel="noreferrer" aria-label={c.githubLabel} title={c.githubLabel}><GitHubIcon size={19} /></a>
          </div>
        </header>

        <main id="main-content">
          <section className="hero hero-full" id="top" aria-labelledby="hero-title">
            <div className="hero-backdrop" aria-hidden="true" />
            <div className="hero-content">
              <div className="hero-copy reveal reveal-delay-1">
                <h1 id="hero-title"><span className="hero-line">{c.hero.titleBefore}</span><br /><span className="hero-line accent-text">{c.hero.titleAccent}</span></h1>
              </div>
            </div>
          </section>

          <section className="boundary-strip" aria-label={locale === "ko" ? "Luthn 보호 원칙" : "Luthn protection principles"}>
            {c.strip.map(([label, detail], index) => <div className={`reveal reveal-delay-${index + 1}`} key={label}><span className="strip-kicker">{label}</span><strong>{detail}</strong></div>)}
          </section>

          <section className="section-pad memory-section" id="memory" aria-labelledby="memory-title">
            <div className="section-intro reveal"><p className="section-index">{c.memory.index}</p><h2 id="memory-title">{c.memory.titleOne}<br /><span>{c.memory.titleTwo}</span></h2><p>{c.memory.body}</p></div>
            <MemoryStage locale={locale} memory={c.memory} />
            <div className="connector-rail reveal" aria-labelledby="connector-title">
              <div className="connector-intro">
                <p className="section-index">{c.connectors.index}</p>
                <h3 id="connector-title">{c.connectors.titleOne}<br /><span>{c.connectors.titleTwo}</span></h3>
                <p>{c.connectors.body}</p>
              </div>
              <div className="connector-list">
                {c.connectors.items.map(([type, title, body], index) => <article className={`connector-card reveal reveal-delay-${index + 1}`} key={type}><div className="connector-card-top"><span className="connector-number">0{index + 1}</span><span className={`connector-glyph connector-glyph-${index + 1}`} aria-hidden="true"><i /><i /><i /></span></div><p className="connector-type">{type}</p><h4>{title}</h4><p>{body}</p></article>)}
              </div>
            </div>
          </section>

          <section className="section-pad features-section" id="features" aria-labelledby="features-title">
            <div className="section-heading-row reveal"><div><p className="section-index">{c.features.index}</p><h2 id="features-title">{c.features.titleOne}<br /><span>{c.features.titleTwo}</span></h2></div><p className="heading-aside">{c.features.asideOne}<br /><span>{c.features.asideTwo}</span></p></div>
            <div className="feature-grid">
              {c.features.items.map(([eyebrow, title, body], index) => <article className={`feature-card reveal reveal-delay-${(index % 4) + 1}`} key={eyebrow}><div className="feature-topline"><span>0{index + 1}</span><span className="feature-arrow" aria-hidden="true">↗</span></div><FeatureVisual index={index} /><p className="feature-eyebrow">{eyebrow}</p><h3>{title}</h3><p>{body}</p></article>)}
            </div>
          </section>

          <section className="section-pad roadmap-section" id="roadmap" aria-labelledby="roadmap-title">
            <div className="section-heading-row roadmap-heading reveal"><div><p className="section-index">{c.roadmap.index}</p><h2 id="roadmap-title">{c.roadmap.titleOne}<br /><span>{c.roadmap.titleTwo}</span></h2></div></div>
            <div className="roadmap-grid">
              {[c.roadmap.oss, c.roadmap.cloud, c.roadmap.ontology].map(([tag, title, body, tail], index) => <article className={`roadmap-card roadmap-card-${index + 1} reveal reveal-delay-${index + 1}`} key={title}><div className="roadmap-card-head"><span className="roadmap-tag">{tag}</span><span>0{index + 1}</span></div><div className="roadmap-card-mark" aria-hidden="true">{index === 0 ? "◈" : index === 1 ? "◎" : "⊙"}</div><h3>{title}</h3><p>{body}</p><span className="coming-soon">{tail}</span></article>)}
            </div>
          </section>

          <section className="faq-section section-pad" aria-labelledby="faq-title"><div className="faq-intro reveal"><p className="section-index">{c.faq.index}</p><h2 id="faq-title">{c.faq.titleOne}<br /><span>{c.faq.titleTwo}</span></h2></div><div className="faq-list reveal">{c.faq.items.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

          <section className="final-cta section-pad" aria-labelledby="cta-title"><p className="section-index reveal">{c.cta.index}</p><h2 id="cta-title" className="reveal reveal-delay-1">{c.cta.titleOne}<br /><em>{c.cta.titleTwo}</em></h2><p className="reveal reveal-delay-2">{c.cta.body}</p><a className="cta-button reveal reveal-delay-3" href={githubUrl} target="_blank" rel="noreferrer"><GitHubIcon size={18} />{c.cta.button}<span aria-hidden="true">↗</span></a></section>
        </main>

        <footer className="site-footer"><div className="footer-brand"><LuthnWordmark className="footer-wordmark" /></div><p>{c.footer}</p><div className="footer-contact"><span>awes</span><a href="mailto:jakob@awes.it.kr">jakob@awes.it.kr</a></div></footer>
      </div>
    </>
  );
}
