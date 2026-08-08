import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
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

test("server-renders the Luthn landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Luthn — Safe memory for AI agents<\/title>/i);
  assert.match(html, /Keep memory in Luthn\./);
  assert.match(html, /class="hero hero-full"/);
  assert.match(html, /brand\/luthn-wordmark-white\.svg/);
  assert.match(html, /class="memory-stage/);
  assert.match(html, /class="memory-field-art/);
  assert.match(html, /class="memory-overlay/);
  assert.match(html, /Sensitive records/);
  assert.doesNotMatch(html, /Raw stays here\.|Safe memory moves\.|LOCAL VAULT|AGENT CONTEXT/);
  assert.doesNotMatch(html, /class="boundary-compare|>BOUNDARY</);
  assert.doesNotMatch(html, /Begin inside your own boundary\.|Open the next layer when ready\./);
  assert.doesNotMatch(html, /memory-diagram/);
  assert.match(html, /CONNECTORS \/ DATA INTAKE/);
  assert.match(html, /MESSENGER/);
  assert.match(html, /DOCUMENT/);
  assert.match(html, /MAIL/);
  assert.match(html, /id="features"/);
  assert.match(html, /id="roadmap"/);
  assert.doesNotMatch(html, /cta-sanctum/);
  assert.match(html, /application\/ld\+json/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton|luthn-brand\.png/i);
});

test("keeps the finished page metadata and accessibility structure", async () => {
  const [page, layout, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /<a className="skip-link" href="#main-content">/);
  assert.match(page, /aria-label=\{label\}/);
  assert.match(page, /window\.scrollTo\(\{ top: 0, left: 0, behavior: "auto" \}\)/);
  assert.match(css, /prefers-reduced-motion/);
  assert.doesNotMatch(page, /hero-object-wrap/);
  assert.doesNotMatch(css, /hero-object-wrap|hero-object-aura/);
  assert.match(css, /luthn-sanctum-hero-redrawn\.png/);
  assert.match(css, /luthn-memory-field\.png/);
  assert.match(css, /memory-overlay/);
  assert.match(page, /IntersectionObserver/);
  assert.doesNotMatch(page, /CanvasWordmark|canvas-wordmark|useRef/);
  assert.match(layout, /Luthn — Safe memory for AI agents/);
  assert.match(layout, /<html lang="en">/);
  assert.match(page, /window\.navigator\.language/);
  assert.match(page, /luthn-locale-preference/);
  assert.doesNotMatch(layout, /codex-preview|Starter Project/);
});
