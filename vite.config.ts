import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'GS Data Viewer Ahammed Nihal PT',
        short_name: 'GS Data Viewer',
        theme_color: '#007bff',
        background_color: '#ffffff',
        display: 'minimal-ui',
        start_url: '/',
        icons: [
          {
            src: '/assets/icon_192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/assets/icon_512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: '/assets/Screenshot_1.png',
            sizes: '1920x1080',
            type: 'image/png',
            form_factor: 'wide',
          },
        ],
      },
    }),
  ],
});
