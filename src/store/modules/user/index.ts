/*
 * @Date: 2024-06-07 11:09:10
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-17 13:36:46
 */
import { defineStore } from 'pinia';
import {
  getUserInfo,
  login as userLogin,
  logout as userLogout,
  getDeptList as userDeparts,
} from '@/api/user';
import { LoginData } from '@/api/typings';
import { setToken, clearToken } from '@/utils/auth';
import { delEmptyChild } from '@/utils';
import boyAvatar from '@/assets/svg/avatar-boy.svg?url';
import { UserState } from './types';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    user: undefined,
    pwd: '',
    name: '',
    avatar: undefined,
    perms: [],
    roleCodes: [],
    roleNames: [],
    departList: [],
    role: undefined,
    menuList: [],
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    // 设置用户信息
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // 设置用户头像
    setAvatar(avatar: string) {
      this.avatar = avatar;
    },

    // 重置用户的信息
    resetInfo() {
      this.$reset();
    },

    // 获取用户的信息
    async info() {
      const res = await getUserInfo();
      if (!res.avatar) {
        res.avatar = boyAvatar;
      }
      this.setInfo(res);
    },

    // 获取部门信息
    async getDepartList() {
      const res = await userDeparts();
      const { children } = delEmptyChild(res);
      this.setInfo({ departList: children });
    },

    // 账号密码登录
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.cookies);
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    // 手机号登录
    // async phoneLogin(loginForm: PhoneLoginData) {
    //   try {
    //     const res = await phoneLogin(loginForm);
    //     setToken(res.data.tokenValue);
    //   } catch (err) {
    //     clearToken();
    //     throw err;
    //   }
    // },

    // 注册账号
    // async register(registerForm: RegisterData) {
    //   await userRegister(registerForm);
    // },

    // // 重置密码
    // async resetPassword(ResetPasswordForm: ResetPasswordData) {
    //   await resetPassword(ResetPasswordForm);
    // },

    // 退出系统
    async logout() {
      await userLogout();
      this.clearCache();
    },

    //  清理缓存
    async clearCache() {
      this.resetInfo();
      clearToken();
    },
  },
});
