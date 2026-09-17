import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  // Deployed to https://mohsinahmad0347-maker.github.io/you-can/ (GitHub Pages project site),
  // so built assets must resolve under the "/you-can/" sub-path.
  base: '/you-can/',
})

