import DefaultLayout from '@/layouts/DefaultLayout.vue';

/*
 * @Date: 2024-06-07 11:09:10
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-17 15:01:13
 */
export default {
  path: '/result',
  name: 'result',
  component: DefaultLayout,
  meta: {
    title: '结果页',
    icon: 'icon-check-circle',
    requiresAuth: true,
  },
  children: [
    {
      path: '/result/success',
      name: 'success',
      component: () => import('@/views/result/success/index.vue'),
      meta: {
        title: '成功页',
        requiresAuth: true,
      },
    },
    {
      path: '/result/error',
      name: 'error',
      component: () => import('@/views/result/error/index.vue'),
      meta: {
        title: '失败页',
        requiresAuth: true,
      },
    },
  ],
};
