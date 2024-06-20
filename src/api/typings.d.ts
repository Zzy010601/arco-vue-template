/*
 * @Date: 2024-06-12 14:01:48
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-19 10:31:31
 */
import { Page } from '@/types/axios';

// user.ts
export interface LoginData {
  username?: string;
  password?: string;
  device?: 'PC' | 'mobile';
}

export interface LoginRes {
  cookies: string;
  depts: any[];
  menu: any[];
  perm: string[];
  pwd: any;
  user: any;
}

export interface DeptRes {
  deptCode: string;
  deptId: number;
  deptName: string;
  parentDeptId: number;
  children: DeptRes[];
}

export interface UserParams extends Page {
  username?: string;
  name?: string;
  deptId?: number;
  telephone?: string;
}

export interface UserData {
  userId?: number;
  loginName: string;
  name: string;
  telephone?: string;
  deptId: number;
  [key: string]: any;
}
