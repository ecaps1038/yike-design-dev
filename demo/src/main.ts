import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Snippet from './components/Snippet.vue';
import ColorCard from './components/ColorCard.vue';
// 加载项目全局样式
import '@/style/main.less';
import '@/style/color-card.less';
import '@/style/icon.less';

//highlight 的样式，依赖包，组件
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import hljsVuePlugin from '@highlightjs/vue-plugin';
// 全局注入 icon
import Icon from '../../packages/yike-design-ui/src/components/svg-icon';
import { YkMessage, YkNotification } from '../../packages/yike-design-ui/src';
hljs.registerLanguage('javascript', javascript);
const app = createApp(App);
app.component('YkSnippet', Snippet);
app.component('ColorCard', ColorCard);
app.use(Icon).use(hljsVuePlugin).use(router).mount('#app');

app.config.globalProperties.$notification = YkNotification;
app.config.globalProperties.$message = YkMessage;
