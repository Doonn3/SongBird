import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";
import eslintPlugin from 'vite-plugin-eslint'

export default defineConfig({
  plugins: [
    svgLoader({
      defaultImport: "raw", // or 'url'
    }),
    eslintPlugin()
  ],
  resolve: {
    alias: {
      "@": new URL("./src/", import.meta.url).pathname,
      Core: new URL("./src/shared/Core", import.meta.url).pathname,
    },
  },
});
