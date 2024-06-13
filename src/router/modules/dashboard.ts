/*
 * @Date: 2024-06-07 11:09:10
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-13 09:13:19
 */
import { RoleEnum } from '@/enums/RoleEnum';
import PageLayout from '@/layout/PageLayout.vue';

export default {
  path: '/dashboard',
  name: 'dashboard',
  component: PageLayout,
  meta: {
    title: '仪表盘',
    requiresAuth: true,
    icon: 'icon-dashboard',
  },
  children: [
    {
      path: '/dashboard/workplace',
      name: 'workplace',
      component: () => import('@/views/dashboard/workplace/index.vue'),
      meta: {
        title: '工作台',
        requiresAuth: true,
        // role: [RoleEnum.All],
      },
    },
    {
      path: '/dashboard/monitor',
      name: 'monitor',
      component: () => import('@/views/dashboard/monitor/index.vue'),
      meta: {
        title: '实时监控',
        requiresAuth: true,
        // role: [RoleEnum.ADMIN],
      },
    },
  ],
};
