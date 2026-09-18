import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The app is served from two different roots:
//   - Vercel      -> https://you-can-opal.vercel.app/                     (assets live at "/assets/...")
//   - GitHub Pages -> https://mohsinahmad0347-maker.github.io/you-can/    (assets live at "/you-can/assets/...")
// A hard-coded "/you-can/" base made every built asset 404 on Vercel, so the page loaded an
// empty #root (blank screen). The base now follows the environment, and VITE_BASE can override it.
function resolveBase(): string {
  if (process.env.VITE_BASE) return process.env.VITE_BASE
  // GitHub Actions sets GITHUB_ACTIONS for the Pages sub-path deploy; every other host
  // (Vercel, `vite preview`, plain static servers) serves the app from the root.
  if (process.env.GITHUB_ACTIONS) return '/you-can/'
  return '/'
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: resolveBase(),
})

