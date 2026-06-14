import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Set the base public path (explicitly defined for absolute clarity)
  base: '/',
  
  resolve: {
    alias: {
      // Allows using '@' as a shortcut for your '/src' directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // Build optimizations for smooth, high-performance production bundles
  build: {
    sourcemap: false, // Disables sourcemaps in production to keep build sizes light
    chunkSizeWarningLimit: 600, // Slightly raised chunk limit to prevent unnecessary warnings
  },
})