/*
 * @Date: 2024-06-04 10:45:26
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-12 14:42:19
 */
import type { RouteRecordNormalized } from 'vue-router';
import { UserState } from '@/store/modules/user/types';
import { request } from '@/utils/request';
import { Page } from '@/types/axios';
import { DeptRes, LoginData, LoginRes, UserParams } from './typings';

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

/**
 * @name 获取部门信息
 * @method GET
 */
export function getDeptList() {
  return request.get<DeptRes>({
    url: '/auth/department/tree',
  });
}

/**
 * @name 获取用户列表
 * @param {UserParams} params
 * @method GET
 */
export function getUserList(params: UserParams) {
  return request.get<Page<any>>({
    url: 'auth/user/list',
    params,
  });
}
