import { defineConfig } from "vite";
import { resolve } from "path";
import { mkdirSync, copyFileSync } from "fs";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/plugin.ts"),
      name: "createPlugin",
      formats: ["iife"],
      fileName: () => "plugin.js",
    },
    outDir: resolve(__dirname, "../dye2.reaplugin"),
    emptyOutDir: false,
    minify: false,
    rollupOptions: {
      output: {
        // Wrap in a function that flutter_js can call
        // The IIFE should expose createPlugin on globalThis
        footer: "",
      },
    },
  },
  plugins: [
    {
      name: "copy-manifest",
      closeBundle() {
        const outDir = resolve(__dirname, "../dye2.reaplugin");
        mkdirSync(outDir, { recursive: true });
        // The source manifest is deliberately NOT named manifest.json: Decaid
        // resolves a branch-source plugin root by looking for directories that
        // contain a manifest.json, and refuses to install when it finds more
        // than one. Only the build output may carry that name.
        copyFileSync(
          resolve(__dirname, "manifest.src.json"),
          resolve(outDir, "manifest.json")
        );
      },
    },
  ],
});
