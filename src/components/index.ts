/*
 * @Date: 2024-06-07 11:09:10
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-18 11:22:10
 */
import { App, Component } from 'vue';
import Chart from './Chart/index.vue';
import Breadcrumb from './Breadcrumb/index.vue';
import PageWrap from './PageWrap/index.vue';
import Menu from './Menu/index.vue';

const components: {
  [key: string]: Component;
} = {
  Chart,
  Breadcrumb,
  PageWrap,
  Menu,
};

export default {
  install(app: App) {
    Object.keys(components).forEach((key) => {
      app.component(key, components[key]);
    });
  },
};
