import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://documentaionportalbackend.onrender.com', // Or the port your server runs on
        changeOrigin: true,
      },
    },
  },
});
