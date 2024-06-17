/*
 * @Date: 2024-06-07 11:09:10
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-17 13:30:41
 */
import { createRouter, createWebHashHistory } from 'vue-router';
import 'nprogress/nprogress.css';
import usePermission from '@/hooks/permission';
import { defaultRoutes } from './modules';
import { useRouterGuard } from './useRouterGuard';

const router = createRouter({
  history: createWebHashHistory(),
  routes: defaultRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, left: 0 };
  },
});

useRouterGuard(router);

export default router;
