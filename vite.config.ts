import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/cardsgame/',
  build: {
    outDir: 'dist/cardsgame', // Places all build files inside dist/cardsgame/
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]', // Keeps assets organized under assets/
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  plugins: [react()],
})
