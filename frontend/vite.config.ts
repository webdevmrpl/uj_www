import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import os from 'os';

export default defineConfig({
    plugins: [tailwindcss(), react()],
    cacheDir: path.join(os.tmpdir(), 'vite-cache'),
    build: {
        outDir: 'build'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        port: 3000,
        host: '0.0.0.0'
    },
    preview: {
        port: 3000
    }
});