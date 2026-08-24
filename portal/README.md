# kyznk.dev

Single page. Black background, white links, an animated gradient mesh behind a
centred column. Static output, no client-side JavaScript, no third-party
requests. The whole site is ~5 KB.

## Local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview  # serve dist/ as it will actually ship
```

Node 22.12+ (Astro 7). `.nvmrc` pins it.

## Adding a link

Edit the `links` array at the top of `src/pages/index.astro`. That array is the
entire content of the site; order in the array is order on the page.

```ts
const links = [
  { label: 'github', href: 'https://github.com/umkyzn' },
];
```

## Files

| File | What it is |
| --- | --- |
| `src/pages/index.astro` | The whole page — content, markup, `<head>`. |
| `src/styles/global.css` | Everything visual, including the mesh. |
| `public/_headers` | Security + caching headers, read by Cloudflare Pages. |
| `astro.config.mjs` | `site` (canonical URL) and the no-inline-CSS build flag. |

### The background

Four large radial gradients (`.blob-1`–`.blob-4`) drift on long, offset
`transform` loops, over a vignette that keeps contrast under the links, under a
grain layer that stops the gradients banding on 8-bit displays. Brightness is the
`rgba(255, 255, 255, …)` alpha on each `.blob-*`; pace is the `animation`
durations. Motion is disabled under `prefers-reduced-motion`, and the whole
decoration is hidden under `prefers-contrast: more`.

## Deploy (Cloudflare Pages)

`package.json` is in `portal/`, not at the repo root, so the build needs a root
directory set.

1. Push to GitHub.
2. Cloudflare → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Build settings — framework preset **Astro**, build command `npm run build`,
   output directory `dist`, **root directory `portal`**.
4. **Custom domains** → add `kyznk.dev` and `www.kyznk.dev`.

Pushes to `main` deploy to production; other branches get preview URLs.

### Headers

`public/_headers` ships a strict `Content-Security-Policy` — `default-src 'self'`
with no `unsafe-inline`. It holds only because `astro.config.mjs` sets
`build.inlineStylesheets: 'never'` (so CSS is always an external file) and the
page emits no `<script>` at all.

Adding a client script, an embed, an analytics tag, or an external webfont **will
be blocked** until the matching directive is widened. That is intended.

`Strict-Transport-Security` deliberately omits `includeSubDomains`, so a future
subdomain can't be locked out before it has a certificate.

## Changing the domain

`site` in `astro.config.mjs` is the only place the domain appears — it drives the
canonical and `og:url` tags. Change it there, then swap the custom domain in the
Cloudflare Pages project.
