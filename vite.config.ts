import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()],
    base: '/ctldotnet/', // Replace 'your-repo-name' with your GitHub repo name

    server: {
        port: 3000,
        open: true,
        hmr: {
        overlay: false,
        },
    },
})