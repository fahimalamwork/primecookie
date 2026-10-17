import * as THREE from "three";
import { Crumbs } from "./crumbs.js";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Background layer: a light dusting of drifting sugar & crumbs, plus crumb bursts on demand.
export function initScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  const isPhone = window.matchMedia("(pointer: coarse)").matches && window.innerWidth < 820;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isPhone ? 1.5 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 10);

  scene.add(new THREE.HemisphereLight("#fff4e0", "#8a5a3a", 1.6));
  const key = new THREE.DirectionalLight("#ffe2b8", 2.4);
  key.position.set(4, 6, 6);
  scene.add(key);

  const crumbs = new Crumbs();
  scene.add(crumbs.mesh);

  // Ambient dust: slow-falling specks that wrap around the viewport
  const DUST = isPhone ? 60 : 120;
  const dustPos = new Float32Array(DUST * 3);
  const dustVel = new Float32Array(DUST);
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(
    dustGeo,
    new THREE.PointsMaterial({ color: "#c98a4a", size: 0.05, transparent: true, opacity: 0.55, depthWrite: false }),
  );
  dust.frustumCulled = false;
  scene.add(dust);

  let viewH = 6.3;
  function layout() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    viewH = 2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    const viewW = viewH * camera.aspect;
    for (let i = 0; i < DUST; i++) {
      dustPos.set([(Math.random() - 0.5) * viewW * 1.4, (Math.random() - 0.5) * viewH * 1.4, -Math.random() * 6], i * 3);
      dustVel[i] = 0.08 + Math.random() * 0.2;
    }
    dustGeo.attributes.position.needsUpdate = true;
  }
  layout();
  window.addEventListener("resize", layout);

  const pointer = new THREE.Vector2();
  window.addEventListener("pointermove", (e) => {
    pointer.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
  });

  // Screen point -> world point on the z=0 plane, so bursts appear right under the finger/cursor
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const raycaster = new THREE.Raycaster();
  function burstAt(clientX, clientY, amount = 45) {
    const ndc = new THREE.Vector2((clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1);
    raycaster.setFromCamera(ndc, camera);
    const hit = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(plane, hit)) crumbs.burst(hit, amount, 0.8);
  }

  const timer = new THREE.Timer();
  function tick(now) {
    timer.update(now);
    const dt = Math.min(timer.getDelta(), 0.05);
    const motion = reducedMotion ? 0.2 : 1;

    camera.position.x += (pointer.x * 0.3 * motion - camera.position.x) * 0.05;
    camera.position.y += (pointer.y * 0.2 * motion - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    const half = viewH * 0.7;
    for (let i = 0; i < DUST; i++) {
      let y = dustPos[i * 3 + 1] - dustVel[i] * dt * motion;
      if (y < -half) y = half;
      dustPos[i * 3 + 1] = y;
    }
    dustGeo.attributes.position.needsUpdate = true;

    crumbs.update(dt);
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  return { burstAt };
}
