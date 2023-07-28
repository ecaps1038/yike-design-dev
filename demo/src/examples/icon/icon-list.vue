<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import iconData from 'yike-design-ui/es/components/svg-icon/icons.json'
const { copy, copied, text } = useClipboard({
  legacy: true,
})
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
          :class="[copied && text === `<${item.componentName}/>` && 'copied']"
          @click="copy(`<${item.componentName}/>`)"
        >
          <component :is="item.componentName" />
          <div v-if="copied && text === `<${item.componentName}/>`" class="tip">
            <IconTickOutline />
            <span>copied!</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  color: @font-color-m;
}
.icon-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: -1px;
  margin-bottom: -1px;
  padding: 16px;
  width: 80px;
  height: 80px;
  font-size: 28px;
  border: 1px solid @line-color-s;
  transition: all 0.2s;
  flex-direction: column;
  cursor: pointer;
  &:hover {
    font-size: 35px;
    background-color: @bg-color-ss;
  }
}
.icon-item.copied {
  font-size: 24px;
  color: #fff;
  background-color: @scolor-light;
  transition: none;
  .tip {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      font-size: 12px;
    }
  }
}
</style>
