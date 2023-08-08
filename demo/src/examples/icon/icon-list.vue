<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { useClipboard } from '@vueuse/core'
import iconData from 'yike-design-ui/src/components/svg-icon/icons.json'
const proxy: any = getCurrentInstance()?.proxy
const { copy } = useClipboard({
  legacy: true,
})
const getRealName = (list: any, name: string) => {
  if (list.type === 'outline') {
    return name.slice(5, -8)
  }
  if (list.type === 'fill') {
    return name.slice(5, -5)
  }
  if (list.type === 'color') {
    return name.slice(5, -6)
  }
}
const handleCopy = (item: any) => {
  const compStr = `<${item.componentName}/>`
  copy(compStr)
  proxy.$message({ type: 'success', message: `复制成功：${compStr}` })
}
</script>
<template>
  <div>
    <div v-for="list in iconData" :key="list.title">
      <YkTitle :level="3">{{ list.title }}</YkTitle>
      <div class="list">
        <div
          v-for="(item, idx) in list.list"
          :key="idx"
          class="icon-item"
          @click="handleCopy(item)"
        >
          <!-- <div v-if="copied && text === `<${item.componentName}/>`" class="tip">
            <IconTickOutline />
            <span>copied!</span>
          </div> -->
          <div class="icon"><component :is="item.componentName" /></div>
          <span class="name">
            {{ getRealName(list, item.name) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.list {
  display: flex;
  padding-bottom: 32px;
  color: @font-color-m;
  flex-wrap: wrap;
}
.icon-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -1px;
  margin-bottom: -1px;
  padding: 16px;
  width: 168px;
  height: 148px;
  font-size: 28px;
  border: 1px solid @line-color-s;
  transition: all @animatb;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    font-size: 38px;
    background-color: @bg-color-s;
  }
  .icon {
    display: flex;
    align-items: center;
    height: 88px;
  }
  .name {
    font-size: 12px;
  }
}
</style>
