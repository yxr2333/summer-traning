import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import { viteMockServe } from 'vite-plugin-mock';
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    host: '0.0.0.0',
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
});
