import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Snippet from './components/Snippet.vue';
import ColorCard from './components/ColorCard.vue';
import componentPageVue from './components/component-page.vue';
// 加载项目全局样式
import 'yike-design-ui/src/components/styles/index.less';
import '@/style/main.less';
import '@/style/color-card.less';

//highlight 的样式，依赖包，组件
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import hljsVuePlugin from '@highlightjs/vue-plugin';
// 全局注入 icon
import Icon from 'yike-design-ui/src/components/svg-icon';
import { YkTitle, YkMessage, YkNotification } from 'yike-design-ui/src';

hljs.registerLanguage('javascript', javascript);

const app = createApp(App);
app
  .component('YkTitle', YkTitle)
  .component('YkSnippet', Snippet)
  .component('ColorCard', ColorCard)
  .component(componentPageVue.name, componentPageVue)
  .use(Icon)
  .use(hljsVuePlugin)
  .use(router)
  .mount('#app');

app.config.globalProperties.$notification = YkNotification;
app.config.globalProperties.$message = YkMessage;
