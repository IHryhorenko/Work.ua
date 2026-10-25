import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5132', // Адреса бекенду, до якого фронтенд надсилає API-запити
        changeOrigin: true,
      },
    },
  },
})