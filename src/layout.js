// Shared page chrome (header, mobile menu, footer, cookie banner) so every page stays in sync.
// Links are built from this file's own URL, so they work at /primecookie/ on GitHub Pages and at / locally.

const BASE = new URL("../", import.meta.url).href;
export const url = (path = "") => BASE + path;

const PAGES = [
  ["", "Home"],
  ["menu/", "Menu"],
  ["story/", "Story"],
  ["order/", "Order"],
];

const here = location.href.split(/[?#]/)[0].replace(/index\.html$/, "");
const current = (path) => (here === url(path) ? ' aria-current="page"' : "");

const logo = `
  <a href="${url()}" class="logo" aria-label="Primé Cookie home">
    <span class="logo-prime">Primé</span>
    <span class="logo-cookie">C<span class="logo-o" aria-hidden="true"></span><span class="sr-only">o</span>okie</span>
  </a>`;

const header = `
  <header class="nav">
    ${logo}
    <nav class="nav-links" aria-label="Main">
      <a href="${url("menu/")}"${current("menu/")}>Menu</a>
      <a href="${url("story/")}"${current("story/")}>Story</a>
      <a href="${url("order/")}" class="btn btn-small"${current("order/")}>Order</a>
    </nav>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="navPanel">
      <span aria-hidden="true"></span><span aria-hidden="true"></span>
      <span class="sr-only">Open menu</span>
    </button>
  </header>
  <div class="nav-panel" id="navPanel" hidden>
    ${PAGES.map(([path, label]) => `<a href="${url(path)}"${current(path)}>${label}</a>`).join("")}
    <p>Say it <em>pree-may</em>.</p>
  </div>`;

const footer = `
  <footer class="footer">
    <div class="footer-logo">Primé Cookie</div>
    <nav class="footer-links" aria-label="Footer">
      ${PAGES.map(([path, label]) => `<a href="${url(path)}">${label}</a>`).join("")}
    </nav>
    <p>Say it <em>pree-may</em>. Eat it immediately.</p>
    <p class="small">© ${new Date().getFullYear()} Primé Cookie · Baked with love &amp; a lot of butter</p>
  </footer>`;

const consent = `
  <div class="consent" id="consent" role="dialog" aria-label="Cookie notice" hidden>
    <p><b>This site uses cookies.</b> Obviously. Mostly chocolate chip.</p>
    <div class="consent-actions">
      <button class="btn btn-small" id="consentAccept" type="button">Accept all cookies</button>
      <button class="consent-reject" id="consentReject" type="button">Reject</button>
    </div>
  </div>`;

document.body.insertAdjacentHTML("afterbegin", `<canvas id="scene" aria-hidden="true"></canvas>${header}`);
document.body.insertAdjacentHTML("beforeend", footer + consent);

// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const panel = document.getElementById("navPanel");
toggle.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(open));
  toggle.querySelector(".sr-only").textContent = open ? "Close menu" : "Open menu";
  panel.hidden = !open;
  document.body.classList.toggle("menu-open", open);
});
