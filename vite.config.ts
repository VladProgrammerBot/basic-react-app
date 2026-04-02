import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";
import babel from "vite-plugin-babel";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // babel: {
      //   plugins: ["babel-plugin-react-compiler"],
      // },
    }),
    // babel({
    //   babelConfig: {
    //     plugins: ["babel-plugin-react-compiler"],
    //   },
    // }),
    tailwindcss(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    include: ["framer-motion"],
  },
});
