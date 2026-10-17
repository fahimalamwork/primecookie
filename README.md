# 🍪 Primé Cookie

*Say it "pree-may."* The website for Primé Cookie, a small-batch cookie & bakery business.

A static site built with [Vite](https://vite.dev) and [three.js](https://threejs.org):
- A Nano Banana hero image (`public/images/hero.jpg`) that tilts toward the cursor. **Click/tap it to take a bite**, and three.js crumbs burst out.
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

Drop files into `public/` with these names (prompts for each are in `docs/BRAND.md`):

| File | Where it shows |
|---|---|
| `public/images/hero.jpg` | Main hero image (square) |
| `public/images/menu-classic.jpg` | Menu card: The Primé |
| `public/images/menu-cinnamon-roll.jpg` | Menu card: Swirl Royale |
| `public/images/menu-banana-bread.jpg` | Menu card: Bananas Foster Loaf |
| `public/images/menu-pound-cake.jpg` | Menu card: Golden Hour Pound Cake |
| `public/images/story-baker.jpg` | Story section photo / video poster |
| `public/video/story.mp4` | Story section looping video (optional) |

Until a file exists, the site shows a styled placeholder. Compress images first (~1200px wide, under 300 KB; [squoosh.app](https://squoosh.app) is free).

## Deploy free on GitHub Pages

1. Push this repo to GitHub (it can be public on a free account).
2. In the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
3. Merge to `main` (or run the workflow by hand from the **Actions** tab). `.github/workflows/deploy.yml` builds and publishes the site.
4. The site goes live at `https://<your-username>.github.io/primecookie/`.

**Custom domain (later):** buy `primecookie.com` (or similar), add it under **Settings → Pages → Custom domain**, and point the DNS at GitHub as their docs describe. No code changes are needed because the build uses relative paths.

## Waitlist form

GitHub Pages can't receive form posts, so the form uses a free service:
1. Create a free form at [formspree.io](https://formspree.io).
2. Paste its endpoint into `FORM_ENDPOINT` at the top of `src/main.js`.

Until then, submitting opens an email to `FALLBACK_EMAIL` (also in `src/main.js`). Change that to her real address.
