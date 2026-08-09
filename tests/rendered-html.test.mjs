import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/", origin = "http://localhost") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(new URL(path, `${origin}/`), { headers: { accept: "text/html" } }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the default Luthn landing page with SEO links", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Luthn — Safe Context for Agents<\/title>/i);
  assert.match(html, /Safe Context for Agents/);
  assert.match(html, /brand\/luthn-wordmark-white\.svg/);
  assert.match(html, /luthn-memory-atlas\.png/);
  assert.match(html, /SHARED MEMORY/);
  assert.match(html, /EXTERNAL SOURCES/);
  assert.match(html, /AUDIT/);
  assert.match(html, /VAULT/);
  assert.match(html, /contact@awes\.it\.kr/);
  assert.match(html, /EN<\/button>/);
  assert.match(html, /KR<\/button>/);
  assert.match(html, /rel="canonical" href="https:\/\/luthn\.com\/?"/);
  assert.match(html, /hrefLang="en" href="https:\/\/luthn\.com\/?"/);
  assert.match(html, /hrefLang="ko" href="https:\/\/luthn\.com\/ko"/);
  assert.match(html, /hrefLang="x-default" href="https:\/\/luthn\.com"/);
  assert.match(html, /"@type":"WebPage"/);
  assert.match(html, /"sameAs":\["https:\/\/github\.com\/JakobSung\/Luthn"\]/);
  assert.doesNotMatch(html, /principle-index|>01<|>02<|>03<|>04</);
  assert.doesNotMatch(html, /class="site-nav|Luthn \| Memory|THE MEMORY|CONNECTORS \/ DATA INTAKE|THE PROTECTIVE FIELD|THE PATH FORWARD|QUIET QUESTIONS/);
  assert.doesNotMatch(html, /class="boundary-strip|class="features-section|class="roadmap-section|class="faq-section|class="final-cta/);
  assert.match(html, /application\/ld\+json/);
});

test("renders locale routes with language-specific metadata and content", async () => {
  const [englishResponse, koreanResponse] = await Promise.all([render("/en"), render("/ko")]);
  assert.equal(englishResponse.status, 200);
  assert.equal(koreanResponse.status, 200);

  const englishHtml = await englishResponse.text();
  const koreanHtml = await koreanResponse.text();
  assert.match(englishHtml, /<title>Luthn — Safe Context for Agents<\/title>/i);
  assert.match(englishHtml, /class="home-shell locale-en" lang="en"/);
  assert.match(englishHtml, /rel="canonical" href="https:\/\/luthn\.com\/?"/);
  assert.match(koreanHtml, /<title>Luthn — 에이전트를 위한 안전한 맥락<\/title>/i);
  assert.match(koreanHtml, /class="home-shell locale-ko" lang="ko"/);
  assert.match(koreanHtml, /여러 agent가 함께 공유하는 승인된 맥락입니다\./);
  assert.match(koreanHtml, /rel="canonical" href="https:\/\/luthn\.com\/ko"/);
});

test("exposes crawl endpoints for the canonical site", async () => {
  const [robotsResponse, sitemapResponse] = await Promise.all([render("/robots.txt"), render("/sitemap.xml")]);
  assert.equal(robotsResponse.status, 200);
  assert.equal(sitemapResponse.status, 200);

  const robots = await robotsResponse.text();
  const sitemap = await sitemapResponse.text();
  assert.match(robots, /Sitemap: https:\/\/luthn\.com\/sitemap\.xml/);
  assert.match(sitemap, /https:\/\/luthn\.com\/?/);
  assert.match(sitemap, /https:\/\/luthn\.com\/ko/);
  assert.doesNotMatch(sitemap, /https:\/\/luthn\.com\/en/);
});

test("redirects production aliases to the canonical apex English URL", async () => {
  const [wwwRoot, wwwKorean, englishAlias, httpRoot, naverVerification] = await Promise.all([
    render("/", "https://www.luthn.com"),
    render("/ko?source=www", "https://www.luthn.com"),
    render("/en", "https://luthn.com"),
    render("/", "http://luthn.com"),
    render("/naver1e03e282ab474010f792b7ec4ea23267.html", "http://luthn.com"),
  ]);

  assert.equal(wwwRoot.status, 308);
  assert.equal(wwwRoot.headers.get("location"), "https://luthn.com/");
  assert.equal(wwwKorean.status, 308);
  assert.equal(wwwKorean.headers.get("location"), "https://luthn.com/ko?source=www");
  assert.equal(englishAlias.status, 308);
  assert.equal(englishAlias.headers.get("location"), "https://luthn.com/");
  assert.equal(httpRoot.status, 308);
  assert.equal(httpRoot.headers.get("location"), "https://luthn.com/");
  assert.equal(naverVerification.status, 200);
  assert.equal(
    await naverVerification.text(),
    "naver-site-verification: naver1e03e282ab474010f792b7ec4ea23267.html",
  );
});

test("keeps metadata, locale routes, and responsive surface contracts", async () => {
  const [page, enPage, home, layout, config, robots, sitemap, css, worker, wrangler] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/en/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/home-page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/site-config.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/robots.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/sitemap.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../worker/index.ts", import.meta.url), "utf8"),
    readFile(new URL("../wrangler.jsonc", import.meta.url), "utf8"),
  ]);

  assert.match(page, /createLocaleMetadata\("en", "\/"\)/);
  assert.match(enPage, /createLocaleMetadata\("en", "\/"\)/);
  assert.match(enPage, /canonicalPath="\/"/);
  assert.match(home, /<a className="skip-link" href="#main-content">/);
  assert.match(home, /window\.location\.assign/);
  assert.match(home, /EN<\/button>/);
  assert.match(home, /KR<\/button>/);
  assert.match(home, /contact@awes\.it\.kr/);
  assert.doesNotMatch(home, /window\.localStorage|window\.navigator\.language/);
  assert.match(layout, /metadataBase: new URL\(siteUrl\)/);
  assert.match(layout, /languageAlternates/);
  assert.match(config, /en: siteUrl/);
  assert.match(config, /"x-default": siteUrl/);
  assert.match(home, /sameAs/);
  assert.match(robots, /sitemap\.xml/);
  assert.doesNotMatch(sitemap, /locales\.map/);
  assert.match(worker, /Response\.redirect/);
  assert.match(worker, /www\.\$\{canonicalHost\}/);
  assert.match(wrangler, /"run_worker_first"/);
  assert.match(css, /luthn-sanctum-hero-redrawn\.png/);
  assert.match(css, /background: #050a10/);
  assert.match(css, /justify-content: center/);
  assert.doesNotMatch(css, /transform: scale\(1\.1\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(css, /@keyframes/);
  assert.doesNotMatch(home, /IntersectionObserver|FeatureVisual|MemoryStage/);
});
