import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import WindiCSS from "vite-plugin-windicss";

export default defineConfig({
  plugins: [react(), WindiCSS()],
  server: {
    port: 3000,
    hmr: {
      host: "shopping-clone.site",
      protocol: "wss",
    },
  },
  preview: {
    port: 8080,
  },
});
