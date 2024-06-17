/*
 * @Date: 2024-06-07 11:09:10
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-14 17:05:21
 */
import { RouteRecordRaw } from 'vue-router';

export default {
  path: '/dashboard',
  name: 'dashboard',
  component: 'layout',
  meta: {
    title: '仪表盘',
    requiresAuth: true,
    icon: 'icon-dashboard',
  },
  children: [
    {
      path: '/dashboard/workplace',
      name: 'workplace',
      component: 'dashboard/workplace/index',
      meta: {
        title: '工作台',
        requiresAuth: true,
      },
    },
    {
      path: '/dashboard/monitor',
      name: 'monitor',
      component: 'dashboard/monitor/index',
      meta: {
        title: '实时监控',
        requiresAuth: true,
      },
    },
  ],
} as RouteRecordRaw;
