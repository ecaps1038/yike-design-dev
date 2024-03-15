<template>
  <div>
    <div v-for="listItem in iconData" :key="listItem.title">
      <YkTitle :id="listItem.title" :level="3">{{ listItem.title }}</YkTitle>
      <div class="list">
        <template v-for="(item, index) in listItem.list">
          <div v-if="defer(index)" class="icon-item" @click="handleCopy(item)">
            <component :is="item.name" />
            <span class="name">
              {{ getRealName(listItem, item.name) }}
            </span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { getCurrentInstance, ref, defineComponent } from 'vue'
import { useClipboard } from '@vueuse/core'
import iconData from '@yike-design/ui/components/svg-icon/icons.json'
import * as components from '@yike-design/ui/components/svg-icon'
export default defineComponent({
  name: 'IconMain',
  components: {
    ...components,
  },
  setup() {
    const proxy: any = getCurrentInstance()?.proxy
    const { copy } = useClipboard({ legacy: true })
    const iconTypeMap = {
      fill: (name: string) => name.slice(5, -5),
      color: (name: string) => name.slice(5, -6),
      outline: (name: string) => name.slice(5, -8),
    }

    const getRealName = (list: any, name: string) => {
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
    const defer = useDefer()

    function handleCopy(item: any) {
      const compStr = `<${item.componentName}/>`
      copy(compStr)
      proxy.$message({
        type: 'success',
        message: `复制成功：${compStr}`,
      })
    }
    return {
      getRealName,
      handleCopy,
      defer,
      iconData,
    }
  },
})
</script>

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
