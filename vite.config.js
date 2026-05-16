import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Uncomment the line below if you want to deploy to GitHub Pages or a subdirectory
  //base: "/NettsideNordKlima/",
  server: {
    watch: {
      usePolling: true, // Optional: for WSL2/Docker
    },
  },
  // Force full page reload on CSS changes
  plugins: [
    tailwindcss(),
    {
      name: 'force-reload-on-css-change',
      handleHotUpdate({ file, server }) {
        if (file.endsWith('.css')) {
          server.ws.send({ type: 'full-reload' })
          return []
        }
      },
    },
  ],
})
