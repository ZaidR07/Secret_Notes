import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Redirect unknown routes to `index.html`
    fs: {
      strict: false, // Optional, related to file system resolution
      
    },
    host: true,
    port: 3000, 
  },
  build: {
    rollupOptions: {
      // Optional: Customize build behavior if needed
    },
  },
});
