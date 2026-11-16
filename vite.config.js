
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://jobportal-pl-api.azurewebsites.net',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
