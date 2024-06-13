/*
 * @Date: 2024-06-11 17:01:49
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-13 10:21:52
 */
import { RouteRecordRaw } from 'vue-router';
import PageLayout from '@/layout/PageLayout.vue';

// 系统管理模块
export default {
  path: '/system',
  name: 'system',
  component: PageLayout,
  meta: {
    title: '系统管理',
    requiresAuth: true,
    icon: 'icon-settings',
  },
  children: [
    {
      path: '/system/user',
      name: 'user',
      component: () => import('@/views/system/user/index.vue'),
      meta: {
        title: '用户管理',
        requiresAuth: true,
      },
    },
    {
      path: '/system/dept',
      name: 'dept',
      component: () => import('@/views/system/dept/index.vue'),
      meta: {
        title: '部门管理',
        requiresAuth: true,
      },
    },
    {
      path: '/system/menu',
      name: 'menu',
      component: () => import('@/views/system/menu/index.vue'),
      meta: {
        title: '菜单管理',
        requiresAuth: true,
      },
    },
  ],
} as RouteRecordRaw;
