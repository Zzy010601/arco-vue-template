/*
 * @Date: 2024-06-12 10:47:21
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-12 10:58:23
 */
export interface TreeItem {
  children: TreeItem[];
  [key: string]: any;
}

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
