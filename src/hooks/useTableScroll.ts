/*
 * @Date: 2024-06-17 16:20:37
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-17 16:38:14
 */
import { MaybeElementRef } from '@vueuse/core';

/**
 * 计算table内部最大滚动高度
 * 页面容器为PageWrap ('@/components/PageWrap/index.vue')
 * 例子参考/system/user
 * @param elRef
 */
export default function useTableScroll(elRef: MaybeElementRef) {
  const headHeight = ref<number>();
  const calculateHeight = (height: number, extra = 0) => {
    // table滚动高度 = 卡片总高度 - 头部高度 - (margin + table.title + table.pagination)
    const result = height - headHeight.value - 108 - extra;
    console.log('r', result);
    return result + 'px';
  };
  useResizeObserver(elRef, (entries) => {
    const { height } = entries[0].contentRect;
    headHeight.value = height;
  });
  return { calculateHeight };
}
