import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    // Додаємо framer-motion до списку примусової перезбірки
    include: ['framer-motion'],
    // Або, якщо це не допомогло, виключіть його з попередньої збірки (рідше використовується)
    // exclude: ['framer-motion'],
  },
});
