import type { Component, App } from 'vue';

import YkUpload from './components/upload';
import { YkRadio, YkRadioGroup } from './components/radio';
import YkAnchor from './components/anchor';
import YkPopover from './components/popover';
import YkSwitch from './components/switch';
import { YkDrawer } from './components/drawer';
import YkRate from './components/rate';
import { YkTabs, YkTabPane } from './components/tabs';
import YkAlert from './components/alert';
import YkButton from './components/button';
import YkTheme from './components/theme';
import YkIcon from './components/icon';
import { YkAvatar, YkAvatarGroup } from './components/avatar';
import YkSpace from './components/space';
import { YkContainer } from './components/container';
import YkTable from './components/table/Table.vue';
import YkMessage from './components/message';
import YkNotification from './components/notification';
import { YkParagraph, YkTitle, YkText } from './components/typography';
import { YkBackTop } from './components/back-top';
import YkTooltip from './components/tooltip';
import YkEmpty from './components/empty';
import './styles/index.less';

const components: {
  [propName: string]: Component;
} = {
  YkUpload,
  YkRadioGroup,
  YkRadio,
  YkSwitch,
  YkAnchor,
  YkPopover,
  YkDrawer,
  YkRate,
  YkTabs,
  YkTabPane,
  YkAlert,
  YkButton,
  YkTheme,
  YkIcon,
  YkAvatar,
  YkAvatarGroup,
  YkSpace,
  YkContainer,
  YkTable,
  YkParagraph,
  YkTitle,
  YkText,
  YkEmpty,
  YkBackTop,
  YkTooltip,
};

export {
  YkUpload,
  YkRadioGroup,
  YkRadio,
  YkSwitch,
  YkAnchor,
  YkPopover,
  YkDrawer,
  YkRate,
  YkTabs,
  YkTabPane,
  YkAlert,
  YkButton,
  YkTheme,
  YkIcon,
  YkParagraph,
  YkAvatar,
  YkAvatarGroup,
  YkSpace,
  YkContainer,
  YkTable,
  YkTitle,
  YkText,
  YkMessage,
  YkNotification,
  YkEmpty,
  YkBackTop,
  YkTooltip,
};

// 全局注册
export default {
  install: (app: App) => {
    for (const c in components) {
      app.component(c, components[c]);
    }
    app.config.globalProperties.$notification = YkNotification;
    app.config.globalProperties.$message = YkMessage;
  },
};
// 局部注册
// for (const c in components) {
//   const component = Object.assign(components[c], { install: {} })
//   component.install = (app: App) => {
//     app.component(c, component)
//   }
// }
