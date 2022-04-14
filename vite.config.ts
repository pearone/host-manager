import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    build: {
        outDir: path.resolve(__dirname, 'dist'),
        lib: {
            entry: path.resolve(__dirname, 'src/main.tsx'),
            name: 'index',
            fileName: (format) => `index.${format}.js`
        }
    },
    plugins: [react()]
});
