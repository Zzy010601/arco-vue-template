/*
 * @Date: 2024-06-12 10:47:21
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-17 13:48:51
 */
import { RouteRecordRaw, Router } from 'vue-router';
import { NOT_FOUND } from '@/constants';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

export interface TreeItem {
  children: TreeItem[];
  [key: string]: any;
}

/**
 * 添加动态路由
 * @param {RouteRecordRaw[]} routes
 * @param {Router} router
 * @returns {RouteRecordRaw[]}
 */
export const addAsyncRoutes = (routes: RouteRecordRaw[], router: Router): RouteRecordRaw[] => {
  const loadViews = import.meta.glob('@/views/**/index.vue');
  const transferRoutes = (routes: any[]) => {
    const newRoutes: RouteRecordRaw[] = [];
    routes.forEach((item) => {
      const { path, name, component, meta, children } = item;
      let route: any = {};
      if (children) {
        route.children = transferRoutes(children);
      }
      if (component === 'layout') {
        route.component = DefaultLayout;
      } else {
        const key = Object.keys(loadViews).find((mapKey) => mapKey.includes(component));
        route.component = loadViews[key] || loadViews[NOT_FOUND];
      }
      route = {
        path,
        name,
        meta,
        ...route,
      };
      newRoutes.push(route);
    });
    return newRoutes;
  };
  const menuList = transferRoutes(routes);
  menuList.forEach((route) => {
    router.addRoute(route);
  });
  return menuList;
};

/**
 * 去除树形数组中的空children
 * @param treeItem
 * @returns {TreeItem}
 */
export const delEmptyChild = (treeItem: TreeItem): TreeItem => {
  if (!treeItem.children.length) {
    delete treeItem.children;
  } else {
    treeItem.children.forEach((child) => delEmptyChild(child));
  }
  return treeItem;
};
