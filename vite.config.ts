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
                javascriptEnabled: true,
                modifyVars: {
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
