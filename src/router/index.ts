/*
 * @Date: 2024-06-07 11:09:10
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-12 16:47:35
 */
import { createRouter, createWebHashHistory, LocationQueryRaw } from 'vue-router';
import NProgress from 'nprogress';
import { useUserStore } from '@/store';
import 'nprogress/nprogress.css';
import usePermission from '@/hooks/permission';
import { isLogin } from '@/utils/auth';
import Login from './modules/login';
import appRoutes from './modules';

NProgress.configure({ showSpinner: false });
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: 'login',
    },
    Login,
    ...appRoutes,
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/not-found/index.vue'),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0, left: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  const userStore = useUserStore();

  function crossroads() {
    const Permission = usePermission();
    if (Permission.accessRouter(to)) next();
    else {
      const destination = Permission.findFirstPermissionRoute(appRoutes, userStore.role) || {
        name: 'notFound',
      };
      next(destination);
    }
    NProgress.done();
  }
  if (isLogin()) {
    await userStore.getDepartList();
    if (userStore.role) {
      crossroads();
    } else {
      try {
        // await userStore.info();
        crossroads();
      } catch (error) {
        next({
          name: 'login',
          query: {
            redirect: to.name,
            ...to.query,
          } as LocationQueryRaw,
        });
        NProgress.done();
      }
    }
  } else {
    if (to.name === 'login') {
      next();
      NProgress.done();
      return;
    }
    next({
      name: 'login',
      query: {
        redirect: to.name,
        ...to.query,
      } as LocationQueryRaw,
    });
    NProgress.done();
  }
});

export default router;
