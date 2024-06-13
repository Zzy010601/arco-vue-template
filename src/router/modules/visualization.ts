/*
 * @Date: 2024-06-07 11:09:10
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-07 15:37:28
 */
import { RoleEnum } from '@/enums/RoleEnum';

export default {
  path: '/visualization',
  name: 'visualization',
  component: () => import('@/views/visualization/index.vue'),
  meta: {
    title: '数据可视化',
    requiresAuth: true,
    icon: 'icon-apps',
  },
  children: [
    {
      path: '/data-analysis',
      name: 'dataAnalysis',
      component: () => import('@/views/visualization/data-analysis/index.vue'),
      meta: {
        title: '分析页',
        requiresAuth: true,
        role: [RoleEnum.ADMIN],
      },
    },
    {
      path: '/multi-dimension-data-analysis',
      name: 'multiDimensionDataAnalysis',
      component: () => import('@/views/visualization/multi-dimension-data-analysis/index.vue'),
      meta: {
        title: '多维数据分析',
        requiresAuth: true,
        role: [RoleEnum.ADMIN],
      },
    },
  ],
};
