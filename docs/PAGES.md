# Primé Cookie — Pages & Copy Brainstorm

## Tone: subtle, not slapstick
She's funny, so the site should be too, quietly. A reader should smile, not roll their eyes.

- **One wink per section, max.** The headline or the closing line gets the joke, not both.
- **Put the joke last.** Say the useful thing first ("Several days in an airtight container"), then the wink ("They rarely get the chance").
- **Dry beats loud.** No exclamation marks, no puns stacked on puns, no emoji in body copy.
- **Facts stay plain.** Prices, allergens, pickup details and dates get zero jokes.

## Pages live now

| Page | URL | What's on it |
|---|---|---|
| Home | `/` | Helmet-cookie hero, menu preview, flavor chips, story teaser, waitlist |
| Menu | `/menu/` | Cookies (5), Bakes (3), Boxes (4 / 6 / 12), allergy note, waitlist |
| Story | `/story/` | Origin, "About the name" with the pronunciation button, How we bake (4 steps), Founder logic™ |
| Order | `/order/` | How ordering will work, waitlist, custom orders & events, FAQ |
| 404 | any bad link | "This page crumbled." |

The header, phone menu, footer and cookie banner are shared from `src/layout.js`, so a new page only needs its own `<main>`. Copy any page folder (e.g. `story/`) as a starting point.

### Lines currently on the site (for reference)
- Menu: *"Made in small batches, so favorites do sell out. Plan accordingly."*
- Bakes: *"For when a cookie isn't enough. It happens."*
- Butter Pecan: *"Simple, and not sorry about it."* · Carrot Cake: *"Technically a vegetable."*
- Boxes: The Sampler *"For the indecisive."* · The Primé Box *"Fits nicely on a passenger seat."* · The Party Box *"For sharing. In theory."*
- How we bake: *"It's most of the personality."* · *"What happens on the drive home is between you and the box."*
- Order: *"Enjoy. Ideally not all at once. No judgment if so."*
- FAQ: *"Pree-may… But we'll answer to anything if you're ordering."*
- 404: *"It may have been eaten. The rest of the site is still fresh."*

## ⚠️ Have her confirm before launch
These are placeholders written to sound right, not facts:
- **48-hour dough rest** and **"two chocolates"** in The Primé
- **Allergens:** "wheat, dairy, eggs and tree nuts"
- **Box sizes** 4 / 6 / 12, and Swirl Royale being **weekends only**
- **Pickup / local delivery** as the plan
- **Freshness:** "several days," and the freezing advice
- The email address `hello@primecookie.com` (set in `src/main.js`)

## Pages to add later (in rough order of usefulness)

1. **Gifting** — gift boxes with a handwritten note, holiday boxes, corporate/client gifting.
   *Line:* "Say thank you in a language everyone speaks."
2. **Pop-ups & Events** — a simple list of upcoming markets/pop-ups with dates and locations.
   *Line:* "Where to find us, before they're gone."
3. **Seasonal / Limited drops** — one rotating flavor per month or season, with a sign-up for drop alerts.
   *Line:* "Here for a good time, not a long time."
4. **Kind Words** — real customer quotes once she has them (never invent these).
   *Line:* "Unpaid reviews from people with crumbs on their shirts."
5. **Wholesale / Cafés** — for coffee shops that want to stock her cookies.
   *Line:* "Your coffee deserves a better sidekick."
6. **Journal** — occasional posts: behind the scenes, a recipe she's willing to share, new-flavor announcements. Good for search traffic.
7. **Contact** — once there's a pickup address, hours, Instagram and a contact form. Could fold into Order until then.

## Small touches worth adding
- **Instagram link** in the footer once the handle exists.
- **"Sold out" badge** on menu cards during drops: *"Sold out. Told you."*
- **Pre-order deadline** banner: *"Orders close Thursday at 8pm. The oven waits for no one."*
- **Order confirmation message** (after real ordering exists): *"Order received. Try to be patient. We know."*
- **Footer easter egg:** hovering the © line could show *"Calories not included."*
