import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/altraducirte-demo/', // Cambia si tu repo tiene otro nombre
  plugins: [react()],
});
