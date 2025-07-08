import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/companies-house': {
        target: 'https://api.company-information.service.gov.uk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/companies-house/, ''),
      },
    },
  },
  plugins: [react(), tailwindcss()],
})
