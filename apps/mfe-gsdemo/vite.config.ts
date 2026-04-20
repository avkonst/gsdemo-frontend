import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
  },
  server: {
    port: 3000,
    proxy: {
      "/api/sso": {
        target: "http://localhost:3001",
        rewrite: (path) => path.replace(/^\/api\/sso/, ""),
      },
      "/api/core": {
        target: "http://localhost:3002",
        rewrite: (path) => path.replace(/^\/api\/core/, ""),
      },
    },
  },
});
