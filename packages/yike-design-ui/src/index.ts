import type { Component, App } from 'vue'

import { YkButton } from './components/button'
import YkButtonGroup from './components/button/BtGroup.vue'
import YkTheme from './components/theme/Theme.vue'
import YkIcon from './components/icon/Icon.vue'
import { YkAvatar, YkAvatarGroup } from './components/avatar'
import YkSpace from './components/space/Space.vue'
import { YkContainer } from './components/container'
import YkTable from './components/table/Table.vue'
import YkMessage from './components/message'
import YkParagraph from './components/typography/Paragraph.vue'
import YkTitle from './components/typography/Title.vue'
import YkText from './components/typography/Text.vue'
import './styles/index.less'

const components: {
  [propName: string]: Component
} = {
  YkButton,
  YkButtonGroup,
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
}

export {
  YkButton,
  YkButtonGroup,
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
  YkMessage
}

// 全局注册
export default {
  install: (app: App) => {
    for (const c in components) {
      app.component(c, components[c])
    }
    app.config.globalProperties.$message = YkMessage
  }
}
// 局部注册
// for (const c in components) {
//   const component = Object.assign(components[c], { install: {} })
//   component.install = (app: App) => {
//     app.component(c, component)
//   }
// }
