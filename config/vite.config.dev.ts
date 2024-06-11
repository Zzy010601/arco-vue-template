/*
 * @Date: 2024-06-07 11:09:10
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-11 15:34:23
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import vueJsx from '@vitejs/plugin-vue-jsx';
import eslint from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  // mode: 'development',
  server: {
    host: '0.0.0.0',
    port: 3000,
    open: true,
    proxy: {
      '/auth': 'http://192.168.4.194:8766',
      '/base': 'http://192.168.4.194:8766',
      '/business': 'http://192.168.4.194:8766',
      '/login': 'http://192.168.4.194:8766',
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    svgLoader({ svgoConfig: {} }),
    AutoImport({
      imports: ['vue', 'vue-router', '@vueuse/core'],
      dts: './auto-imports.d.ts',
      resolvers: [ArcoResolver()],
      eslintrc: {
        enabled: false, // 1、改为true用于生成eslint配置。2、生成后改回false，避免重复生成消耗
      },
    }),
    Components({
      resolvers: [
        ArcoResolver({
          sideEffect: true,
        }),
      ],
    }),
    eslint({
      cache: false,
      include: ['src/**/*.ts', 'src/**/*.tsx', 'src/**/*.vue'],
      exclude: ['node_modules'],
    }),
  ],
  css: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, '../src'),
      },
      {
        find: 'assets',
        replacement: resolve(__dirname, '../src/assets'),
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js', // compile template
      },
    ],
    extensions: ['.ts', '.js'],
  },
  define: {
    'process.env': {},
  },
});
