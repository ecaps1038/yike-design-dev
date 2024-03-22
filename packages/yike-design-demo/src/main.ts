import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Snippet from './components/Snippet.vue';
import ColorCard from './components/ColorCard.vue';
import DocPage from './components/DocPage.vue';

// 加载项目全局样式
import '@/style/main.less';

import { YkTitle, YkMessage, YkNotification } from '@yike-design/ui/index';
import { vLoading } from '@yike-design/ui/components/spinner/src/directive';
import '@yike-design/ui/components/styles/index.less';

const app = createApp(App);

app
  .component(YkTitle.name, YkTitle)
  .component(Snippet.name, Snippet)
  .component(DocPage.name, DocPage)
  .component(ColorCard.name, ColorCard)
  .use(router)
  .mount('#app');

app.directive('loading', vLoading);

app.config.globalProperties.$notification = YkNotification;
app.config.globalProperties.$message = YkMessage;
