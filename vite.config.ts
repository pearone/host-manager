import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const path = require('path');
import { AntdResolve, createStyleImportPlugin } from 'vite-plugin-style-import';

export default defineConfig({
    base: './',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '~': path.resolve('./node_modules')
        }
    },
    build: {
        rollupOptions: {
            input: {
                default: './index.html',
                options: './options.html'
            }
        },
        outDir: './dist'
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    'primary-color': '#1DA57A',
                    'link-color': '#1DA57A',
                    hack: `true; @import (reference) "${path.resolve(
                        'src/styles/base.less'
                    )}";`
                }
            }
        }
    },
    plugins: [
        react(),
        createStyleImportPlugin({
            resolves: [AntdResolve()]
        })
    ]
});
