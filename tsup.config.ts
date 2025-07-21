import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm"],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: false,
  treeshake: true,
  minify: true,
});
