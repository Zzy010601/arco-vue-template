/*
 * @Date: 2024-06-13 15:33:06
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-14 09:46:49
 */
import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base';
import configCompressPlugin from './plugin/compress';
import configImageminPlugin from './plugin/imagemin';

export default mergeConfig(
  {
    mode: 'production',
    plugins: [configCompressPlugin('gzip'), configImageminPlugin()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            arco: ['@arco-design/web-vue'],
            chart: ['echarts', 'vue-echarts'],
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
          },
        },
      },
    },
  },
  baseConfig,
);
