import { defineConfig } from "vite";
import { resolve } from "node:path";

// The live site runs straight from the repo files (GitHub Pages "Deploy from a branch").
// The build is a local check that every page still compiles.
const page = (p) => resolve(import.meta.dirname, p);

export default defineConfig({
  base: "./",
  build: {
    chunkSizeWarningLimit: 800, // three.js is big
    rollupOptions: {
      input: {
        home: page("index.html"),
        menu: page("menu/index.html"),
        story: page("story/index.html"),
        order: page("order/index.html"),
      },
    },
  },
});
