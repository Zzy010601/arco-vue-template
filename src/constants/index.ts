/*
 * @Date: 2024-06-07 13:12:24
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-19 16:48:30
 */
export const NOT_FOUND = '../views/notFound/index.vue';

// 标签类型
type TagTheme = 'default' | 'success' | 'primary' | 'warning' | 'danger';

// 通知的优先级对应的标签类型
export const NOTIFICATION_TYPES: Map<string, TagTheme> = new Map([
  ['low', 'primary'],
  ['middle', 'warning'],
  ['high', 'danger'],
]);

// 通用请求头
export enum ContentTypeEnum {
  Json = 'application/json;charset=UTF-8',
  FormURLEncoded = 'application/x-www-form-urlencoded;charset=UTF-8',
  FormData = 'multipart/form-data;charset=UTF-8',
}

// 角色
export enum RoleEnum {
  // 管理员
  ADMIN = 'admin',

  // 普通用户
  USER = 'user',

  // 全部授权
  All = '*',
}

// 文件MIME类型
export const fileMimeType = {
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  zip: 'application/zip',
};
