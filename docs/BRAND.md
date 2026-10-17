# Prime Cookie — Brand Brainstorm & AI Asset Prompts

## 1. The name

**Prime Cookie**, said *"pree-may."*

- **The hook:** in French, *primé* means **"award-winning."** So the name is a quiet brag, and it gives her a story to tell.
- **Think about spelling it "Primé" in the logo.** With the accent, people say it right without being told. The domain and social handles can stay plain `primecookie`.
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

**Logo idea:** "*Prime* C🍪okie", with the "o" as a little spinning cookie (already on the site). For packaging, a round sticker with *Primé* in italic script and a small award-ribbon shape, tying back to "award-winning."

**Packaging / IRL ideas:** kraft boxes with a cocoa-colored band, a butter-yellow sticker seal, and a "pronunciation card" in every box ("Hi, I'm Primé /pree·may/…"). Tissue paper printed with tiny cookies.

## 3. Menu naming ideas
- **The Prime**: signature brown-butter chocolate chip with flaky salt
- **Swirl Royale**: cinnamon roll
- **Bananas Foster Loaf**: banana bread
- **Golden Hour Pound Cake**: pound cake
- Rotating flavors: Double Chocolate Prime, Salted Toffee Crunch, Snickerdoodle Supreme, Oatmeal Brûlée, Red Velvet Cheesecake, Matcha White Chocolate
- Bundles: **"The Prime Box"** (6), **"Award Ceremony"** (12, a mixed box), **"Crumb of the Month"** subscription

## 4. Website features to add later
- Online pre-orders (Square Online, Shopify Buy Button or Stripe Payment Links all embed into a static GitHub Pages site)
- Instagram feed section
- "Find us" pop-up / farmers-market calendar
- Gift boxes & custom-order inquiry form
- Bite-the-cookie leaderboard (bite the 3D cookie, win a discount code)

---

## 5. Nano Banana image prompts

Save each image with the **exact filename** shown, into `public/images/`. The site picks them up automatically, and until a file exists the site shows a styled placeholder.

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
> A round sticker logo for a boutique bakery called "Primé Cookie": elegant italic serif script with a small cookie forming the letter "o", a subtle award-ribbon shape, cocoa brown on butter yellow, flat vector style, clean, modern, on a white background.
> (AI tools often misspell text. Use these for ideas, then have the final logo set in real type.)

**Mascot (optional, fun)**
> A cute, minimal 3D cookie character with chocolate chip eyes and a tiny bite missing, wearing a little gold award medal, soft clay-render style, cream background, playful and chic, not childish.

---

## 6. AI video prompts

Put the main clip at `public/video/story.mp4` (it plays muted and looping in the Story section). Keep it **5–10 seconds, under ~8 MB, 4:5 or 9:16**, and design it to loop seamlessly. The best way: start from one of the Nano Banana stills above and animate it (image-to-video) with whichever video model you use (e.g. Veo).

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
