/*
 * @Date: 2024-06-07 11:09:10
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-13 09:12:55
 */
import { RoleEnum } from '@/enums/RoleEnum';
import PageLayout from '@/layout/PageLayout.vue';

export default {
  path: '/list',
  name: 'list',
  component: PageLayout,
  meta: {
    title: '列表页',
    requiresAuth: true,
    icon: 'icon-list',
  },
  children: [
    {
      path: '/list/search-table', // The midline path complies with SEO specifications
      name: 'searchTable',
      component: () => import('@/views/list/search-table/index.vue'),
      meta: {
        title: '查询表格',
        requiresAuth: true,
        role: [RoleEnum.All],
      },
    },
    {
      path: '/list/card',
      name: 'card',
      component: () => import('@/views/list/card/index.vue'),
      meta: {
        title: '卡片列表',
        requiresAuth: true,
        role: [RoleEnum.All],
      },
    },
  ],
};
