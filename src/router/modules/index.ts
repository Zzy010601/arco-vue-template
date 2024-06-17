/*
 * @Date: 2024-06-07 16:34:33
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-17 15:12:19
 */
import { RouteRecordRaw } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import List from './list';
import System from './system';

export const defaultRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    component: DefaultLayout,
    redirect: '/home',
    meta: {
      title: '首页',
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          icon: 'icon-home',
          requiresAuth: true,
        },
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/exception/404/index.vue'),
    meta: {
      title: '404',
      requiresAuth: true,
      hidden: true,
    },
  },
  {
    path: '/500',
    name: '500',
    component: () => import('@/views/exception/500/index.vue'),
    meta: {
      title: '500',
      requiresAuth: true,
      hidden: true,
    },
  },
  // ...asyncRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/notFound/index.vue'),
  },
];

export const asyncRoutes = (): Promise<any[]> => {
  return new Promise((resolve) => {
    resolve([List, System]);
  });
};
