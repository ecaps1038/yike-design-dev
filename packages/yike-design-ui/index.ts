import yikeIcons from '@yike/components/svg-icon/yike-icon';
import components from './component';
import plugins from './plugin';
import type { App } from 'vue';

export * from '@yike/components';

export default {
  install: (app: App) => {
    [...components, ...yikeIcons, ...plugins].forEach((c) => app.use(c));
  },
};
