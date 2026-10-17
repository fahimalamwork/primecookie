import * as THREE from "three";
import { Cookie, Crumbs } from "./cookie.js";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const easeOutBack = (t) => 1 + 2.7 * Math.pow(t - 1, 3) + 1.7 * Math.pow(t - 1, 2);

export function initScene(canvas, { onNom } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  const isPhone = window.matchMedia("(pointer: coarse)").matches && window.innerWidth < 820;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isPhone ? 1.5 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 10);

  // Warm bakery lighting
  scene.add(new THREE.HemisphereLight("#fff4e0", "#8a5a3a", 1.4));
  const key = new THREE.DirectionalLight("#ffe2b8", 2.6);
  key.position.set(4, 6, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight("#ff9fb6", 1.2);
  rim.position.set(-6, -2, -3);
  scene.add(rim);

  const crumbs = new Crumbs();
  scene.add(crumbs.mesh);

  // Hero cookie
  const hero = new Cookie({ chips: 14, scale: 1.55 });
  hero.intro = reducedMotion ? 1 : 0;
  scene.add(hero.group);

  // Floating background cookies scattered down the whole page
  const floaters = [];
  for (let i = 0, n = isPhone ? 9 : 14; i < n; i++) {
    const c = new Cookie({ chips: 7, scale: 0.35 + Math.random() * 0.35 });
    c.seed = Math.random() * 100;
    c.depth = -1 - Math.random() * 7;
    c.side = i % 2 ? 1 : -1;
    c.speed = 0.2 + Math.random() * 0.5;
    c.intro = reducedMotion ? 1 : -i * 0.08;
    c.pop = 0;
    c.group.rotation.set(Math.random() * 6, Math.random() * 6, 0);
    scene.add(c.group);
    floaters.push(c);
  }

  const pointer = new THREE.Vector2(0, 0);
  const smoothPointer = new THREE.Vector2(0, 0);
  const raycaster = new THREE.Raycaster();
  let viewH = 6.3; // world units per viewport at z=0, set on resize
  let pageVh = 5;
  let heroSpinBoost = 0;
  let regrow = 0;

  function layout() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    viewH = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const viewW = viewH * camera.aspect;
    pageVh = document.documentElement.scrollHeight / h;

    const mobile = w < 820;
    const pxToWorld = viewH / h;
    // Mobile: cookie sits in the space above the headline (the hero pads its copy down to make room)
    hero.home = mobile ? new THREE.Vector3(0, viewH / 2 - 220 * pxToWorld, 0) : new THREE.Vector3(viewW * 0.22, 0, 0);
    hero.homeScale = mobile ? Math.min(140 * pxToWorld, viewW * 0.36) : Math.min(1.75, viewW * 0.14);

    floaters.forEach((c, i) => {
      // Keep floaters toward the edges so they never sit under body copy
      const spread = (viewW / 2) * (1 - c.depth / camera.position.z);
      c.home = new THREE.Vector3(
        c.side * spread * (0.95 + ((i * 37) % 20) / 100),
        viewH * 0.3 - (i / floaters.length) * viewH * (pageVh - 0.6),
        c.depth,
      );
    });
  }
  layout();
  window.addEventListener("resize", layout);
  new ResizeObserver(layout).observe(document.body);

  window.addEventListener("pointermove", (e) => {
    pointer.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    canvas.style.cursor = pick(pointer) ? "pointer" : "";
  });

  function pick(ndc) {
    raycaster.setFromCamera(ndc, camera);
    const objs = [hero, ...floaters].flatMap((c) => c.pickables);
    const hit = raycaster.intersectObjects(objs, false)[0];
    return hit ? { hit, cookie: hit.object.userData.cookie } : null;
  }

  // Clicks pass through the (pointer-events: none) page onto the canvas
  window.addEventListener("click", (e) => {
    if (e.target.closest("a, button, input, select, form, .card")) return;
    const ndc = new THREE.Vector2((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
    const res = pick(ndc);
    if (!res) return;
    const { cookie, hit } = res;

    if (cookie === hero) {
      if (regrow > 0) return;
      const local = hero.mesh.worldToLocal(hit.point.clone());
      const edge = hero.bite(local);
      crumbs.burst(hero.mesh.localToWorld(edge), 45, 1);
      heroSpinBoost = 6;
      onNom?.(e.clientX, e.clientY, hero.bites);
      if (hero.bites >= 4) regrow = 1; // all gone — bake a fresh one
    } else {
      cookie.pop = 1;
      crumbs.burst(hit.point, 22, 0.6);
      onNom?.(e.clientX, e.clientY, 0);
    }
  });

  const timer = new THREE.Timer();
  function tick(now) {
    timer.update(now);
    const dt = Math.min(timer.getDelta(), 0.05);
    const t = timer.getElapsed();
    const motion = reducedMotion ? 0.15 : 1;

    smoothPointer.lerp(pointer, 0.06);
    camera.position.y = -(window.scrollY / window.innerHeight) * viewH;
    camera.position.x = smoothPointer.x * 0.25 * motion;
    camera.lookAt(camera.position.x * 0.5, camera.position.y, 0);

    // Hero: drop in, follow the pointer, spin, regrow after it's eaten
    hero.intro = Math.min(1, hero.intro + dt * 0.8);
    const drop = easeOutBack(hero.intro);
    let s = hero.homeScale * Math.max(0, drop);
    if (regrow > 0) {
      regrow -= dt * 0.9;
      const k = regrow > 0.5 ? (regrow - 0.5) * 2 : 1 - regrow * 2; // shrink, then grow
      if (regrow <= 0.5 && hero.bites) hero.build();
      s *= easeOutBack(Math.max(0, Math.min(1, k)));
      if (regrow <= 0) regrow = 0;
    }
    hero.group.scale.setScalar(Math.max(0.0001, s));
    hero.group.position.set(
      hero.home.x,
      hero.home.y + (1 - drop) * 6 + Math.sin(t * 1.2) * 0.08 * motion,
      hero.home.z,
    );
    hero.group.rotation.x = 1.05 - smoothPointer.y * 0.35 * motion;
    hero.group.rotation.z = -0.25 + smoothPointer.x * 0.3 * motion;
    heroSpinBoost *= 0.94;
    hero.spin.rotation.y += dt * (0.25 * motion + heroSpinBoost) + (1 - drop) * dt * 8;

    // Floaters: bob, tumble, pop when clicked
    for (const c of floaters) {
      c.intro = Math.min(1, c.intro + dt * 0.7);
      const appear = easeOutBack(Math.max(0, c.intro));
      c.pop = Math.max(0, c.pop - dt * 2.5);
      const popScale = 1 + Math.sin(c.pop * Math.PI) * 0.45;
      c.group.scale.setScalar(Math.max(0.0001, c.baseScale * appear * popScale));
      c.group.position.set(
        c.home.x + Math.sin(t * c.speed + c.seed) * 0.3 * motion,
        c.home.y + Math.cos(t * c.speed * 0.8 + c.seed) * 0.4 * motion,
        c.home.z,
      );
      c.group.rotation.x += dt * c.speed * 0.5 * motion;
      c.group.rotation.y += dt * c.speed * 0.7 * motion + c.pop * dt * 12;
    }

    crumbs.update(dt);
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
}
