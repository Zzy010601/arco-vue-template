/*
 * @Date: 2024-06-07 11:09:10
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-11 14:27:49
 */
import { createApp } from 'vue';
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import globalComponents from '@/components';
import router from './router';
import store from './store';
import directive from './directive';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';
import '@/assets/style/index.less';
import '@/api/interceptor';
// import './mock';

const app = createApp(App);

app.use(ArcoVue, {});
app.use(ArcoVueIcon);
app.use(router);
app.use(store);
app.use(globalComponents);
app.use(directive);

app.mount('#app');
