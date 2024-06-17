/*
 * @Date: 2024-06-13 15:33:15
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-17 14:53:14
 */
import Mock from 'mockjs';

import './user';
import './message-box';
import './send-message';

// import '@/views/home/mock';
import '@/views/dashboard/monitor/mock';

import '@/views/list/card/mock';
import '@/views/list/search-table/mock';

import '@/views/visualization/data-analysis/mock';
import '@/views/visualization/multi-dimension-data-analysis/mock';

Mock.setup({
  timeout: '600-1000',
});
