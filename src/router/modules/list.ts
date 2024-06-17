/*
 * @Date: 2024-06-07 11:09:10
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-14 17:06:00
 */
import { RouteRecordRaw } from 'vue-router';

export default {
  path: '/list',
  name: 'list',
  component: 'layout',
  meta: {
    title: '列表页',
    requiresAuth: true,
    icon: 'icon-list',
  },
  children: [
    {
      path: '/list/search-table', // The midline path complies with SEO specifications
      name: 'searchTable',
      component: 'list/search-table/index',
      meta: {
        title: '查询表格',
        requiresAuth: true,
      },
    },
    {
      path: '/list/card',
      name: 'card',
      component: 'list/card/index',
      meta: {
        title: '卡片列表',
        requiresAuth: true,
      },
    },
  ],
} as RouteRecordRaw;
