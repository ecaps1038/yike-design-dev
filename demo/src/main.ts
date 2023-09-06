import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Snippet from './components/Snippet.vue';
import ColorCard from './components/ColorCard.vue';
import DocPage from './components/DocPage.vue';

// 加载项目全局样式
import '@/style/main.less';
import '@/style/color-card.less';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import hljsVuePlugin from '@highlightjs/vue-plugin';

// Yike Design UI
import Icon from '@yike-design/ui/src/components/svg-icon';
import { YkTitle, YkMessage, YkNotification } from '@yike-design/ui/src';
import { vLoading } from '@yike-design/ui/src/components/spinner/src/directive';
import '@yike-design/ui/src/components/styles/index.less';

hljs.registerLanguage('javascript', javascript);

const app = createApp(App);

app
  .component(YkTitle.name, YkTitle)
  .component(Snippet.name, Snippet)
  .component(DocPage.name, DocPage)
  .component(ColorCard.name, ColorCard)
  .use(Icon)
  .use(hljsVuePlugin)
  .use(router)
  .mount('#app');

app.directive('loading', vLoading);

app.config.globalProperties.$notification = YkNotification;
app.config.globalProperties.$message = YkMessage;
