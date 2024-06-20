/*
 * @Date: 2024-06-12 10:47:21
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-19 16:59:09
 */
import axios from 'axios';
import { RouteRecordRaw, Router } from 'vue-router';
import { NOT_FOUND, fileMimeType } from '@/constants';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { getToken } from './auth';

export interface TreeItem {
  children: TreeItem[];
  [key: string]: any;
}

/**
 *
 *
 * @export
 * @param {any[]} routes
 * @param {number} [type=1] 只返回路由数组
 * @param {number}[type=2] 权限字段也一起返回
 */
export const getSideBarMenu = (routes: any[]): any[] => {
  const routeArr = [];
  const son: any[] = [];
  const perms = [];
  const level = 0;

  for (const item of routes) {
    item.level = level;
    if (item.parentId === 1) {
      routeArr.push(item);
    } else if (item.perms != null && item.perms !== '') {
      perms.push(item);
    } else son.push(item);
  }
  const getChildren = (parent: any[]) => {
    for (const item of parent) {
      let hasChildren = false;
      const arr = [];
      for (const itm of son) {
        if (itm.parentId === item.menuId && itm.path != null) {
          hasChildren = true;
          itm.level = item.level + 1;
          arr.push(itm);
        }
      }
      if (hasChildren) {
        item.children = arr;
        getChildren(item.children);
      }
    }
  };
  getChildren(routeArr);
  // if (type !== 1) return { routeArr, perms };
  return routeArr;
};

/**
 * 添加动态路由
 * @param {any[]} routes
 * @param {Router} router
 * @returns {RouteRecordRaw[]}
 */
export const addAsyncRoutes = (routes: any[], router: Router): RouteRecordRaw[] => {
  const loadViews = import.meta.glob('@/views/**/index.vue');
  // const transferRoutes = (routes: any[]) => {
  //   const newRoutes: RouteRecordRaw[] = [];
  //   routes.forEach((item) => {
  //     const { path, menuName, component, icon, perms, isHidden, children } = item;
  //     let route: any = {};
  //     if (children) {
  //       route.children = transferRoutes(children);
  //     }
  //     if (component === 'layout') {
  //       route.component = DefaultLayout;
  //     } else {
  //       const key = Object.keys(loadViews).find((mapKey) => mapKey.includes(component));
  //       route.component = loadViews[key] || loadViews[NOT_FOUND];
  //     }
  //     route = {
  //       path,
  //       name: menuName,
  //       meta: { title: menuName, icon, perms, isHidden },
  //       ...route,
  //     };
  //     newRoutes.push(route);
  //   });
  //   return newRoutes;
  // };
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

/**
 * 解析blob响应内容并下载
 * @param {any} res blob响应内容
 * @param {string} mimeType MIME类型
 */
export const resolveBlob = (res: any, mimeType: string) => {
  const aLink = document.createElement('a');
  const blob = new Blob([res.data], { type: mimeType });
  // //从response的headers中获取filename, 后端response.setHeader("Content-disposition", "attachment; filename=xxxx.docx") 设置的文件名;
  const patt = new RegExp('filename=([^;]+\\.[^\\.;]+);*');
  const contentDisposition = decodeURI(res.headers['content-disposition']);
  const result = patt.exec(contentDisposition);
  let fileName = result[1];
  fileName = fileName.replace(/"/g, '');
  aLink.href = URL.createObjectURL(blob);
  aLink.setAttribute('download', fileName); // 设置下载文件名称
  document.body.appendChild(aLink);
  aLink.click();
  document.body.removeChild(aLink);
};

export const downLoadZip = (str: string) => {
  const url = import.meta.env.VITE_API_BASE_URL + str;
  console.log(url);
  axios({
    method: 'get',
    url,
    responseType: 'blob',
    headers: { Authorization: 'Bearer ' + getToken() },
  }).then((res) => {
    resolveBlob(res, fileMimeType.zip);
  });
};
