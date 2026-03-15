import path from "path";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  resolve: {
    alias: {
      "/assets": path.resolve(process.cwd(), "public/assets"),
    },
  },
  plugins: [
    react(),
    ...(process.env.SENTRY_AUTH_TOKEN
      ? [
          sentryVitePlugin({
            org: "arnob-mahmud",
            project: "iphone15-showcase",
            telemetry: false,
          }),
        ]
      : []),
  ],
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1600,
  },
});
