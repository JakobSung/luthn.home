# luthn.home

The Luthn landing page: a quiet, dark interface for safe context and shared
memory for AI agents.

This project is a standalone vinext application deployed to Cloudflare Workers.

## Local development

Requirements: Node.js `>=22.13.0`.

```bash
npm install
npm run dev
```

## Cloudflare Workers

Authenticate Wrangler once, then deploy the Worker configured in
`wrangler.jsonc`:

```bash
npx wrangler login
npm run deploy
```

The configured Worker name is `luthn-home`. Set a custom domain or route in
Cloudflare after the first deployment; no domain-specific values are stored in
this repository.

## Other commands

```bash
npm run build
npm run start
npm test
```

The `app/` directory contains the page and styling, `public/` contains the
visual assets, and `worker/` contains the Cloudflare Worker entry point.
