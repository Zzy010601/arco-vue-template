/*
 * @Date: 2024-06-07 11:09:10
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-07 15:37:05
 */
import { RoleEnum } from '@/enums/RoleEnum';

export default {
  path: '/result',
  name: 'result',
  component: () => import('@/views/result/index.vue'),
  meta: {
    locale: '结果页',
    icon: 'icon-check-circle',
    requiresAuth: true,
  },
  children: [
    {
      path: '/success',
      name: 'success',
      component: () => import('@/views/result/success/index.vue'),
      meta: {
        locale: '成功页',
        requiresAuth: true,
        role: [RoleEnum.ADMIN],
      },
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('@/views/result/error/index.vue'),
      meta: {
        locale: '失败页',
        requiresAuth: true,
        role: [RoleEnum.ADMIN],
      },
    },
  ],
};
