import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  plugins: [
    svgLoader({
      defaultImport: "raw", // or 'url'
    }),
  ],
  resolve: {
    alias: {
      "@": new URL("./src/", import.meta.url).pathname,
      Core: new URL("./src/shared/Core", import.meta.url).pathname,
    },
  },
});
