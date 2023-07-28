<script setup lang="ts">
import { RouterLink } from 'vue-router'
defineProps({
  bar: {
    // default: {},
    type: Array,
    required: true,
  },
})
//获取屏幕body高度
// let bodyHeight = document.body.clientHeight
</script>
<template>
  <div class="component-bar">
    <yk-scrollbar class="container">
      <div v-for="(e, i) in bar" :key="i" class="bar-card">
        <div class="bar-title">
          <yk-text strong>{{ (e as any).title }}</yk-text>
        </div>
        <RouterLink
          v-for="(n, j) in (e as any).list"
          :key="j"
          class="bar-list"
          :to="n.src"
        >
          {{ n.name }}
        </RouterLink>
      </div>
    </yk-scrollbar>
  </div>
</template>
<style lang="less" scoped>
.component-bar {
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 1;
  width: 268px;
  height: calc(100% - 60px);
  border-right: 1px solid @line-color-s;
  background-color: @bg-color-l;
  transition: background-color @animats, border-right @animats;

  .container {
    box-sizing: border-box;
    padding: 0 @space-l @space-l;
  }

  .bar-title {
    margin-top: @space-xl;
    padding-left: @space-ss;
    height: 40px;
    line-height: 40px;
    color: @font-color-l;
  }

  .bar-list {
    display: block;
    margin-bottom: @space-ss;
    padding: 0 @space-l;
    height: 40px;
    border-radius: @radius-m;
    color: @font-color-m;
    line-height: 40px;
    transition: background-color @animatb;

    &:hover {
      background-color: @pcolor-1;
    }

    &:last-child {
      margin-bottom: unset;
    }
  }

  .router-link-active {
    font-weight: 600;
    color: @pcolor;
    background-color: @pcolor-1;
  }

  .select {
    font-weight: 600;
    color: @pcolor;
    background-color: @pcolor-1;
  }
}
</style>
