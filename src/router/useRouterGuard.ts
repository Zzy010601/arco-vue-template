/*
 * @Date: 2024-06-14 16:19:44
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-18 08:56:45
 */
import { useUserStore } from '@/store';
import { LocationQueryRaw, Router } from 'vue-router';
import { isLogin } from '@/utils/auth';
import NProgress from 'nprogress';
import { addAsyncRoutes } from '@/utils';
import { asyncRoutes } from './modules';

export const useRouterGuard = (router: Router) => {
  NProgress.configure({ showSpinner: false });
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const userStore = useUserStore();
    if (to.name === 'login') {
      next();
    } else if (isLogin()) {
      try {
        if (!userStore.menuList.length) {
          // TODO: 获取用户权限
          const routes = await asyncRoutes();
          const menuList = addAsyncRoutes(routes, router);
          userStore.setInfo({ menuList });
          next(to.fullPath);
        } else {
          next();
        }
      } catch (err) {
        next({
          name: 'login',
          query: { redirect: to.name, ...to.query } as LocationQueryRaw,
        });
      }
    } else {
      next('/login');
    }
  });
  router.afterEach(() => {
    NProgress.done();
  });
};
