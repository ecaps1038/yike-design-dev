import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Snippet from './components/Snippet.vue';
import ColorCard from './components/ColorCard.vue';
import componentPageVue from './components/component-page.vue';

// 加载项目全局样式
import '@/style/main.less';
import '@/style/color-card.less';

// highlight 的样式，依赖包，组件
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import hljsVuePlugin from '@highlightjs/vue-plugin';

// 全局注入 Title 组件和指令
import { YkTitle, YkMessage, YkNotification } from '@yike-design/ui/src';
import '@yike-design/ui/src/components/styles/index.less';

hljs.registerLanguage('javascript', javascript);

const app = createApp(App);

app
  .component('YkTitle', YkTitle)
  .component('YkSnippet', Snippet)
  .component('ColorCard', ColorCard)
  .component(componentPageVue.name, componentPageVue)
  .use(hljsVuePlugin)
  .use(router)
  .mount('#app');

app.config.globalProperties.$notification = YkNotification;
app.config.globalProperties.$message = YkMessage;
