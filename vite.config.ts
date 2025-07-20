import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  // ✅ Set base path for GitHub Pages deployment
  base: mode === "production" ? "/MyPortfolio/" : "/",

  server: {
    host: "0.0.0.0", // 👈 Better for LAN testing
    port: 8080,      // 👈 Custom port
    strictPort: true, // 👈 Fail if port 8080 is busy
  },

  plugins: [
    react(),                      // React SWC plugin
    mode === "development" && componentTagger(), // Only in dev
  ].filter(Boolean),              // Remove false plugins

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 👈 Clean alias for imports
    },
  },

  build: {
    outDir: "dist", // 👈 Output folder for production build
    sourcemap: true, // 👈 Helpful for debugging
  },
}));
