import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';
import * as path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    host: '0.0.0.0',
    open: true,
  },
  plugins: [
    vueJsx(),
    vue(),
    viteMockServe({ mockPath: './src/mock', supportTs: true }),
  ],
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
          hack: `true; @import (reference) "${path.resolve(
            'src/style/index.less',
          )}";`,
        },
      },
    },
  },
});
