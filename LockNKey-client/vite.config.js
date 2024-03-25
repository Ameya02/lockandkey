import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
      watch: {
        usePolling: true,
      },
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://lockandkey.onrender.com/',
       
      }
    }
  }

})
