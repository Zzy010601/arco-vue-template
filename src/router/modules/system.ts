/*
 * @Date: 2024-06-11 17:01:49
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-12 09:39:12
 */
import { RouteRecordRaw } from 'vue-router';
import PageLayout from '@/layout/PageLayout.vue';

// 系统管理模块
export default {
  path: '/system',
  name: 'system',
  component: PageLayout,
  meta: {
    locale: '系统管理',
    requiresAuth: true,
    icon: 'icon-settings',
  },
  children: [
    {
      path: 'user',
      name: 'user',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        locale: '用户管理',
        requiresAuth: true,
      },
    },
  ],
} as RouteRecordRaw;
