import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// components
import Snippet from './components/Snippet.vue';
import ColorCard from './components/ColorCard.vue';
import componentPageVue from './components/component-page.vue';

// highlight 的样式，依赖包，组件
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import hljsVuePlugin from '@highlightjs/vue-plugin';

// 加载项目全局样式
import '@/style/main.less';
import '@yike/styles/index.less';

const app = createApp(App);

hljs.registerLanguage('javascript', javascript);

app
  .component('YkSnippet', Snippet)
  .component('ColorCard', ColorCard)
  .component(componentPageVue.name, componentPageVue)
  .use(hljsVuePlugin)
  .use(router)
  .mount('#app');
