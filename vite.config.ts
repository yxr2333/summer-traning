import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import * as path from 'path';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    host: '0.0.0.0',
    open: true,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:9527',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, ''),
      },
    },
  },
  plugins: [vueJsx(), vue(), viteMockServe({ mockPath: './src/mock', supportTs: true })],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.json', '.ts'],
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve('src/style/index.less')}";`,
        },
      },
    },
  },
});
