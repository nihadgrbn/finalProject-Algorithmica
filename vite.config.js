import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/finalProject-Algorithmica/' : '/', // Adjust base for development
  server: {
    port: 3000, // Use a custom port if needed
  },
});
