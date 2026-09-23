import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contacto: resolve(__dirname, 'contacto.html'),
        destinos: resolve(__dirname, 'destinos.html'),
        nosotros: resolve(__dirname, 'nosotros.html'),
        tours: resolve(__dirname, 'tours.html'),
      },
    },
  },
});