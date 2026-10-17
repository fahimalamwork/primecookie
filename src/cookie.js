import * as THREE from "three";

// Procedural cookie: a squashed, lumpy sphere with vertex-colour browning,
// chocolate chips on top, and support for taking scalloped "bites" out of the edge.

const DOUGH_CENTER = new THREE.Color("#e2a85e");
const DOUGH_EDGE = new THREE.Color("#a8622c");
const CHIP_COLORS = ["#3a2216", "#2a170e", "#4a2c1b"];

let bumpTexture;
function getBumpTexture() {
  if (bumpTexture) return bumpTexture;
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 2600; i++) {
    const v = 90 + Math.random() * 90;
    ctx.fillStyle = `rgb(${v},${v},${v})`;
    ctx.beginPath();
    ctx.arc(Math.random() * size, Math.random() * size, Math.random() * 3 + 0.5, 0, Math.PI * 2);
    ctx.fill();
  }
  bumpTexture = new THREE.CanvasTexture(canvas);
  bumpTexture.wrapS = bumpTexture.wrapT = THREE.RepeatWrapping;
  bumpTexture.repeat.set(3, 2);
  return bumpTexture;
}

// Cheap smooth noise from layered sines with random phases — plenty for dough lumps.
function makeLumps() {
  const waves = Array.from({ length: 6 }, () => ({
    fx: 1 + Math.random() * 4,
    fz: 1 + Math.random() * 4,
    p: Math.random() * Math.PI * 2,
    a: 0.3 + Math.random() * 0.7,
  }));
  return (x, z) => waves.reduce((s, w) => s + w.a * Math.sin(w.fx * x + w.fz * z + w.p), 0) / 3;
}

// Profile: unit-sphere y -> cookie height. Domed top, flat bottom.
const profile = (y) => (y >= 0 ? Math.pow(y, 0.55) * 0.24 : y * 0.06);

function buildGeometry() {
  const geo = new THREE.SphereGeometry(1, 110, 56);
  const pos = geo.attributes.position;
  const colors = new Float32Array(pos.count * 3);
  const lumps = makeLumps();
  const edgeWobble = makeLumps();
  const c = new THREE.Color();

  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);
    const angle = Math.atan2(z, x);
    const r = 1 + edgeWobble(Math.cos(angle) * 2, Math.sin(angle) * 2) * 0.05;
    x *= r;
    z *= r;
    y = profile(y);
    if (y > 0) y += lumps(x * 2.2, z * 2.2) * 0.035 * (y / 0.24);
    pos.setXYZ(i, x, y, z);

    const d = Math.min(1, Math.hypot(x, z));
    c.copy(DOUGH_CENTER).lerp(DOUGH_EDGE, Math.pow(d, 3));
    if (y < 0.01) c.multiplyScalar(0.78); // toasted underside
    const speck = 0.92 + Math.random() * 0.12;
    colors.set([c.r * speck, c.g * speck, c.b * speck], i * 3);
  }
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geo.computeVertexNormals();
  geo.userData.base = pos.array.slice();
  return geo;
}

const chipGeo = new THREE.IcosahedronGeometry(0.1, 1);
const chipMats = CHIP_COLORS.map((col) => new THREE.MeshStandardMaterial({ color: col, roughness: 0.45, metalness: 0.05 }));

