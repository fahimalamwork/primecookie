import { defineConfig } from "vite";

// Relative base so the build works at https://<user>.github.io/<repo>/ (GitHub Pages) or any custom domain.
export default defineConfig({
  base: "./",
  build: { chunkSizeWarningLimit: 800 }, // three.js is big; it is the whole show here
});
