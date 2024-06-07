/*
 * @Date: 2024-06-04 10:45:26
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-07 15:19:38
 */
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';
import { request } from '@/utils/request';

export interface LoginData {
  username: string;
  password: string;
  device: 'PC' | 'mobile';
}

export interface LoginRes {
  cookies: string;
  depts: any[];
  menu: any[];
  perm: string[];
  pwd: any;
  user: any;
}
export function login(data: LoginData) {
  return request.post<LoginRes>({
    url: '/auth/login',
    data,
  });
}

export function logout() {
  return request.delete<LoginRes>({
    url: '/auth/login',
  });
}

export function isLogin() {
  return request.get({
    url: '/auth/login',
  });
}

export function getUserInfo() {
  return request.post<UserState>({
    url: '/api/user/info',
  });
}

export function getUserRole(params: any) {
  return request.get({
    url: '/auth/user/getUserRole',
    params,
  });
}

export function getMenuList() {
  return request.post<RouteRecordNormalized[]>({
    url: '/api/user/menu',
  });
}
