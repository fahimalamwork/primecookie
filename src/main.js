import { initScene } from "./scene.js";

// Waitlist: GitHub Pages is static, so submissions go to a free form service.
// Create a form at https://formspree.io (free tier) and paste its endpoint here,
// e.g. "https://formspree.io/f/abcdwxyz". Left empty, the form falls back to email.
const FORM_ENDPOINT = "";
const FALLBACK_EMAIL = "hello@primecookie.com";

const NOMS = ["nom!", "crunch!", "mmm…", "one more?", "chomp!", "worth it", "pree-may!", "LGTM 🍪"];

function nomBubble(x, y) {
  const el = document.createElement("span");
  el.className = "nom";
  el.textContent = NOMS[Math.floor(Math.random() * NOMS.length)];
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.setProperty("--rot", `${(Math.random() - 0.5) * 24}deg`);
  document.body.appendChild(el);
  el.addEventListener("animationend", () => el.remove());
}

const canvas = document.getElementById("scene");
let scene;
try {
  scene = initScene(canvas);
} catch (err) {
  console.warn("WebGL unavailable, skipping 3D scene", err);
  canvas.remove();
}

// Hero art: tilt toward the pointer, take a "bite" on click
const heroArt = document.getElementById("heroArt");
heroArt.addEventListener("click", (e) => {
  scene?.burstAt(e.clientX, e.clientY);
  nomBubble(e.clientX, e.clientY);
  heroArt.classList.remove("chomp");
  void heroArt.offsetWidth; // restart the animation
  heroArt.classList.add("chomp");
});

// Nav background once scrolled
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Reveal on scroll, with a little stagger for siblings
const io = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const siblings = [...entry.target.parentElement.querySelectorAll(":scope > .reveal")];
      entry.target.style.transitionDelay = `${Math.max(0, siblings.indexOf(entry.target)) * 80}ms`;
      entry.target.classList.add("in");
      io.unobserve(entry.target);
    }
  },
  { threshold: 0.15 },
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// 3D tilt on menu cards
const finePointer = window.matchMedia("(pointer: fine)").matches;
if (finePointer) {
  heroArt.addEventListener("pointermove", (e) => {
    const r = heroArt.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    heroArt.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
  });
  heroArt.addEventListener("pointerleave", () => (heroArt.style.transform = ""));
}
if (finePointer) document.querySelectorAll(".tilt").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
  });
  card.addEventListener("pointerleave", () => (card.style.transform = ""));
});

// Flavor chips: tap to toggle the preview on touch screens (hover/focus handles desktop)
const flavorChips = document.querySelectorAll(".flavors li");
flavorChips.forEach((li) =>
  li.addEventListener("click", (e) => {
    e.stopPropagation();
    const wasOpen = li.classList.contains("open");
    flavorChips.forEach((x) => x.classList.remove("open"));
    li.classList.toggle("open", !wasOpen);
    document.body.classList.toggle("flavor-open", !wasOpen); // the cookie banner steps aside on phones
  }),
);
document.addEventListener("click", () => {
  flavorChips.forEach((x) => x.classList.remove("open"));
  document.body.classList.remove("flavor-open");
});

// "Say it" pronunciation button
const sayIt = document.getElementById("sayIt");
sayIt.addEventListener("click", () => {
  if (!("speechSynthesis" in window)) return;
  const u = new SpeechSynthesisUtterance("Pree may cookie");
  u.rate = 0.85;
  u.onstart = () => sayIt.classList.add("speaking");
  u.onend = () => sayIt.classList.remove("speaking");
  speechSynthesis.cancel();
  speechSynthesis.speak(u);
});

// Story video: only show it once the AI clip actually exists
const video = document.getElementById("storyVideo");
video.querySelector("source").addEventListener("error", () => video.remove());
if (video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) video.remove();

// Waitlist form
const form = document.getElementById("waitlist");
const msg = document.getElementById("formMsg");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  if (!FORM_ENDPOINT) {
    const body = encodeURIComponent(`Add me to the Prime Cookie list!\nEmail: ${data.get("email")}\nMost excited for: ${data.get("favorite")}`);
    window.location.href = `mailto:${FALLBACK_EMAIL}?subject=Prime%20Cookie%20waitlist&body=${body}`;
    return;
  }
  msg.textContent = "Mixing the dough…";
  try {
    const res = await fetch(FORM_ENDPOINT, { method: "POST", body: data, headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(res.statusText);
    form.reset();
    msg.textContent = "You’re on the list! Fresh cookies incoming. 🍪";
  } catch {
    msg.textContent = "Oops — the oven hiccuped. Try again in a sec?";
  }
});

// "This site uses cookies" banner. Rejecting is, of course, not really an option.
const consent = document.getElementById("consent");
const reject = document.getElementById("consentReject");
const REJECT_LINES = ["Reject", "Are you sure?", "Really?", "Nice try 🍪", "Error 418: I'm a cookie"];
let rejects = 0;
let consentSeen = false;
try {
  consentSeen = localStorage.getItem("primeConsent") === "yes";
} catch {}
// Wait until they've seen the hero: show after some scrolling, or after a while
if (!consentSeen) {
  const show = () => {
    consent.hidden = false;
    window.removeEventListener("scroll", onFirstScroll);
    clearTimeout(timer);
  };
  const onFirstScroll = () => window.scrollY > window.innerHeight * 0.5 && show();
  const timer = setTimeout(show, 8000);
  window.addEventListener("scroll", onFirstScroll, { passive: true });
}

const dodge = () => {
  rejects = Math.min(rejects + 1, REJECT_LINES.length - 1);
  reject.textContent = REJECT_LINES[rejects];
  reject.style.transform = `translate(${(Math.random() - 0.5) * 60}px, ${-Math.random() * 30}px)`;
};
if (finePointer) reject.addEventListener("pointerenter", dodge);
reject.addEventListener("click", dodge);
document.getElementById("consentAccept").addEventListener("click", (e) => {
  try {
    localStorage.setItem("primeConsent", "yes");
  } catch {}
  scene?.burstAt(e.clientX, e.clientY, 30);
  consent.hidden = true;
});

document.getElementById("year").textContent = new Date().getFullYear();
