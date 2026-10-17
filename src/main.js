import "./style.css";
import { initScene } from "./scene.js";

// Waitlist: GitHub Pages is static, so submissions go to a free form service.
// Create a form at https://formspree.io (free tier) and paste its endpoint here,
// e.g. "https://formspree.io/f/abcdwxyz". Left empty, the form falls back to email.
const FORM_ENDPOINT = "";
const FALLBACK_EMAIL = "hello@primecookie.com";

const NOMS = ["nom!", "crunch!", "mmm…", "one more?", "chomp!", "so good", "pree-may!"];

function nomBubble(x, y, bites) {
  const el = document.createElement("span");
  el.className = "nom";
  el.textContent = bites >= 4 ? "baking another…" : NOMS[Math.floor(Math.random() * NOMS.length)];
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.setProperty("--rot", `${(Math.random() - 0.5) * 24}deg`);
  document.body.appendChild(el);
  el.addEventListener("animationend", () => el.remove());
}

const canvas = document.getElementById("scene");
try {
  initScene(canvas, { onNom: nomBubble });
} catch (err) {
  console.warn("WebGL unavailable, skipping 3D scene", err);
  canvas.remove();
  document.querySelector(".hint")?.remove();
}

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
if (finePointer) document.querySelectorAll(".tilt").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
  });
  card.addEventListener("pointerleave", () => (card.style.transform = ""));
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

document.getElementById("year").textContent = new Date().getFullYear();
