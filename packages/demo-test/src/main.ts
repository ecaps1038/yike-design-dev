import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import '@yike-design/ui/es/components/styles/index.less';
import { YkTitle, YkMessage, YkNotification } from '@yike-design/ui';

const app = createApp(App);
app.component(YkTitle.name, YkTitle).mount('#app');

app.config.globalProperties.$notification = YkNotification;
app.config.globalProperties.$message = YkMessage;
