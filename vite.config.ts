import path from "path";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // So that import "/assets/..." in dev resolves to public/assets (app uses URL strings now; alias kept for consistency)
  resolve: {
    alias: {
      "/assets": path.resolve(process.cwd(), "public/assets"),
    },
  },
  // When VITE_SENTRY_INGEST_URL is set (full envelope URL), proxy /api/monitoring to it in dev
  server:
    process.env.VITE_SENTRY_INGEST_URL
      ? {
          proxy: {
            "/api/monitoring": {
              target: new URL(process.env.VITE_SENTRY_INGEST_URL).origin,
              changeOrigin: true,
              secure: true,
              rewrite: (path) =>
                path.replace(/^\/api\/monitoring/, new URL(process.env.VITE_SENTRY_INGEST_URL!).pathname),
            },
          },
        }
      : {},
  plugins: [
    react(),
    // Only add Sentry plugin when token is set (e.g. CI); then source maps are uploaded
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
