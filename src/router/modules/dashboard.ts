/*
 * @Date: 2024-06-07 11:09:10
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-07 15:35:52
 */
import { RoleEnum } from '@/enums/RoleEnum';

export default {
  path: '/dashboard',
  name: 'dashboard',
  component: () => import('@/views/dashboard/index.vue'),
  meta: {
    locale: '仪表盘',
    requiresAuth: true,
    icon: 'icon-dashboard',
  },
  children: [
    {
      path: '/workplace',
      name: 'workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        locale: '工作台',
        requiresAuth: true,
        role: [RoleEnum.All],
      },
    },
    {
      path: '/monitor',
      name: 'monitor',
      component: () => import('@/views/dashboard/monitor/index.vue'),
      meta: {
        locale: '实时监控',
        requiresAuth: true,
        role: [RoleEnum.ADMIN],
      },
    },
  ],
};
