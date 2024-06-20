/*
 * @Date: 2024-06-11 17:01:49
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-19 16:08:02
 */
import { RouteRecordRaw } from 'vue-router';

// 系统管理模块
export default {
  path: '/system',
  name: 'system',
  component: 'layout',
  meta: {
    title: '系统管理',
    requiresAuth: true,
    icon: 'icon-settings',
  },
  children: [
    {
      path: '/system/menu',
      name: 'menu',
      component: 'system/menu/index',
      meta: {
        title: '菜单管理',
        requiresAuth: true,
      },
    },
    {
      path: '/system/user',
      name: 'user',
      component: 'system/user/index',
      meta: {
        title: '用户管理',
        requiresAuth: true,
      },
    },
    {
      path: '/system/role',
      name: 'role',
      component: 'system/role/index',
      meta: {
        title: '角色管理',
        requiresAuth: true,
      },
    },
    {
      path: '/system/dict',
      name: 'dict',
      component: 'system/dict/index',
      meta: {
        title: '字典管理',
        requiresAuth: true,
      },
    },
    {
      path: '/system/dept',
      name: 'dept',
      component: 'system/dept/index',
      meta: {
        title: '部门管理',
        requiresAuth: true,
      },
    },
    {
      path: '/system/gen',
      name: 'gen',
      component: 'system/gen/index',
      meta: {
        title: '代码生成',
        requiresAuth: true,
      },
    },
  ],
} as RouteRecordRaw;
