/*
 * @Date: 2024-06-14 16:19:44
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-19 10:19:00
 */
import { useUserStore } from '@/store';
import { LocationQueryRaw, Router } from 'vue-router';
import { getUserPermission } from '@/api/system/user';
import NProgress from 'nprogress';
import { addAsyncRoutes, getSideBarMenu } from '@/utils';
import { isExpired } from '@/utils/auth';
import { asyncRoutes } from './modules';

export const useRouterGuard = (router: Router) => {
  NProgress.configure({ showSpinner: false });
  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const userStore = useUserStore();
    if (to.name === 'login') {
      next();
    } else if (!isExpired()) {
      try {
        if (!userStore.menuList.length) {
          // const res = await getUserPermission();
          // 获取部门信息
          await userStore.getDepartList();
          // TODO: 获取用户权限
          // const menu = getSideBarMenu(res.menu);
          // const menuList = addAsyncRoutes(menu, router);
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
