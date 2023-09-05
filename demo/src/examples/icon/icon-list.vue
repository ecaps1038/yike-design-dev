<script setup lang="ts">
import { getCurrentInstance, ref } from 'vue'
import { useClipboard } from '@vueuse/core'
import iconData from '@yike-design/ui/src/components/svg-icon/icons.json'

const defer = useDefer()
const proxy: any = getCurrentInstance()?.proxy
const { copy } = useClipboard({ legacy: true })
const iconTypeMap = {
  fill: (name: string) => name.slice(5, -5),
  color: (name: string) => name.slice(5, -6),
  outline: (name: string) => name.slice(5, -8),
}
// prettier-ignore
const svgIconBucket = import.meta.glob(
  '@yike-design/ui/src/components/svg-icon/**/*.vue',
  {
    eager: true
  }
)

function getSvgIconComp(name: string) {
  const path = `../packages/yike-design-ui/src/components/svg-icon/${name}/${name}.vue`
  return (svgIconBucket[path] as any).default
}

function getRealName(list: any, name: string) {
  return iconTypeMap[list.type](name)
}

function useDefer() {
  const frameCount = ref(0)
  function updateFrameCount() {
    requestAnimationFrame(() => {
      frameCount.value++
      updateFrameCount()
    })
  }

  updateFrameCount()

  return function defer(n: number) {
    return frameCount.value >= n
  }
}

function handleCopy(item: any) {
  const compStr = `<${item.componentName}/>`

  copy(compStr)
  proxy.$message({
    type: 'success',
    message: `复制成功：${compStr}`,
  })
}
</script>

<template>
  <div>
    <div v-for="listItem in iconData" :key="listItem.title">
      <YkTitle :id="listItem.title" :level="3">{{ listItem.title }}</YkTitle>
      <div class="list">
        <template v-for="(item, index) in listItem.list">
          <div v-if="defer(index)" class="icon-item" @click="handleCopy(item)">
            <component :is="getSvgIconComp(item.name)" class="icon-box" />
            <span class="name">
              {{ getRealName(listItem, item.name) }}
            </span>
          </div>
        </template>
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
  margin: 0 -1px -1px 0;
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
  .icon-box {
    display: flex;
    align-items: center;
    height: 88px;
  }
  .name {
    font-size: 12px;
  }
}
</style>
