/*
 * @Date: 2024-06-19 16:34:05
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-19 16:43:12
 */
import { request } from '@/utils/request';

/**
 * @name 获取生成表数据
 * @method GET
 */
export function listTable(params: any) {
  return request.get({
    url: '/business/gen/gen/list',
    params,
  });
}

/**
 * @name 获取db数据库列表
 * @method GET
 */
export function listDbTable(params: any) {
  return request.get({
    url: '/business/gen/gen/db/list',
    params,
  });
}

/**
 * @name 获取表详细信息
 * @method GET
 */
export function getGenTable(tableId: number) {
  return request.get({
    url: '/business/gen/gen/' + tableId,
  });
}

/**
 * @name 编辑代码生成信息
 * @method PUT
 */
export function updateGenTable(data: any) {
  return request.put({
    url: '/business/gen/gen',
    data,
  });
}

/**
 * @name 导入表
 * @method POST
 */
export function importTable(data: any) {
  return request.post({
    url: '/business/gen/gen/importTable',
    data,
  });
}

/**
 * @name 预览生成代码
 * @method GET
 */
export function previewTable(tableId: number) {
  return request.get({
    url: '/business/gen/gen/preview/' + tableId,
  });
}

/**
 * @name 删除表数据
 * @method DELETE
 */
export function delTable(tableId: number) {
  return request.delete({
    url: '/business/gen/gen/' + tableId,
  });
}

/**
 * @name 生成代码（自定义路径）
 * @method GET
 */
export function genCode(tableName: string) {
  return request.get({
    url: '/business/gen/gen/genCode/' + tableName,
  });
}

/**
 * @name 同步数据库
 * @method GET
 */
export function synchDb(tableName: string) {
  return request.get({
    url: '/business/gen/gen/synchDb/' + tableName,
  });
}
