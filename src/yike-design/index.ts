import Theme from './components/theme/YkTheme.vue'
import Button from './components/button/YkButton.vue'
import ButtonGroup from './components/button/YkBtGroup.vue'
import Message from './components/message/Message'
import Icon from './components/icon/YkIcon.vue'
import Animate from './components/icon/ykAnimate.vue'
import Title from './components/typography/YkTitle.vue'
import Text from './components/typography/YkText.vue'
import Paragraph from './components/typography/YkParagraph.vue'
import Container from './components/container/YkContainer.vue'
import Space from './components/space/YkSpace.vue'
import Avatar from './components/avatar/YkAvatar.vue'
import AvatarGroup from './components/avatar/YkAvatarGroup.vue'
import Badge from './components/badge/YkBadge.vue'
import Table from './components/table/YkTable.vue'
import Crumb from './components/crumb/YkCrumb.vue'
import CrumbItem from './components/crumb/CrumbItem.vue'
import Input from './components/input/YkInput.vue'
import InputSearch from './components/input/ykInputSearch.vue'
import InputPassword from './components/input/ykInputPassword.vue'
import InputNumber from './components/inputNumber/ykInputNumber.vue'
import InputTag from './components/inputTag/ykInputTag.vue'
import Textarea from './components/textarea/ykTextarea.vue'
import Dropdown from './components/dropdown/YkDropdown.vue'
import Doption from './components/dropdown/YkDropdownItem.vue'
import Submenu from './components/submenu/ykSubmenu.vue'
import Pagination from './components/pagination/ykPagination.vue'
import Checkbox from './components/checkbox/ykCheckbox.vue'
import CheckboxGroup from './components/checkbox/ykChackboxGroup.vue'
import Radio from './components/radio/ykRadio.vue'
import RadioGroup from './components/radio/ykRadioGroup.vue'
import Switch from './components/switch/ykSwitch.vue'
import Stepper from './components/stepper/ykStepper.vue'
import Rate from './components/rate/ykRate.vue'

import type { Component } from 'vue'

const components: {
  [propName: string]: Component //字面量类型，每个属性值类型为组件的类型
} = {
  Theme,
  Button,
  Icon,
  Animate,
  Title,
  Text,
  Paragraph,
  Container,
  Space,
  ButtonGroup,
  Avatar,
  AvatarGroup,
  Badge,
  Table,
  Crumb,
  CrumbItem,
  Input,
  InputSearch,
  InputPassword,
  InputNumber,
  InputTag,
  Textarea,
  Dropdown,
  Doption,
  Submenu,
  Pagination,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Switch,
  Stepper,
  Rate,
}

const install = (app: any) => {
  // 全局挂载 原型函数 过组件实例调用的属性   this.$message
  for (const componentItme in components) {
    app.component(componentItme, components[componentItme])
  }

  app.config.globalProperties.$message = Message
}

//全局引入使用
// export default install

//按需引入使用
export {
  install, //全局
  Theme, //主题
  Button, //按钮
  Message, //全局信息
  Icon, //图标
  Animate, //动态
  Title, //标题
  Text, //文字
  Paragraph, //段落
  Container, //区域块
  Space, //间距
  ButtonGroup,
  Avatar, //头像
  AvatarGroup, //头像组
  Badge, //徽标
  Table, //表格
  Crumb, //面包屑
  CrumbItem, //面包屑节点
  Input, //输入框
  InputSearch, //搜索框
  InputPassword, //密码
  InputNumber, //数字输入
  InputTag, //标签输入
  Textarea, //文本域
  Dropdown, //下拉菜单
  Doption, //下啦菜单选项
  Submenu, //子菜单
  Pagination, //翻页
  Checkbox, //复选框
  CheckboxGroup, //复选框组
  Radio, //单选
  RadioGroup, //单选组
  Switch, //开关
  Stepper, //步进器
  Rate, //评分
}
