/*
 * @Date: 2024-06-13 16:00:46
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-13 16:09:05
 */
import Chart from '@/components/Chart/index.vue';
import Breadcrumb from '@/components/breadcrumb/index.vue';
import PageWrap from '@/components/PageWrap/index.vue';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    Chart: typeof Chart;
    Breadcrumb: typeof Breadcrumb;
    PageWrap: typeof PageWrap;
  }
}
