/*
 * @Date: 2024-06-07 11:09:10
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-13 16:18:19
 */
import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
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
  },
  baseConfig,
);
