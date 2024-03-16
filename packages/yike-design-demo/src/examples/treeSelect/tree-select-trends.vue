<template>
  <div>
    <YkSpace style="margin-bottom: 20px">
      <span>是否禁用tree-select：</span>
      <YkSwitch v-model="state.disabled"></YkSwitch>
    </YkSpace>
    <br />
    <YkSpace style="margin-bottom: 20px">
      <span>是否开启多选：</span>
      <YkSwitch v-model="state.isMultiple"></YkSwitch>
    </YkSpace>
    <br />
    <YkSpace style="margin-bottom: 20px">
      <span>是否禁用获取焦点样式：</span>
      <YkSwitch v-model="state.bordered"></YkSwitch>
    </YkSpace>
    <br />
    <YkSpace style="margin-bottom: 20px">
      <span>是否显示清空按钮：</span>
      <YkSwitch v-model="state.allowClear"></YkSwitch>
    </YkSpace>
    <br />
    <YkTreeSelect
      :options="state.treeData"
      empty-text="当前没有任何数据！"
      placeholder="这是默认的placeholer输入提示"
      :disabled="state.disabled"
      :bordered="state.bordered"
      :allow-clear="state.allowClear"
      :multiple="state.isMultiple"
      :default-expanded-keys="state.defaultKeys"
    ></YkTreeSelect>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import { YkSpace } from '@yike-design/ui'
// 定义参数
const state = reactive<any>({
  isMultiple: false,
  defaultKeys: [1, 2],
  disabled: false,
  bordered: true,
  allowClear: true,
  treeData: [
    {
      key: '1',
      label: 'level 1',
      children: [
        {
          key: '11',
          label: 'level 1-1',
        },
      ],
    },
    {
      key: '2',
      label: 'level 2',
      children: [
        {
          key: '12',
          label: 'level 2-1',
        },
        {
          key: '13',
          label: 'level 2-2',
          children: [
            {
              key: '53',
              label: 'level 2-2-1',
            },
            {
              key: '54',
              label: 'level 2-2-2',
            },
          ],
        },
      ],
    },
    {
      key: '3',
      label: 'level 3',
      children: [
        {
          key: '14',
          label: 'level 3-1',
        },
        {
          key: '16',
          label: 'level 3-2',
        },
      ],
    },
  ],
})
</script>
