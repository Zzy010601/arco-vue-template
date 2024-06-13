/*
 * @Date: 2024-06-07 16:34:33
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-12 09:38:50
 */
import { RoleEnum } from '@/enums/RoleEnum';
import PageLayout from '@/layout/PageLayout.vue';

export default {
  path: '/exception',
  name: 'exception',
  component: PageLayout,
  meta: {
    title: '异常页',
    requiresAuth: true,
    icon: 'icon-exclamation-circle',
  },
  children: [
    {
      path: '403',
      name: '403',
      component: () => import('@/views/exception/403/index.vue'),
      meta: {
        title: '403',
        requiresAuth: true,
        role: [RoleEnum.ADMIN],
      },
    },
    {
      path: '404',
      name: '404',
      component: () => import('@/views/exception/404/index.vue'),
      meta: {
        title: '404',
        requiresAuth: true,
        role: [RoleEnum.All],
      },
    },
    {
      path: '500',
      name: '500',
      component: () => import('@/views/exception/500/index.vue'),
      meta: {
        title: '500',
        requiresAuth: true,
        role: [RoleEnum.All],
      },
    },
  ],
};
