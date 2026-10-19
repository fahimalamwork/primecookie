# 🍪 Primé Cookie

*Say it "pree-may."* The website for Primé Cookie, a small-batch cookie & bakery business.

A static site built with [Vite](https://vite.dev) and [three.js](https://threejs.org):
- A Nano Banana hero image (`images/hero.jpg`) that tilts toward the cursor. **Click/tap it to take a bite**, and three.js crumbs burst out.
- Drifting sugar/crumb particles in the background (three.js).
- A 🔊 "say it" pronunciation button, "Founder logic™" quotes, a parody cookie-consent banner (good luck clicking Reject), scroll reveals, tilt cards, a marquee and a waitlist form.
- Mobile-friendly, with support for `prefers-reduced-motion`.

Brand brainstorm + **Nano Banana image prompts & video prompts:** see [`docs/BRAND.md`](docs/BRAND.md).

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
```

## Add the AI photos & video

Drop files into `images/` (and `video/`) with these names (prompts for each are in `docs/BRAND.md`):

| File | Where it shows |
|---|---|
| `images/hero.jpg` | Main hero image (square) ✅ done |
| `images/og-image.jpg` | Link preview when the site is shared (1200×630) ✅ done |
| `images/apple-touch-icon.png` | Phone home-screen icon (180×180) ✅ done |
| `images/menu-classic.jpg` | Menu card: The Primé |
| `images/menu-cinnamon-roll.jpg` | Menu card: Swirl Royale |
| `images/menu-banana-bread.jpg` | Menu card: Bananas Foster Loaf |
| `images/menu-pound-cake.jpg` | Menu card: Golden Hour Pound Cake |
| `images/story-baker.jpg` | Story section photo / video poster |
| `video/story.mp4` | Story section looping video (optional) |
| `images/flavor-strawberry-white-chocolate.jpg` | Flavor preview: Strawberry White Chocolate (square) |
| `images/flavor-banana-pudding.jpg` | Flavor preview: Banana Pudding |
| `images/flavor-butter-pecan.jpg` | Flavor preview: Butter Pecan |
| `images/flavor-carrot-cake.jpg` | Flavor preview: Carrot Cake |
| `images/logic-helmet.png` | Founder logic card art: helmet |
| `images/logic-broken.png` | Founder logic card art: broken cookie |
| `images/logic-solution.png` | Founder logic card art: laptop |

Full-size originals (like the helmet cookie photo) live in `art/originals/`, which isn't deployed.

**Link preview with real lettering:** run `npm run dev`, open http://localhost:5173/tools/og-maker.html, pick a 1200×630 photo, and download. It adds "Primé Cookie" in the site's fonts, since AI images misspell text.

Until a file exists, the site shows a styled placeholder. Compress images first (~1200px wide, under 300 KB; [squoosh.app](https://squoosh.app) is free).

## Deploy free on GitHub Pages

The site runs straight from the repo files, with no build step needed:

1. In the repo, go to **Settings → Pages → Build and deployment**.
2. Set **Source: Deploy from a branch**, **Branch: `main`**, folder **`/ (root)`**, and click **Save**.
3. Every push to `main` goes live at `https://fahimalamwork.github.io/primecookie/` in about a minute.

`.nojekyll` tells GitHub to serve the files as-is. three.js loads from a CDN on the live site (see the import map in `index.html`); `npm run dev` / `npm run build` use the local copy.

**Custom domain (later):** buy `primecookie.com` (or similar), add it under **Settings → Pages → Custom domain**, and point the DNS at GitHub as their docs describe. No code changes are needed because the build uses relative paths.

## Waitlist form

GitHub Pages can't receive form posts, so the form uses a free service:
1. Create a free form at [formspree.io](https://formspree.io).
2. Paste its endpoint into `FORM_ENDPOINT` at the top of `src/main.js`.

Until then, submitting opens an email to `FALLBACK_EMAIL` (also in `src/main.js`). Change that to her real address.
