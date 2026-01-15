import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import fs from "node:fs";
const isDev = process.env.NODE_ENV === 'development';
const hasCert = fs.existsSync(path.resolve(__dirname, "localhost-key.pem")) &&
  fs.existsSync(path.resolve(__dirname, "localhost.pem"));

export default defineConfig({
  server: {
    host: "localhost",
    port: 5173,
    https: isDev && hasCert ? {
      key: fs.readFileSync(path.resolve(__dirname, "localhost-key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "localhost.pem")),
    } : undefined,
    proxy: {
      "/api/chatbot": {
        target: "https://iris-chatbot-ro1e.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/chatbot/, ""),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: false, // 👈 THIS IS CRITICAL
      },
      includeAssets: ["robots.txt"],
      manifest: {
        name: "Optanex",
        short_name: "Optanex",
        start_url: ".",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#000000",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
        ],
      },
    }),

  ],
});
