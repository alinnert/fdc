import reactPlugin from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import postcss from './postcss.config.js'

// https://vitejs.dev/config/
export default defineConfig({
  build: { outDir: './dist/ui' },
  plugins: [reactPlugin()],
  css: { postcss },
})
