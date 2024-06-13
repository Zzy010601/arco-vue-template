/*
 * @Date: 2024-06-07 11:09:10
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-13 15:15:34
 */
import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    role?: string[];
    requiresAuth: boolean;
    icon?: string;
    title?: string;
    menuSelectKey?: string;
    keepAlive?: boolean;
  }
}
