# Primé Cookie — Brand Brainstorm & AI Asset Prompts

## 1. The name

**Prime Cookie**, said *"pree-may."*

- **The hook:** in French, *primé* means **"award-winning."** So the name is a quiet brag, and it gives her a story to tell.
- **✅ Decided: it's spelled "Primé" everywhere people see it** (logo, site, packaging). With the accent, people say it right without being told. The domain and social handles stay plain `primecookie` because accents and URLs don't mix.
- **Use the mispronunciation.** People will say "prime" like Amazon Prime. Make it a running joke rather than fighting it:
  - "It's pree-may. But we'll still sell you cookies if you say it wrong."
  - A "Say it right, get a free cookie" day at launch.
  - The 🔊 "say it" button on the site (already built) plays the pronunciation.

### Tagline options
| Tagline | Vibe |
|---|---|
| **Cookies worth saying right.** | the one on the site; playful, confident |
| Award-winning, by definition. | clever, chic |
| Say it pree-may. Eat it immediately. | fun, used in the footer |
| Small batch. Big deal. | punchy |
| Baked to be primé. | French-café chic |
| Crispy edges. Soft center. Zero shortcuts. | about the product |

## 1b. The founder's personality is the brand

She's funny, witty and lovable, and she works in tech as a solutions engineer. Lean into it; that's what makes a bakery memorable. Already on the site:
- **Founder logic™** quotes, including her helmet theory: *"If you fall off your bike, always aim to land on your head. That's where the helmet is."*
- **A parody cookie-consent banner:** "This site uses cookies. Obviously." The Reject button runs away.
- Founder logic™ nutrition fact: *"Broken cookies have no calories. They all fall out."*
- Bite bubbles say things like "LGTM 🍪" and "worth it"

More ideas for later:
- Box sticker: a little gold award ribbon that says **"Primé"**, tying back to "award-winning"
- Receipt footer: *"Known issues: you'll want another one."*
- Holiday drop: **"Release Candidate"** limited flavor
- Merch: a tiny bike helmet sticker that says *"Aim for the head."*

## 2. Look & feel: "modern bakery chic"

**Palette** (already in `src/style.css`)
| Token | Hex | Use |
|---|---|---|
| Cream | `#F7EFE3` | background, the "paper" |
| Oat | `#EFE2CF` | section backgrounds |
| Cocoa | `#2E1B12` | text, buttons, the main dark |
| Caramel | `#C9803F` | accents, italic words |
| Butter | `#F2C66D` | highlights, the "say it" button |
| Strawberry | `#E8577E` | badges, small pops |

**Type:** *Fraunces* (a soft, high-contrast serif; the italic is gorgeous) for headings, with *DM Sans* for body text. Both are free Google Fonts.

**Logo idea:** "*Primé* C🍪okie", with the "o" as a little spinning cookie (already on the site). For packaging, a round sticker with *Primé* in italic script and a small award-ribbon shape, tying back to "award-winning."

**Packaging / IRL ideas:** kraft boxes with a cocoa-colored band, a butter-yellow sticker seal, and a "pronunciation card" in every box ("Hi, I'm Primé /pree·may/…"). Tissue paper printed with tiny cookies.

## 3. Menu naming ideas
- **The Primé**: signature brown-butter chocolate chip with flaky salt
- **Swirl Royale**: cinnamon roll
- **Bananas Foster Loaf**: banana bread
- **Golden Hour Pound Cake**: pound cake
- Flavors on the site: Strawberry White Chocolate, Banana Pudding, Butter Pecan, Carrot Cake
- Bundles: **"The Primé Box"** (6), **"Award Ceremony"** (12, a mixed box), **"Crumb of the Month"** subscription

## 4. Website features to add later
- Online pre-orders (Square Online, Shopify Buy Button or Stripe Payment Links all embed into a static GitHub Pages site)
- Instagram feed section
- "Find us" pop-up / farmers-market calendar
- Gift boxes & custom-order inquiry form
- Bite-the-cookie counter (bite the hero cookie 10 times, unlock a discount code)

