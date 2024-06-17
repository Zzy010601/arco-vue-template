/*
 * @Date: 2024-06-07 11:09:10
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-17 13:38:39
 */
import { RoleEnum } from '@/constants';

export type RoleType = undefined | RoleEnum.All | RoleEnum.ADMIN | RoleEnum.USER;

export interface UserState {
  user: any;
  pwd: string;
  name: string;
  avatar?: string;
  perms: any[];
  note?: string;
  roleCodes?: any[];
  roleNames?: any[];
  role?: RoleType;
  departList?: any[];
  menuList?: any[];
}
