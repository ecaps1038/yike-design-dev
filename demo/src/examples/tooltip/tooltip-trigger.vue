<template>
  <yk-space align="end">
    <div>
      <label class="tooltip-switch">
        <yk-switch v-model="open"></yk-switch>
        <span>切换气泡显示状态</span>
        <br />
      </label>
      <yk-tooltip
        v-model:open="open"
        placement="bottomLeft"
        trigger="none"
        title="当 trigger 设置为 none 时，所有组件内触发气泡打开或关闭的事件都将失效"
      >
        <yk-button>tooltip</yk-button>
      </yk-tooltip>
    </div>
    <yk-tooltip trigger="hover">
      <yk-button type="outline">hover</yk-button>
    </yk-tooltip>
    <yk-tooltip trigger="click">
      <yk-button type="outline">click</yk-button>
    </yk-tooltip>
    <yk-tooltip trigger="contextmenu">
      <yk-button type="outline">contextmenu</yk-button>
    </yk-tooltip>
    <yk-tooltip trigger="focus">
      <yk-input />
    </yk-tooltip>
    <yk-tooltip :trigger="['contextmenu', 'click']">
      <yk-button type="outline">click/contextMenu</yk-button>
    </yk-tooltip>
  </yk-space>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
</script>
<style>
.tooltip-switch {
  display: block;
  margin-bottom: 8px;
}
</style>
