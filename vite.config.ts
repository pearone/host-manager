import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const path = require('path');
import { AntdResolve, createStyleImportPlugin } from 'vite-plugin-style-import';

export default defineConfig({
    base: './',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    css: {
        preprocessorOptions: {
            less: {
                modifyVars: {
                    hack: `true; @import (reference) "${path.resolve(
                        'src/styles/base.less'
                    )}";`
                },
                javascriptEnabled: true
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
