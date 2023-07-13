import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

//全局样式
import './assets/main.less'

//全局加载组件
import { install } from '@/yike-design'

//highlight 的样式，依赖包，组件
import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import hljsVuePlugin from '@highlightjs/vue-plugin'

hljs.registerLanguage('javascript', javascript)

const app = createApp(App)

app.use(router)
app.use(store)
app.use(install)
app.use(hljsVuePlugin)

app.mount('#app')
