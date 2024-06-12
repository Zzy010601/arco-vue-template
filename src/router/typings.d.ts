/*
 * @Date: 2024-06-07 16:34:33
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-12 09:07:59
 */
import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    role?: string[];
    requiresAuth: boolean;
    icon?: string;
    locale?: string;
    menuSelectKey?: string;
    keepAlive?: boolean;
  }
}
