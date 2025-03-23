import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensures correct path handling
  build: {
    outDir: "dist", // Default Vite output directory
  }
});
