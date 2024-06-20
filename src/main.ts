/*
 * @Date: 2024-06-07 11:09:10
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-20 10:14:28
 */
import { createApp } from 'vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import globalComponents from '@/components/index';
// @ts-ignore
import hljsVuePlugin from '@highlightjs/vue-plugin';
import 'highlight.js/styles/stackoverflow-light.css';
import hljs from 'highlight.js/lib/core';
import java from 'highlight.js/lib/languages/java';
import xml from 'highlight.js/lib/languages/xml';
import javascript from 'highlight.js/lib/languages/javascript';
import sql from 'highlight.js/lib/languages/sql';
import html from 'highlight.js/lib/languages/vbscript-html';
import router from './router';
import store from './store';
import directive from './directive';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';
import '@/assets/style/index.less';
import '@/api/interceptor';
import './mock';

hljs.registerLanguage('java', java);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', html);
hljs.registerLanguage('vue', html);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('sql', sql);

const app = createApp(App);

app.use(ArcoVueIcon);
app.use(globalComponents);
app.use(router);
app.use(store);
app.use(directive);
app.use(hljsVuePlugin);

app.mount('#app');
