import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// The site links to this app at /app/, and the marketing site
// (../website) is a plain static folder with no server of its own, so
// the build output lands directly inside it rather than needing a
// separate deploy target.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '../website/app',
    emptyOutDir: true,
  },
})
