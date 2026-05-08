import { defineConfig } from "vite";

export default defineConfig({
  // Uncomment the line below if you want to deploy to GitHub Pages or a subdirectory
  // base: "/WebNordicWeather/",
  server: {
    watch: {
      usePolling: true, // Optional: for WSL2/Docker
    },
  },
  css: {
    devSourcemap: true, // Optional: for debugging
  },
  // Force full page reload on CSS changes
  plugins: [
    {
      name: "force-reload-on-css-change",
      handleHotUpdate({ file, server }) {
        if (file.endsWith(".css")) {
          server.ws.send({ type: "full-reload" });
          return [];
        }
      },
    },
  ],
});
