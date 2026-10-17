import * as THREE from "three";

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