---

## 5a. ⭐ Hero image (replaces the 3D cookie)

Save as **`images/hero.jpg`**, **1:1 square, at least 1200×1200**. It sits on the right side of the hero (above the headline on phones). The site fades its edges into the page, so **the background must be plain cream (#F7EFE3)** with the subject centered and some breathing room around it.

**Option A: "The Primé" hero cookie (chic, product-first)**
> A single thick, bakery-style brown butter chocolate chip cookie photographed from directly above, perfectly centered, with crackly golden-brown edges and glossy molten pools of dark chocolate. Flaky sea salt sparkles on top. One small bite taken out of the right edge, with a few crumbs and a couple of chocolate shards scattered artfully nearby. Plain seamless solid cream background, hex #F7EFE3, no props, no plate, no table texture. Soft, warm, diffused studio light with a gentle natural shadow. Ultra-detailed editorial food photography, minimal, modern, luxurious. Square 1:1, the subject filling about 65% of the frame and centered with even empty space all around. No text, no logos.

**Option B: "Safety first" helmet cookie (fun, her helmet logic)**
> A thick, golden chocolate chip cookie standing upright on its edge, wearing a tiny glossy butter-yellow bicycle helmet with its strap neatly buckled, photographed straight on and centered. One bite missing from the side, a few crumbs on the ground. Plain seamless solid cream background, hex #F7EFE3. Soft warm studio light, gentle shadow, hyper-realistic miniature product photography with a playful, witty, chic mood. Not cartoonish. Square 1:1, the subject centered with generous empty space around it. No text, no logos.

**Option C: "Award-winning" cookie stack (nod to primé = award-winning)**
> A tall stack of five thick chocolate chip cookies, perfectly centered. The top cookie is broken in half, with gooey melted chocolate stretching between the halves. A small gold award-ribbon rosette leans against the side of the stack. Floating crumbs frozen mid-air. Plain seamless solid cream background, hex #F7EFE3. Warm soft studio lighting, editorial food photography, modern and chic. Square 1:1, centered, with even empty space all around. No text.

**Nano Banana tips for the hero:**
- If the background comes out off-white or gray, follow up with: *"Change the background to a perfectly flat, solid cream color #F7EFE3, keep everything else exactly the same."*
- If the subject is off-center: *"Recenter the cookie and leave equal empty space on all sides."*
- Want a cutout instead? Ask for *"the same image on a pure white background,"* remove the background with a free tool (e.g. remove.bg), and save it as `hero.png`. Then change `hero.jpg` to `hero.png` in `index.html` and delete the `mask-image` lines in `.hero-art img` in `src/style.css`.

✅ **Done:** the helmet cookie (Option B) is live as the hero. The original is in `art/originals/hero-helmet-cookie.jpg`; the link preview and phone icon were made from it too.

## 5b. Flavor previews (1:1 square, `images/flavor-*.jpg`)

These show when someone hovers over or taps a flavor chip. Use one prompt and swap in [COOKIE]:
> A single thick bakery-style [COOKIE] photographed from directly above, centered, on a plain seamless cream background (#F7EFE3). Soft warm studio light, gentle shadow, editorial food photography, minimal and chic. Square 1:1. No text.

| File | [COOKIE] |
|---|---|
| `flavor-strawberry-white-chocolate.jpg` | pink-tinged strawberry cookie studded with creamy white chocolate chunks and bits of freeze-dried strawberry, a halved fresh strawberry beside it |
| `flavor-banana-pudding.jpg` | soft banana pudding cookie with crushed vanilla wafer pieces pressed on top, a creamy pudding-like center, and a few banana slices and a vanilla wafer beside it |
| `flavor-butter-pecan.jpg` | golden brown-butter cookie loaded with toasted pecan halves, with glossy caramelized edges and a few whole pecans beside it |
| `flavor-carrot-cake.jpg` | spiced carrot cake cookie flecked with shredded carrot, topped with a swirl of cream cheese frosting and a sprinkle of chopped walnuts and cinnamon |

Tip: attach the hero photo and add *"Match the lighting and background color of this image"* so they all look like one set.

## 5c. Founder logic™ card art (1:1, `images/logic-*.png`)

> Minimal flat sticker illustration, cocoa brown line art with butter-yellow and caramel accents on a plain cream background (#F7EFE3), witty and chic, clean lines. Square. No text. [SCENE]

| File | [SCENE] |
|---|---|
| `logic-helmet.png` | a cookie in a tiny bike helmet confidently diving head-first, little motion lines behind it |
| `logic-broken.png` | a cookie snapped in half with tiny cartoon calorie numbers tumbling out of the break like crumbs |
| `logic-solution.png` | a laptop with a cookie on the screen where a chart would be, and a coffee mug beside it |

## 5d. Link preview & phone icon (optional upgrades)

Both were made from the hero photo, so they're done. If you want dedicated versions:
- **`og-image.jpg` (1200×630):** *Wide editorial food photo: three thick chocolate chip cookies arranged on the right third of the frame, the front one with a bite missing and a tiny butter-yellow bike helmet resting beside it. Lots of plain empty cream background (#F7EFE3) on the left two-thirds for text. Warm soft studio light, minimal, chic. No text.* Then run it through `tools/og-maker.html` to add the lettering.
- **`apple-touch-icon.png` (180×180):** *App icon: a single chocolate chip cookie wearing a tiny glossy butter-yellow bike helmet, centered, on a solid cocoa-brown (#2E1B12) background, soft 3D clay render, cute but chic, no text.*

## 5. Nano Banana image prompts (rest of the site)

Save each image with the **exact filename** shown, into `images/`. The site picks them up automatically, and until a file exists the site shows a styled placeholder.

Tips for Nano Banana:
- Generate several and pick the best. Then **edit conversationally** ("make the chocolate meltier", "warmer light", "remove the spoon").
- To keep a consistent look, generate one hero shot first, then give it back as a reference image for every other shot: *"Same lighting, background and style as this image, but…"*
- Ask for the aspect ratio in the prompt. Card images are **4:5 portrait**.
- A shared style line to append to every prompt keeps them cohesive:
  > *Style: modern bakery editorial food photography, warm soft natural window light, cream (#F7EFE3) and caramel color palette, shallow depth of field, minimal and chic, high detail, no text, no logos.*

### Menu cards (4:5 portrait), filename → prompt

**`menu-classic.jpg`**
> Close-up of a thick, bakery-style brown butter chocolate chip cookie on a cream ceramic plate, crackly golden edges, glossy melted pools of dark chocolate, flakes of sea salt catching the light, a few crumbs scattered around. Shot from a 45° angle on a warm cream linen background. 4:5 portrait. [style line]

**`menu-cinnamon-roll.jpg`**
> A single giant, pillowy cinnamon roll with a visible spiral, thick cream-cheese icing melting down the sides, on a small cream plate. A light dusting of cinnamon on the table, a soft-focus cup of coffee in the background. 4:5 portrait, eye-level angle. [style line]

**`menu-banana-bread.jpg`**
> A loaf of banana bread with a crackly caramelized brown-sugar top and a halved banana baked on top, with two thick slices cut and leaning against the loaf showing a moist interior. On a wooden board on a cream backdrop. 4:5 portrait. [style line]

**`menu-pound-cake.jpg`**
> A slice of golden vanilla bean pound cake with a tight, buttery crumb and a slightly crisp golden crust, visible vanilla bean flecks, on a cream plate with a vintage fork, a light glaze drip. 4:5 portrait. [style line]

### Story section (4:5 portrait)

**`story-baker.jpg`** (also used as the video poster)
> Close-up of a woman's hands scooping cookie dough balls onto a parchment-lined baking sheet in a bright, modern home kitchen. Flour dust in the air catches the window light, a bowl of chocolate chunks nearby. Faceless, only hands and forearms, wearing a cream linen apron. 4:5 portrait. [style line]

> Tip: if your friend is OK with it, give Nano Banana a real photo of her hands or kitchen as a reference so it feels like *her*.

### Social & extras (not wired into the site yet)

**Instagram launch post (1:1)**
> Flat lay from directly above: a kraft bakery box opened to reveal six assorted cookies (chocolate chip, double chocolate, snickerdoodle, red velvet, oatmeal, matcha) arranged in a neat grid, a butter-yellow sticker seal on the lid, a sprig of dried flowers, on a cream background. 1:1 square. [style line]

**Hero background / OG share image (16:9)**
> A dramatic stack of five thick chocolate chip cookies, the top one broken in half with gooey melted chocolate stretching between the halves, crumbs falling mid-air, on a cream background with lots of empty space on the left side for text. 16:9 landscape. [style line]

**Pattern / packaging tile**
> Seamless repeating pattern of tiny hand-drawn cookies, cinnamon rolls, banana slices and little award ribbons, in cocoa brown line art on a cream background, minimal, chic, flat illustration. Square tile.

**Sticker / logo exploration**
> A round sticker logo for a boutique bakery called "Primé Cookie" (with an accent on the e): elegant italic serif script with a small cookie forming the letter "o", a subtle award-ribbon shape, cocoa brown on butter yellow, flat vector style, clean, modern, on a white background.
> (AI tools often misspell text. Use these for ideas, then have the final logo set in real type.)

**Mascot (optional, fun)**
> A cute, minimal 3D cookie character with chocolate chip eyes and a tiny bite missing, wearing a little gold award medal and a tiny butter-yellow bike helmet, soft clay-render style, cream background, playful and chic, not childish.

**"Founder logic" illustration (for Instagram, 4:5)**
> Minimal flat editorial illustration: a stylish woman in a cream sweater mid-fall off a vintage bicycle, calmly diving head-first in a glossy butter-yellow helmet, holding a cookie box perfectly safe in her outstretched hands. Cocoa brown, caramel and butter-yellow palette on a cream background, witty New Yorker-cartoon energy, clean lines. 4:5 portrait. No text.

---

## 6. AI video prompts

Put the main clip at `video/story.mp4` (it plays muted and looping in the Story section). Keep it **5–10 seconds, under ~8 MB, 4:5 or 9:16**, and design it to loop seamlessly. The best way: start from one of the Nano Banana stills above and animate it (image-to-video) with whichever video model you use (e.g. Veo).

**`story.mp4`: dough to cookie**
> Slow-motion macro shot: hands gently press a ball of cookie dough studded with chocolate chunks onto parchment, then a pinch of flaky sea salt falls onto it in slow motion. Warm window light, cream tones, shallow depth of field. Smooth, calm camera push-in. Seamless loop.

**Cookie break (great for Instagram Reels)**
> Extreme close-up slow-motion: two hands break a warm chocolate chip cookie in half, gooey melted chocolate stretches between the halves, steam rises gently, crumbs fall. Cream background, warm backlight. 9:16 vertical.

**Cinnamon roll icing pour**
> Slow-motion: thick cream-cheese icing is poured from a small cream jug over a warm cinnamon roll, slowly melting into the spiral. Macro lens, soft warm light, cream background. 9:16 vertical.

**Oven reveal**
> POV opening a warm oven: a tray of golden cookies is revealed, gently puffed and glistening, with warm orange oven glow and a soft heat shimmer. Cinematic, cozy. 16:9.

**Pronunciation reel (fun)**
> A cookie character with chocolate-chip eyes turns to the camera and the caption reads "it's PREE-MAY" (add the caption in editing, not with AI). Playful clay-animation style, cream background.

---

## 7. A note on AI photos

AI images are great for the **launch, mood and social posts**. For the **menu**, plan to swap in real photos of her actual bakes once she's selling (a phone, a window and a cream backdrop are enough). Customers love "what you see is what you get," and food sites can get called out for AI product shots.
