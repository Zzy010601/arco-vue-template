import { SelectOptionData, SelectOptionGroup } from '@arco-design/web-vue';

/*
 * @Date: 2024-06-07 11:09:10
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-12 14:23:42
 */
export interface AnyObject {
  [key: string]: unknown;
}

export interface Options {
  value: string | number | boolean | SelectOptionData | SelectOptionGroup;
  label: string;
}

export interface NodeOptions extends Options {
  children?: NodeOptions[];
}

export interface GetParams {
  body: null;
  type: string;
  url: string;
}

export interface PostData {
  body: string;
  type: string;
  url: string;
}

export interface Pagination {
  current: number;
  pageSize: number;
  total?: number;
}

export type TimeRanger = [string, string];

export interface GeneralChart {
  xAxis: string[];
  data: Array<{ name: string; value: number[] }>;
}
