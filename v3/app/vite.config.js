import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  base: '/wp-content/plugins/FatRat-Collect/v3/dist/',
  build: {
    outDir: path.resolve(__dirname, '../dist'),
    emptyOutDir: true,
    assetsDir: 'assets',
  },
  server: {
    port: 5173,
    proxy: {
      '/wp-json': {
        target: 'http://localhost',
        changeOrigin: true,
      },
      '/wp-admin': {
        target: 'http://localhost',
        changeOrigin: true,
      },
    },
  },
})
