/*
 * @Date: 2024-06-07 11:09:10
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-13 16:18:19
 */
import { mergeConfig, loadEnv, defineConfig, ConfigEnv, UserConfig } from 'vite';
import baseConfig from './vite.config.base';

const CWD = process.cwd();

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const { VITE_API_BASE_URL } = loadEnv(mode, CWD);
  return mergeConfig(
    {
      mode: 'development',
      server: {
        host: '0.0.0.0',
        port: 3000,
        open: true,
        proxy: {
          '/auth': VITE_API_BASE_URL,
          '/base': VITE_API_BASE_URL,
          '/business': VITE_API_BASE_URL,
          '/login': VITE_API_BASE_URL,
        },
      },
    },
    baseConfig,
  );
});
