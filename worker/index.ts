/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const naverVerificationPath = "/naver1e03e282ab474010f792b7ec4ea23267.html";
const naverVerificationContent = "naver-site-verification: naver1e03e282ab474010f792b7ec4ea23267.html";
const canonicalHost = "luthn.com";
const canonicalOrigin = `https://${canonicalHost}`;

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.hostname === canonicalHost && url.pathname === naverVerificationPath) {
      return new Response(naverVerificationContent, {
        headers: {
          "cache-control": "public, max-age=300",
          "content-type": "text/html; charset=utf-8",
        },
      });
    }

    const canonicalPath = url.pathname === "/en" || url.pathname === "/en/" ? "/" : url.pathname;
    const isCanonicalSiteHost = url.hostname === canonicalHost || url.hostname === `www.${canonicalHost}`;
    if (
      isCanonicalSiteHost &&
      (url.protocol !== "https:" || url.hostname !== canonicalHost || canonicalPath !== url.pathname)
    ) {
      return Response.redirect(`${canonicalOrigin}${canonicalPath}${url.search}`, 308);
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
