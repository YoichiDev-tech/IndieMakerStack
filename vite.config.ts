import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Standard Vite config using the React plugin.
// No custom aliases are configured to keep the project easy to reason about.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