export class Cookie {
  constructor({ chips = 11, scale = 1 } = {}) {
    this.group = new THREE.Group(); // outer: position + tilt
    this.spin = new THREE.Group(); // inner: spins around the cookie's own normal
    this.group.add(this.spin);
    this.group.scale.setScalar(scale);
    this.baseScale = scale;
    this.chipCount = chips;
    this.material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.9,
      bumpMap: getBumpTexture(),
      bumpScale: 1.4,
    });
    this.bites = 0;
    this.build();
  }

  build() {
    if (this.mesh) {
      this.spin.remove(this.mesh);
      this.mesh.geometry.dispose();
    }
    this.chips?.forEach((ch) => this.spin.remove(ch));

    this.mesh = new THREE.Mesh(buildGeometry(), this.material);
    this.mesh.userData.cookie = this;
    this.spin.add(this.mesh);

    this.chips = [];
    for (let i = 0; i < this.chipCount; i++) {
      const d = Math.sqrt(Math.random()) * 0.78;
      const a = Math.random() * Math.PI * 2;
      const x = Math.cos(a) * d;
      const z = Math.sin(a) * d;
      const chip = new THREE.Mesh(chipGeo, chipMats[i % chipMats.length]);
      chip.position.set(x, profile(Math.sqrt(1 - d * d)) - 0.015, z);
      chip.scale.set(0.8 + Math.random() * 0.7, 0.5 + Math.random() * 0.4, 0.8 + Math.random() * 0.7);
      chip.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
      chip.userData.cookie = this;
      this.spin.add(chip);
      this.chips.push(chip);
    }
    this.bites = 0;
  }

  // Take a scalloped bite from the edge nearest to a local-space point.
  bite(localPoint) {
    const angle = Math.atan2(localPoint.z, localPoint.x) + (Math.random() - 0.5) * 0.3;
    const cx = Math.cos(angle) * 1.12;
    const cz = Math.sin(angle) * 1.12;
    const radius = 0.42 + Math.random() * 0.08;
    const teeth = 6 + Math.floor(Math.random() * 3);
    const pos = this.mesh.geometry.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      const dx = pos.getX(i) - cx;
      const dz = pos.getZ(i) - cz;
      const dist = Math.hypot(dx, dz);
      const theta = Math.atan2(dz, dx);
      const rEff = radius + Math.abs(Math.sin(theta * teeth)) * 0.035;
      if (dist < rEff) {
        const k = rEff / Math.max(dist, 1e-4);
        pos.setX(i, cx + dx * k);
        pos.setZ(i, cz + dz * k);
      }
    }
    pos.needsUpdate = true;
    this.mesh.geometry.computeVertexNormals();
    this.mesh.geometry.computeBoundingSphere();

    for (const chip of this.chips) {
      if (Math.hypot(chip.position.x - cx, chip.position.z - cz) < radius + 0.05) chip.visible = false;
    }
    this.bites++;
    return new THREE.Vector3(Math.cos(angle) * 0.8, 0.1, Math.sin(angle) * 0.8);
  }

  get pickables() {
    return [this.mesh, ...this.chips];
  }
}

// Instanced pool of crumbs with simple ballistic physics.
export class Crumbs {
  constructor(count = 400) {
    const geo = new THREE.IcosahedronGeometry(0.035, 0);
    const mat = new THREE.MeshStandardMaterial({ color: "#c98a4a", roughness: 1 });
    this.mesh = new THREE.InstancedMesh(geo, mat, count);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.mesh.frustumCulled = false;
    this.items = Array.from({ length: count }, () => ({ life: 0, p: new THREE.Vector3(), v: new THREE.Vector3(), s: 1, r: new THREE.Euler() }));
    this.cursor = 0;
    this.dummy = new THREE.Object3D();
    const tint = new THREE.Color();
    for (let i = 0; i < count; i++) {
      tint.set(i % 5 === 0 ? "#3a2216" : "#d29654").multiplyScalar(0.85 + Math.random() * 0.3);
      this.mesh.setColorAt(i, tint);
    }
    this.hideAll();
  }

  hideAll() {
    this.dummy.scale.setScalar(0);
    this.dummy.updateMatrix();
    for (let i = 0; i < this.items.length; i++) this.mesh.setMatrixAt(i, this.dummy.matrix);
    this.mesh.instanceMatrix.needsUpdate = true;
  }

  burst(origin, amount = 40, power = 1) {
    for (let n = 0; n < amount; n++) {
      const c = this.items[this.cursor];
      this.cursor = (this.cursor + 1) % this.items.length;
      c.life = 1.6 + Math.random() * 0.8;
      c.p.copy(origin);
      c.v.set((Math.random() - 0.5) * 4, Math.random() * 3 + 1, (Math.random() - 0.2) * 3).multiplyScalar(power);
      c.s = 0.5 + Math.random() * 1.4;
      c.r.set(Math.random() * 6, Math.random() * 6, 0);
    }
  }

  update(dt) {
    let any = false;
    for (let i = 0; i < this.items.length; i++) {
      const c = this.items[i];
      if (c.life <= 0) continue;
      any = true;
      c.life -= dt;
      c.v.y -= 9 * dt;
      c.p.addScaledVector(c.v, dt);
      c.r.x += dt * 5;
      c.r.y += dt * 4;
      this.dummy.position.copy(c.p);
      this.dummy.rotation.copy(c.r);
      this.dummy.scale.setScalar(c.life > 0 ? c.s * Math.min(1, c.life * 2) : 0);
      this.dummy.updateMatrix();
      this.mesh.setMatrixAt(i, this.dummy.matrix);
    }
    if (any || this.wasActive) this.mesh.instanceMatrix.needsUpdate = true;
    this.wasActive = any;
  }
}
